import classnames from 'classnames';
import Popover from '@material-ui/core/Popover';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import overflow from 'uxt-graphics/icons/overflow';
import ReactDOM from 'react-dom';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import Menu from '../_internal/Menu';
import Button from '../Button';
import IconButton from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import type { MenuItem as MenuItemType } from '../MenuItem';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flex: '0 0 auto',
      position: 'relative',
      marginLeft: 'auto',
    },
    buttonWrapper: {
      display: 'flex',
    },
    disabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },
    iconButton: {},
    textButton: {},
    menu: {},
    open: {},
  }),
  { name: 'UxtOverflowButton' },
);

export interface OverflowButtonProps<T extends HTMLElement = HTMLElement>
  extends React.HTMLAttributes<HTMLDivElement> {
  actionArguments?: Array<any>;
  buttonComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  className?: string;
  classes?: object;
  iconSize?: 'small' | 'regular' | 'large' | number;
  iconSvg?: string;
  isAnimationEnabled?: boolean;
  isDisabled?: boolean;
  isOpen?: boolean;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  items?: Array<MenuItemType>;
  onIsOpenChange?: (isOpen: boolean) => void;
  overflowIconButtonProps?: Partial<IconButtonProps>;
  popupHorizontal?: 'left' | 'right';
  popupVertical?: 'bottom' | 'top';
  portalContainer?: T;
  separatorAccessor?: string | ((...args: Array<unknown>) => string);
  targetHorizontal?: 'left' | 'right';
  targetVertical?: 'bottom' | 'top';
  text?: string;
  usePortal?: boolean;
}

const OverflowButton = React.forwardRef(function OverflowButton<
  T extends HTMLElement,
>(props: OverflowButtonProps<T>, ref: React.Ref<HTMLDivElement>) {
  const menuRef: React.MutableRefObject<{ reset: () => void }> = React.useRef();
  const {
    actionArguments,
    buttonComponent,
    className,
    classes: classesProp,
    iconSize,
    iconSvg,
    isDisabled,
    isOpen: isOpenProp = false,
    itemComponent,
    items = [],
    onIsOpenChange,
    overflowIconButtonProps,
    popupHorizontal = 'right' as const,
    popupVertical = 'top' as const,
    portalContainer = document.body,
    separatorAccessor = 'isSeparator',
    targetHorizontal = 'right' as const,
    targetVertical = 'bottom' as const,
    text,
    usePortal = true,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [buttonEl, setButtonEl] = React.useState();
  const [isOpen, setIsOpen] = React.useState(isOpenProp);

  const handleButtonRefChange = React.useCallback(
    function handleButtonRefChange(ref): void {
      setButtonEl(ref);
    },
    [],
  );

  const handleClose = React.useCallback(
    function handleClose(
      event?: React.MouseEvent,
      reason?: 'backdropClick' | 'escapeKeyDown',
    ): void {
      if (reason === 'backdropClick') event.stopPropagation();

      if (!onIsOpenChange) {
        setIsOpen(false);
        return;
      }

      onIsOpenChange(false);
    },
    [onIsOpenChange],
  );

  const handleOpen = React.useCallback(
    function handleOpen(): void {
      if (!onIsOpenChange) {
        setIsOpen(true);
        return;
      }

      onIsOpenChange(true);
    },
    [onIsOpenChange],
  );

  const handleIconClick = React.useCallback(
    function handleIconClick(e): void {
      e.preventDefault();
      e.stopPropagation();

      handleOpen();
    },
    [handleOpen],
  );

  const handleMenuActionInvoke = React.useCallback(
    function handleMenuActionInvoke(e): void {
      e.stopPropagation();

      handleClose();
    },
    [handleClose],
  );

  const handleMenuRefChange = React.useCallback(function handleMenuRefChange(
    ref,
  ): void {
    menuRef.current = ref;
  },
  []);

  const handleTextClick = React.useCallback(
    function handleTextClick(e): void {
      e.preventDefault();
      e.stopPropagation();

      handleOpen();
    },
    [handleOpen],
  );

  React.useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  React.useEffect(() => {
    if (!menuRef.current) return;

    if (!isOpen) {
      menuRef.current.reset();
    }
  }, [isOpen]);

  const menu = (
    <Popover
      anchorEl={buttonEl}
      anchorOrigin={{
        horizontal: targetHorizontal,
        vertical: targetVertical,
      }}
      marginThreshold={0}
      onClose={handleClose}
      open={isOpen}
      transformOrigin={{
        horizontal: popupHorizontal,
        vertical: popupVertical,
      }}
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

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.disabled]: isDisabled, [classes.open]: isOpen },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <div className={classes.buttonWrapper} ref={handleButtonRefChange}>
        {showIf(buttonComponent)(() =>
          React.createElement(buttonComponent, {
            iconSvg: iconSvg || overflow,
            text: text,
            onClick: handleIconClick,
          }),
        )}
        {showIf(!buttonComponent && !text)(
          <IconButton
            className={classes.iconButton}
            iconSvg={iconSvg || overflow}
            onClick={handleIconClick}
            size={iconSize}
            {...overflowIconButtonProps}
          />,
        )}
        {showIf(!buttonComponent && text)(
          <Button
            appearance="text"
            className={classes.textButton}
            onClick={handleTextClick}
            text={text}
          />,
        )}
      </div>
      {showIf(buttonEl)(() =>
        usePortal ? ReactDOM.createPortal(menu, portalContainer) : menu,
      )}
    </div>
  );
});

export default React.memo(OverflowButton);
