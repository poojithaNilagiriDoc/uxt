import classnames from 'classnames';
import filter from 'lodash/fp/filter';
import isEmpty from 'lodash/fp/isEmpty';
import reject from 'lodash/fp/reject';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import issues from 'uxt-graphics/graphics/issues';
import clearAllNotifications from 'uxt-graphics/icons/clear-all-notifications';
import { AutoSizer, Index, List, ListRowProps } from 'react-virtualized';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import CoverPanel from '../CoverPanel';
import DropdownList from '../DropdownList';
import EmptyState, { EmptyStateProps } from '../EmptyState';
import IconButton from '../IconButton';
import Notification, { NotificationNotification } from '../Notification';
import Toolbar from '../Toolbar';
import useTheme from '../_helpers/useTheme';
import type { IconButtonProps } from '../IconButton';
import useCombinedRefs from '../../hooks/useCombinedRefs';
import useClickAwayListener from '../../hooks/useClickAwayListener';
import safeGet from '../_helpers/safeGet';

// * This is the combined width of the paddings without the dismiss icon.
// * Container Padding (16px) + message area padding (32px) + band width (8px).
const NOTIFICATION_COMPONENT_BASE_WIDTH = 56;

// * This is the combined height of the area without the message height and action buttons.
// * Header text height (14px) + Header text bottom margin (8px) + Message area padding (32px).
const NOTIFICATION_COMPONENT_BASE_HEIGHT = 54;

