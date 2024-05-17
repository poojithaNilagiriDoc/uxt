import Popover from '@material-ui/core/Popover';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import ReactDOM from 'react-dom';
import makeStyles from '../_helpers/makeStyles';
import Menu from '../_internal/Menu';
import MenuItem from '../MenuItem';
import type { MenuItem as MenuItemType } from '../MenuItem';

const useStyles = makeStyles(
  createStyles({
    paper: {},
    menu: {},
  }),
  { name: 'UxtContextMenu' },
);

type CreateComponent<T = object> = (props: T) => JSX.Element;

export interface ContextMenuProps<T extends HTMLElement = HTMLElement>
  extends React.HTMLAttributes<HTMLDivElement> {
  actionArguments?: Array<any>;
  anchorEl?: HTMLElement;
  anchorPoint?: { x: number; y: number };
  className?: string;
  classes?: object;
  isOpen?: boolean;
  itemComponent?:
    | string
    | React.FC<any>
    | React.ComponentClass<any, any>
    | CreateComponent;
  items?: Array<MenuItemType>;
  onIsOpenChange?: (isOpen: boolean) => void;
  popupHorizontal?: 'left' | 'right';
  popupVertical?: 'bottom' | 'top';
  portalContainer?: T;
  separatorAccessor?: string | ((...args: Array<unknown>) => string);
  targetHorizontal?: 'left' | 'right';
  targetVertical?: 'bottom' | 'top';
  usePortal?: boolean;
}

function ContextMenu<T extends HTMLElement>(props: ContextMenuProps<T>) {
  const menuRef: React.MutableRefObject<{ reset: () => void }> = React.useRef();
  const {
    actionArguments,
    anchorEl,
    anchorPoint,
    classes: classesProp,
    isOpen,
    itemComponent = MenuItem,
    items,
    onIsOpenChange,
    popupHorizontal = 'left' as const,
    popupVertical = 'top' as const,
    portalContainer = document.body,
    separatorAccessor = 'isSeparator',
    targetHorizontal = 'left' as const,
    targetVertical = 'bottom' as const,
    usePortal = true,
    ...rest
  } = props;
  const classes = useStyles(props);

  const anchorPosition = React.useMemo(() => {
    if (!anchorPoint) {
      return undefined;
    }

    return { left: anchorPoint.x, top: anchorPoint.y };
  }, [anchorPoint]);

  const handleBackdropContextMenu = React.useCallback(
    function handleBackdropContextMenu(
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ): void {
      e.preventDefault();
    },
    [],
  );

  const handleMenuActionInvoke = React.useCallback(
    function handleMenuActionInvoke(e: MouseEvent): void {
      e.stopPropagation();

      onIsOpenChange(false);
    },
    [onIsOpenChange],
  );

  const handleMenuRefChange = React.useCallback(ref => {
    menuRef.current = ref;
  }, []);

  const handlePopoverClose = React.useCallback(
    function handlePopoverClose(): void {
      onIsOpenChange(false);
    },
    [onIsOpenChange],
  );

  React.useEffect(() => {
    if (!menuRef.current) return;

    if (!isOpen) {
      menuRef.current.reset();
    }
  }, [isOpen, menuRef]);

  const menu = (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: targetHorizontal,
        vertical: targetVertical,
      }}
      anchorPosition={anchorPosition}
      anchorReference={!anchorEl ? ('anchorPosition' as const) : null}
      BackdropProps={{
        invisible: true,
        onContextMenu: handleBackdropContextMenu,
      }}
      classes={{ paper: classes.paper }}
      marginThreshold={0}
      onClose={handlePopoverClose}
      open={isOpen}
      transformOrigin={{
        horizontal: popupHorizontal,
        vertical: popupVertical,
      }}
      transitionDuration={isOpen ? 'auto' : 0}
      {...rest}
    >
      <Menu
        actionArguments={actionArguments}
        className={classes.menu}
        itemComponent={itemComponent}
        items={items}
        onActionInvoke={handleMenuActionInvoke}
        separatorAccessor={separatorAccessor}
        ref={handleMenuRefChange}
      />
    </Popover>
  );

  return usePortal ? ReactDOM.createPortal(menu, portalContainer) : menu;
}

export default React.memo(ContextMenu);
