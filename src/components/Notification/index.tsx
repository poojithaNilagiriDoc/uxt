import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import closeSvg from 'uxt-graphics/icons/close';
import { formatDistance } from 'date-fns';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Button from '../Button';
import IconButton from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import safeGet from '../_helpers/safeGet';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        minHeight: theme.height.item,
        overflow: 'hidden',
        position: 'relative',
      },
      body: {
        display: 'flex',
        flex: '0 0 auto',
      },
      actionButton: {
        alignSelf: 'flex-end',
        color: theme.palette.text.link,
      },
      dismissButton: {
        marginLeft: 'auto',
        marginRight: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
      },
      text: {
        alignSelf: 'center',
        fontSize: '0.875rem',
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(2) + theme.spacing(1),
      },
      headerText: {
        color: theme.palette.text.secondary,
        fontSize: '0.75rem',
        marginBottom: theme.spacing(1),
      },
      message: {
        fontSize: '0.875rem',
        wordBreak: 'break-word',
      },
      typeTab: {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderTopLeftRadius: theme.shape.borderRadius,
        bottom: 0,
        left: 0,
        position: 'absolute',
        top: 0,
        width: theme.spacing(1),
      },
      errorType: {
        '& $typeTab': {
          backgroundColor: theme.palette.error.main,
        },
      },
      infoType: {
        '& $typeTab': {
          backgroundColor: theme.palette.primary.main,
        },
      },
      successType: {
        '& $typeTab': {
          backgroundColor: theme.palette.success.main,
        },
      },
      warningType: {
        '& $typeTab': {
          backgroundColor: theme.palette.warning.main,
        },
      },
      actionButtonsContainer: {
        display: 'flex',
        alignSelf: 'flex-end',
        marginBottom: theme.spacing(0.5),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(0.5),
      },
    }),
  { name: 'UxtNotification' },
);

export interface NotificationNotification {
  action?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  actionText?: string;
  headerText?: string;
  id?: number | string;
  isDismissable?: boolean;
  message?: string;
  secondaryAction?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  secondaryActionText?: string;
  type?: 'error' | 'info' | 'success' | 'warning';
  timestamp?: Date;
}

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  dismissIconButtonProps?: Partial<IconButtonProps>;
  notification?: NotificationNotification;
  onDismiss?: (notification: NotificationNotification) => void;
  timestampAccessor?:
    | string
    | ((notification: NotificationNotification) => string);
}

const Notification = React.forwardRef(function Notification(
  props: NotificationProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    dismissIconButtonProps,
    notification = { isDismissable: true, type: 'info' as const },
    onDismiss,
    timestampAccessor = 'timestamp',
    ...rest
  } = props;
  const classes = useStyles(props);
  const {
    action,
    actionText = '',
    headerText = '',
    isDismissable = true,
    secondaryAction,
    secondaryActionText = '',
  } = notification;

  const handleDismiss = React.useCallback(
    function handleDismiss(e: React.MouseEvent<HTMLDivElement>) {
      e.persist();
      e.nativeEvent.stopImmediatePropagation();
      onDismiss?.(notification);
    },
    [notification, onDismiss],
  );

  const safeHeaderText = React.useMemo((): string => {
    const timestamp = safeGet(undefined, timestampAccessor, notification);
    if (!timestamp) return headerText;

    const testTimestamp = formatDistance(timestamp, Date.now(), {
      includeSeconds: true,
    });
    const shouldAddSuffix = !testTimestamp.includes('less than');

    return formatDistance(timestamp, Date.now(), {
      includeSeconds: true,
      addSuffix: shouldAddSuffix,
    });
  }, [headerText, timestampAccessor]);

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.errorType]: notification.type === 'error',
          [classes.infoType]: notification.type === 'info',
          [classes.successType]: notification.type === 'success',
          [classes.warningType]: notification.type === 'warning',
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <div className={classes.body}>
        <div className={classes.typeTab} />
        <div className={classes.text}>
          {showIf(safeHeaderText)(
            <div className={classes.headerText}>{safeHeaderText}</div>,
          )}
          <div className={classes.message}>{notification.message}</div>
        </div>
        {showIf(isDismissable)(
          <IconButton
            className={classes.dismissButton}
            iconSvg={closeSvg}
            onClick={handleDismiss}
            size={20}
            {...dismissIconButtonProps}
          />,
        )}
      </div>
      <div className={classes.actionButtonsContainer}>
        {showIf(secondaryActionText)(
          <Button
            appearance="text"
            onClick={secondaryAction}
            text={secondaryActionText}
          />,
        )}
        {showIf(actionText)(
          <Button
            appearance="text"
            className={classes.actionButton}
            onClick={action}
            text={actionText}
          />,
        )}
      </div>
    </div>
  );
});

export default React.memo(Notification);
