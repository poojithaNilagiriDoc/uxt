import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import includes from 'lodash/fp/includes';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import RibbonBarButton from '../RibbonBarButton';
import RibbonBarType from '../constants/ribbonBarType';
import Size from '../constants/size';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'inline-flex',
        '&:active $icon': {
          borderColor: `${theme.palette.divider}`,
        },
      },
      icon: {
        borderLeft: 'none',
        marginLeft: 0,
        minWidth: 16,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingRight: 0,
        border: '1px solid transparent',
        width: ({ appearance }: RibbonBarSplitButtonProps) =>
          appearance === 'classic' ? 12 : 16,
        height: ({ appearance }: RibbonBarSplitButtonProps) =>
          appearance === 'classic' ? 24 : 40,
      },
      disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
      button: {
        marginLeft: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        justifyContent: 'end',
        width: ({ appearance, text }: RibbonBarSplitButtonProps) =>
          text ? 'auto' : appearance === 'classic' ? 22 : 32,
        height: ({ appearance }: RibbonBarSplitButtonProps) =>
          appearance === 'classic' ? 24 : 40,
      },
      content: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        color: theme.palette.text.primary,
        display: 'flex',
        fill: theme.palette.action.active,
        flex: '0 0 auto',
        overflow: 'hidden',
      },
      iconButton: {
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: 'auto',
      },
      iconText: {
        width: ({ appearance }: RibbonBarSplitButtonProps) =>
          appearance === 'classic' ? 22 : theme.spacing(4),
        height: ({ appearance }: RibbonBarSplitButtonProps) =>
          appearance === 'classic' ? theme.spacing(3) : theme.height.item,
        marginLeft: 0,
      },
      splitIcon: {
        marginLeft: theme.spacing(-2),
      },
      buttonActive: {
        background: theme.palette.divider,
      },
    }),
  { name: 'UxtRibbonBarSplitButton' },
);

const sizesArray = Object.values(Size);

type AllButtonSizes = typeof sizesArray[number];
export type ButtonSizes = Exclude<
  AllButtonSizes,
  'extra small' | 'extra large'
>;

const ribbonBarTypeArray = Object.values(RibbonBarType);

type AllRibbonBarTypes = typeof ribbonBarTypeArray[number];
export type RibbonBarTypes = AllRibbonBarTypes;

export interface RibbonBarSplitButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  appearance?: RibbonBarTypes;
  className?: string;
  classes?: Record<string, string>;
  isDisabled?: boolean;
  isActive?: boolean;
  isOpen?: boolean;
  onIsOpenChange?: (isOpen: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  popoverContent?: React.ReactNode;
  iconSvg?: string;
  iconSize?: ButtonSizes | number;
  size?: ButtonSizes;
  text?: string;
  title?:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const RibbonBarSplitButton = React.forwardRef(function RibbonBarSplitButton(
  props: RibbonBarSplitButtonProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    appearance = 'simplified',
    className,
    classes: classesProp,
    isDisabled,
    iconSvg,
    iconSize,
    isActive = false,
    isOpen: isOpenProp = false,
    onClick,
    onIsOpenChange,
    popoverContent,
    size,
    text,
    title,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpenProp);
  const popperRef = React.useRef<HTMLButtonElement>(null);

  const handleClose = React.useCallback((): void => {
    if (!onIsOpenChange) {
      setIsOpen(false);
      return;
    }
    onIsOpenChange(false);
  }, [onIsOpenChange]);

  const handleAction = React.useCallback(
    (e: React.MouseEvent<HTMLElement>): void => {
      e.preventDefault();
      e.stopPropagation();

      handleClose();
      onClick?.(e);
    },
    [handleClose, onClick],
  );

  const handleOpen = React.useCallback((): void => {
    if (isDisabled) return;
    if (!onIsOpenChange) {
      setIsOpen(true);
      return;
    }
    onIsOpenChange(true);
  }, [isDisabled, onIsOpenChange]);

  const handleOnIconClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>): void => {
      e.preventDefault();
      e.stopPropagation();

      isOpen === true ? handleClose() : handleOpen();
    },
    [isOpen, handleOpen, handleClose],
  );

  React.useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const sizeOfTheIcon = React.useMemo((): ButtonSizes | number => {
    if (includes(iconSize, sizesArray) || typeof iconSize === 'number')
      return iconSize;

    return appearance === 'simplified' ? 20 : 16;
  }, [iconSize, appearance]);

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.disabled]: isDisabled },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <RibbonBarButton
        iconSvg={iconSvg}
        text={text}
        className={classnames(classes.button, {
          [classes.iconButton]: !text,
          [classes.buttonActive]: isActive,
        })}
        onClick={handleAction}
        classes={{ icon: classes.iconText }}
        iconSize={sizeOfTheIcon}
        ref={popperRef}
        title={text || title}
      />
      <RibbonBarButton
        iconSvg={chevronDown}
        className={classes.icon}
        onClick={handleOnIconClick}
        iconSize={sizeOfTheIcon}
        classes={{ icon: classes.splitIcon }}
      />
      {showIf(popperRef && popoverContent)(() => (
        <Popper
          className={classes.menu}
          open={isOpen}
          placement={'bottom-start'}
          anchorEl={popperRef.current}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <div className={classes.content}>{popoverContent}</div>
          </ClickAwayListener>
        </Popper>
      ))}
    </div>
  );
});

export default React.memo(RibbonBarSplitButton);
