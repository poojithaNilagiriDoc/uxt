import { v4 as uuid } from 'uuid';
import React from 'react';
import classnames from 'classnames';
import { isEqual, isEmpty } from 'lodash/fp';
import createStyles from '@material-ui/core/styles/createStyles';
import close from 'uxt-graphics/icons/close';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import { UxtTheme } from '../../themes/UxtTheme';
import PushPanelDockItem from '../PushPanelDockItem';
import PushPanel from '../PushPanel';
import IconButton from '../IconButton';
import ScrollableContainer from '../ScrollableContainer';
import Orientation from '../constants/orientation';
import KeepMounted from '../KeepMounted';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: (props: PushPanelDockProps) =>
          props.isOnRight ? 'row-reverse' : 'row',
        flex: '1 1 auto',
      },
      dock: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.paper,
        height: '100%',
        boxShadow: theme.shadows[2],
        zIndex: theme.zIndex.detailsPanel,
      },
      close: {
        paddingLeft: theme.spacing(0.5),
      },
      divider: {
        border: `1px solid ${theme.palette.divider}`,
        width: '95%',
        margin: 'auto',
        marginBottom: theme.spacing(1),
        marginLeft: -1,
      },
      scrollableContainer: {
        height: ({ onClose }: PushPanelDockProps) =>
          onClose ? `calc(100% - ${theme.height.toolbar}px)` : '100%',
      },
      pushPanel: {},
      item: {},
      panelContentContainer: {
        display: 'contents',
      },
    }),
  {
    name: 'UxtPushPanelDock',
  },
);

interface Item {
  [key: string]: any;
}

interface PushPanelDockProps<T = Item>
  extends React.HTMLAttributes<HTMLDivElement> {
  activeDockItem?: Item;
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  idAccessor?: string | ((item: T) => string);
  isDockVisible?: boolean | (() => boolean);
  isOnRight?: boolean;
  itemComponent?: React.ElementType;
  keepMountedAccessor?: string | ((item: Item) => string);
  onActiveDockItemChange?: (item: T) => void;
  onClose?: () => void;
  onPanelWidthChange?: (width: number) => void;
  panelContentAccessor?: string | ((item: T) => string);
  panelMaxWidth?: number;
  panelMinWidth?: number;
  panelWidth?: number; //TODO: Ideally should be React.CSSProperties['width']. However, PushPanel has already defined it as number and we need to refactor it later.
  dockItems?: Array<T>;
  titleAccessor?: string | ((item: T) => string);
}
const PushPanelDock = React.forwardRef(function PushPanelDock(
  props: PushPanelDockProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    activeDockItem,
    children,
    className,
    classes: classesProp,
    idAccessor = 'id',
    isDockVisible = true,
    isOnRight = false,
    itemComponent: PanelItemComponent = PushPanelDockItem,
    keepMountedAccessor = 'keepMounted' as const,
    onActiveDockItemChange,
    onClose,
    onPanelWidthChange,
    panelContentAccessor = 'panelContent' as const,
    panelMaxWidth,
    panelMinWidth = 0,
    panelWidth = 256,
    dockItems,
    titleAccessor = 'title',
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleOnsIsActiveChange = React.useCallback(
    function handleOnsIsActiveChange(dockItem: Item) {
      if (onActiveDockItemChange) onActiveDockItemChange(dockItem);
    },
    [onActiveDockItemChange, panelContentAccessor],
  );

  const getItemKey = React.useCallback(
    function getItemKey(dockItem: Item): string | number {
      return safeGet(uuid(), idAccessor, dockItem);
    },
    [idAccessor],
  );

  const safeChildren = React.useMemo(
    function safeChildren() {
      if (isEmpty(dockItems)) {
        return React.Children.toArray(children).map(
          (child: React.ReactElement<any>, index: number) =>
            React.cloneElement(child, {
              key: getItemKey(child),
              isActive: safeGet(false, 'isActive', child.props),
              onIsActiveChange: handleOnsIsActiveChange,
              item: {
                panelContent: safeGet('', panelContentAccessor, child.props),
              },
            }),
        );
      }
      return dockItems.map((dockItem: Item, index: number) => (
        <PanelItemComponent
          key={getItemKey(dockItem)}
          isActive={activeDockItem ? isEqual(activeDockItem, dockItem) : false}
          onIsActiveChange={handleOnsIsActiveChange}
          item={dockItem}
          panelContent={safeGet('', panelContentAccessor, dockItem)}
          title={safeGet('', titleAccessor, dockItem)}
          className={classes.item}
        />
      ));
    },
    [
      activeDockItem,
      children,
      getItemKey,
      handleOnsIsActiveChange,
      panelContentAccessor,
      dockItems,
      titleAccessor,
      classes.item,
    ],
  );

  return (
    <div ref={ref} className={classnames(classes.root, className)} {...rest}>
      {showIf(isDockVisible)(
        <div className={classes.dock}>
          <ScrollableContainer
            className={classes.scrollableContainer}
            enableScroll={true}
            orientation={Orientation.Vertical}
          >
            {safeChildren}
          </ScrollableContainer>
          {showIf(onClose)(
            <div className={classes.close}>
              <div className={classes.divider} />
              <IconButton iconSvg={close} onClick={onClose} />
            </div>,
          )}
        </div>,
      )}
      <PushPanel
        className={classes.pushPanel}
        isOpen={activeDockItem ? true : false}
        isOnRight={isOnRight}
        minWidth={panelMinWidth}
        maxWidth={panelMaxWidth}
        onWidthChange={onPanelWidthChange}
        width={panelWidth}
      >
        {dockItems?.map((dockItem: Item, index: number) => {
          const key = safeGet(index, idAccessor, dockItem);
          const keepMounted = safeGet(false, keepMountedAccessor, dockItem);
          const isActive =
            safeGet(undefined, idAccessor, dockItem) ===
            safeGet(undefined, idAccessor, activeDockItem);
          const panelContent = safeGet(null, panelContentAccessor, dockItem);

          return keepMounted ? (
            <KeepMounted
              className={classes.panelContentContainer}
              key={key}
              keepMounted={!isActive}
              render={() => panelContent}
              shouldForceUpdate={false}
            ></KeepMounted>
          ) : isActive ? (
            <div key={key} className={classes.panelContentContainer}>
              {panelContent}
            </div>
          ) : null;
        })}
      </PushPanel>
    </div>
  );
});

export default React.memo(PushPanelDock);
