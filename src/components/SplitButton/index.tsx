import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import Button from '../Button';
import Menu from '../_internal/Menu';
import { UxtTheme } from '../../themes/UxtTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'inline-flex',
      },
      icon: {
        borderLeft: 'none',
        marginLeft: 0,
        minWidth: 36,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingRight: 0,
        paddingLeft: 12,
      },
      disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
      menu: {
        zIndex: theme.zIndex.modal,
      },
      button: {
        marginLeft: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        justifyContent: 'end',
      },
    }),
  { name: 'UxtSplitButton' },
);

/**
 * Props for SplitButton
 * @export
 * @interface SplitButtonProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
interface Item {
  [key: string]: any;
}
export interface SplitButtonItemProps {
  action: (...actionArguments: Array<any>) => void;
  text: string;
  disabled?: boolean;
  iconSvg?: string;
}

export interface SplitButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  actionArguments?: Array<any>;
  appearance?: 'contained' | 'outlined' | 'text';
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  disabled?: boolean;
  isOpen?: boolean;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  item?: Item;
  items?: Array<SplitButtonItemProps>;
  iconSvg?: string;
  text?: string;
  onClick?: (item: Item) => void;
  onIsOpenChange?: (isOpen: boolean) => void;
}

const SplitButton = React.forwardRef(function SplitButton(
  props: SplitButtonProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const menuRef: React.MutableRefObject<{ reset: () => void }> = React.useRef();
  const {
    appearance = 'contained',
    actionArguments,
    children,
    className,
    classes: classesProp,
    disabled,
    item,
    iconSvg,
    isOpen: isOpenProp = false,
    itemComponent,
    items = [],
    text,
    onClick,
    onIsOpenChange,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isOpen, setIsOpen] = React.useState(isOpenProp);
  const popperRef = React.useRef<HTMLButtonElement>(null);

  /**Below function will close the Popover */
  const handleClose = React.useCallback(
    function handleClose() {
      if (!onIsOpenChange) {
        setIsOpen(false);
        return;
      }
      onIsOpenChange(false);
    },
    [onIsOpenChange],
  );

  /** Below function is for handling the event on Button click and it gives callBack to onClick*/
  const handleAction = React.useCallback(
    function handleAction(e) {
      e.preventDefault();
      e.stopPropagation();
      handleClose();
      onClick(e);
    },
    [handleClose, onClick],
  );

  /**Below function will open the Popover */
  const handleOpen = React.useCallback(
    function handleOpen() {
      if (disabled) return;
      if (!onIsOpenChange) {
        setIsOpen(true);
        return;
      }
      onIsOpenChange(true);
    },
    [disabled, onIsOpenChange],
  );

  /**Below function will be called when the chevron button is clicked and it will open the Popover*/
  const handleOnIconClick = React.useCallback(
    function handleOnIconClick(e: React.MouseEvent<HTMLElement>) {
      e.preventDefault();
      e.stopPropagation();
      isOpen === true ? handleClose() : handleOpen();
    },
    [isOpen, handleOpen, handleClose],
  );

  /**Below function will be called when the user clicks on the Menu item in the Popover and it will invoke the action  */
  const handleMenuActionInvoke = React.useCallback(
    function handleMenuActionInvoke(e) {
      e.stopPropagation();
      e.preventDefault();
      handleClose();
    },
    [handleClose],
  );

  /**Updates the MenuRef */
  const handleMenuRefChange = React.useCallback(function handleMenuRefChange(
    ref,
  ) {
    menuRef.current = ref;
  },
  []);

  React.useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  React.useEffect(() => {
    if (!menuRef.current) return;
    if (!isOpen) {
      menuRef.current.reset();
    }
  }, [isOpen]);

  /**Below return handles Buttons with Popover
   * Menu component is used to handle the items of the SplitButton
   */
  return (
    <div
      className={classnames(
        classes.root,
        { [classes.disabled]: disabled },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <Button
        iconSvg={iconSvg}
        text={text}
        className={classes.button}
        onClick={handleAction}
        appearance={appearance}
      />
      <Button
        iconSvg={chevronDown}
        className={classes.icon}
        onClick={handleOnIconClick}
        appearance={appearance}
        ref={popperRef}
      />
      {showIf(popperRef)(() => (
        <Popper
          className={classes.menu}
          open={isOpen}
          placement={'bottom-end'}
          anchorEl={popperRef.current}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <Menu
                actionArguments={actionArguments}
                itemComponent={itemComponent}
                items={items}
                onActionInvoke={handleMenuActionInvoke}
                ref={handleMenuRefChange}
              />
            </div>
          </ClickAwayListener>
        </Popper>
      ))}
    </div>
  );
});

export default React.memo(SplitButton);