// * The height of the action buttons area.
// * Button height (36px) + margin (8px).
const ACTION_BUTTONS_HEIGHT = 52;

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        borderLeft:
          theme.palette.type === 'dark' && `1px solid ${theme.palette.divider}`,
      },
      toolbar: {},
      typeFilter: {
        flex: '1 1 auto',
      },
      dismissAllButton: {},
      notifications: {
        backgroundColor: theme.palette.background.default,
        flex: '1 1 auto',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: theme.spacing(1),
      },
      notification: {
        '& + &': {
          marginTop: theme.spacing(1),
        },
      },
      header: {
        display: 'flex',
        flex: '0 0 auto',
        height: theme.height.toolbar,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0px ${theme.spacing(1)}px 0px ${theme.spacing(2)}px`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      emptyState: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  { name: 'UxtNotificationPanel' },
);

export interface NotificationPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  autoSort?: boolean;
  className?: string;
  classes?: object;
  dismissAllIconButtonProps?: Partial<IconButtonProps>;
  emptyStateProps?: Partial<EmptyStateProps>;
  isOpen?: boolean;
  notificationComponent?:
    | string
    | React.FC<any>
    | React.ComponentClass<any, any>;
  notifications?: Array<NotificationNotification>;
  onDismissAll?: () => void;
  onIsOpenChange?: (isOpen: boolean) => void;
  onNotificationDismiss?: (notification: NotificationNotification) => void;
  onNotificationsChange?: (
    notifications: Array<NotificationNotification>,
  ) => void;
  onTypeFilterChange?: (
    typeFilter: 'all' | 'error' | 'info' | 'success' | 'warning',
  ) => void;
  panelWidth?: number;
  timestampAccessor?:
    | string
    | ((notification: NotificationNotification) => string);
  titleText?: React.ReactText;
  typeFilter?: 'all' | 'error' | 'info' | 'success' | 'warning';
  typeFilterAllText?: string;
  typeFilterErrorText?: string;
  typeFilterInfoText?: string;
  typeFilterSuccessText?: string;
  typeFilterWarningText?: string;
}

const NotificationPanel = React.forwardRef(function NotificationPanel(
  props: NotificationPanelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    autoSort = false,
    className,
    classes: classesProp,
    dismissAllIconButtonProps,
    emptyStateProps = {},
    isOpen = false,
    notificationComponent: NotificationComponent = Notification,
    notifications = [],
    onDismissAll,
    onIsOpenChange,
    onNotificationDismiss,
    onNotificationsChange = () => {},
    onTypeFilterChange = () => {},
    panelWidth = 320,
    timestampAccessor = 'timestamp',
    titleText = 'Notifications',
    typeFilter = 'all' as const,
    typeFilterAllText = 'All',
    typeFilterErrorText = 'Error',
    typeFilterInfoText = 'Info',
    typeFilterSuccessText = 'Success',
    typeFilterWarningText = 'Warning',
    ...rest
  } = props;

  const classes = useStyles(props);
  const widthRef = React.useRef<number>();
  const theme = useTheme();
  const panelRef = useClickAwayListener<HTMLDivElement>(() => {
    isOpen && onIsOpenChange?.(false);
  });
  const rootRef = useCombinedRefs(ref, panelRef);

  const filteredNotifications =
    React.useMemo((): Array<NotificationNotification> => {
      if (isOpen) {
        const filteredNotifications: Array<NotificationNotification> =
          typeFilter === 'all'
            ? notifications
            : filter(
                (notification: NotificationNotification) =>
                  notification.type === typeFilter,
                notifications,
              );
        return autoSort
          ? filteredNotifications.sort(
              (
                a: NotificationNotification,
                b: NotificationNotification,
              ): number =>
                safeGet(0, timestampAccessor, b) -
                safeGet(0, timestampAccessor, a),
            )
          : filteredNotifications;
      }
    }, [
      autoSort,
      isOpen,
      notifications,
      timestampAccessor,
      typeFilter,
      isOpen,
    ]);

  const getTypeFilterText = React.useCallback(
    (value: string): string => {
      return (
        {
          all: typeFilterAllText,
          error: typeFilterErrorText,
          info: typeFilterInfoText,
          success: typeFilterSuccessText,
          warning: typeFilterWarningText,
        }[value] || value
      );
    },
    [
      typeFilterAllText,
      typeFilterErrorText,
      typeFilterInfoText,
      typeFilterSuccessText,
      typeFilterWarningText,
    ],
  );

  const handleDismissAll = React.useCallback((): void => {
    if (onDismissAll) {
      onDismissAll();
    }

    if (onNotificationsChange) {
      onNotificationsChange(
        reject(
          (n: NotificationNotification) => n.isDismissable !== false,
          notifications,
        ),
      );
    }
  }, [notifications, onDismissAll, onNotificationsChange]);

  const handleNotificationDismiss = React.useCallback(
    (notification: NotificationNotification, index: number): void => {
      if (onNotificationDismiss) {
        onNotificationDismiss(notification);
      }

      if (onNotificationsChange) {
        const middleIndex: number = Math.ceil(filteredNotifications.length / 2);

        onNotificationsChange(
          index < middleIndex
            ? reject(
                (n: NotificationNotification) => n.id === notification.id,
                notifications,
              )
            : reject(
                (n: NotificationNotification) => n.id === notification.id,
                notifications.reverse(),
              ).reverse(),
        );
      }
    },
    [
      notifications,
      onNotificationDismiss,
      onNotificationsChange,
      filteredNotifications,
    ],
  );

  const rowRenderer = React.useCallback(
    ({ index, style = {} }: ListRowProps): React.ReactNode => {
      const notificationItem: NotificationNotification =
        filteredNotifications[index];

      return (
        <NotificationComponent
          onDismiss={(n: NotificationNotification) =>
            handleNotificationDismiss(n, index)
          }
          notification={notificationItem}
          style={{
            ...style,
            // * We add the value `theme.spacing(1)` to the top so that the next item renders with some gap.
            top: parseFloat(style.top.toString()) + theme.spacing(1),
            // * We need to remove the same gap from the height as we are adding to the top.
            // * We should not remove for the first element or it takes twice the gap between the first and second.
            height:
              parseFloat(style.height.toString()) -
              (index === 0 ? 0 : theme.spacing(1)),
          }}
          key={notificationItem.id}
          className={classes.notification}
          timestampAccessor={timestampAccessor}
        />
      );
    },
    [
      filteredNotifications,
      handleNotificationDismiss,
      theme,
      classes.notification,
      timestampAccessor,
    ],
  );

  const getRowHeight = React.useCallback(
    ({ index }: Index): number => {
      const notificationItem: NotificationNotification =
        filteredNotifications[index];
      const dismissibleIconWidth: number =
        notificationItem.isDismissable === undefined ||
        notificationItem.isDismissable
          ? theme.spacing(5.5)
          : theme.spacing(0.5);
      const availableWidth: number =
        (widthRef.current || panelWidth) -
        dismissibleIconWidth -
        NOTIFICATION_COMPONENT_BASE_WIDTH;

      // * Need to add add 'element' to DOM, calculate height and remove it immediately.
      // * This will not be a problem as it gets removed before a repaint.
      const element: HTMLDivElement = document.createElement('div');

      element.setAttribute(
        'style',
        `max-width: ${availableWidth}px; font-size: 14px; font-family: 'Roboto'; word-break: break-word`,
      );
      element.textContent = notificationItem.message;
      document.body.appendChild(element);

      const height = Number(
        window.getComputedStyle(element, null).height.split('px')[0],
      );

      element.remove();

      const finalHeight: number =
        height +
        (notificationItem.actionText || notificationItem.secondaryActionText
          ? ACTION_BUTTONS_HEIGHT
          : theme.spacing(1)) +
        NOTIFICATION_COMPONENT_BASE_HEIGHT;

      return finalHeight;
    },
    [filteredNotifications, panelWidth, theme],
  );

  return (
    <CoverPanel
      ref={rootRef}
      className={classnames(classes.root, className)}
      isOnRight={true}
      isOpen={isOpen}
      width={320}
      {...rest}
    >
      <div className={classes.header}>
        {titleText}
        <IconButton
          className={classes.dismissAllButton}
          iconSvg={clearAllNotifications}
          onClick={handleDismissAll}
          {...dismissAllIconButtonProps}
        />
      </div>
      <Toolbar className={classes.toolbar} position="top">
        <DropdownList
          className={classes.typeFilter}
          items={['all', 'error', 'info', 'success', 'warning']}
          onValueChange={onTypeFilterChange}
          popupMaxHeight={240}
          textAccessor={getTypeFilterText}
          value={typeFilter}
        />
      </Toolbar>
      <div className={classes.notifications}>
        {showIf(isEmpty(notifications))(() => (
          <EmptyState
            className={classes.emptyState}
            graphicSvg={issues}
            headline="No Notifications"
            {...emptyStateProps}
          />
        ))}
        {showIf(!isEmpty(notifications))(
          <AutoSizer>
            {({ height, width }) => {
              widthRef.current = width;
              return (
                <List
                  width={width}
                  height={height}
                  rowCount={filteredNotifications?.length || 0}
                  rowRenderer={rowRenderer}
                  rowHeight={getRowHeight}
                />
              );
            }}
          </AutoSizer>,
        )}
      </div>
    </CoverPanel>
  );
});

export default React.memo(NotificationPanel);
