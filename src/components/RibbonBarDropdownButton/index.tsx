import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import Popper from '@material-ui/core/Popper';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import includes from 'lodash/fp/includes';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';
import RibbonBarType from '../constants/ribbonBarType';
import Size from '../constants/size';
import useCombinedRefs from '../../hooks/useCombinedRefs';
import RibbonBarTooltip from '../RibbonBarTooltip';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        textTransform: 'capitalize',
        alignItems: 'center',
        backgroundColor: 'inherit',
        borderRadius: theme.shape.borderRadius,
        color: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        fill: theme.palette.text.primary,
        flexDirection: 'row',
        height: 38,
        justifyContent: 'center',
        minWidth: 64,
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        border: 'none',
        width: ({ appearance }: RibbonBarDropdownButtonProps) =>
          appearance === 'classic' ? 'min-content' : 'auto',
        position: 'relative',
        '&::after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          transition: 'background-color 0.1s ease',
        },
        '&:hover::after': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:active::after': {
          backgroundColor: theme.palette.action.disabled,
        },
      },
      icon: {
        height: ({ appearance }: RibbonBarDropdownButtonProps) =>
          appearance === 'classic' ? 32 : 36,
        marginLeft: ({ appearance }: RibbonBarDropdownButtonProps) =>
          appearance === 'classic' ? 0 : theme.spacing(-1.5),
        marginTop: -1,
        width: ({ appearance }: RibbonBarDropdownButtonProps) =>
          appearance === 'classic' ? 32 : 36,
      },
      label: {
        flex: '1 1 auto',
        lineHeight: 'normal',
        marginRight: 2,
      },
      disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
        span: {
          opacity: 0.3,
        },
        '&:hover::after': {
          backgroundColor: 'transparent',
        },
        '&:active::after': {
          backgroundColor: 'transparent',
        },
      },
      classic: {
        display: 'flex',
        flexFlow: 'column',
        height: 68,
        fontSize: theme.typography.caption.fontSize,
      },
      active: {
        background: theme.palette.divider,
      },
      popover: {
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
      },
      chevronDown: {
        width: ({ appearance }: RibbonBarDropdownButtonProps) =>
          appearance === 'classic' ? 8 : 12,
        height: ({ appearance }: RibbonBarDropdownButtonProps) =>
          appearance === 'classic' ? 8 : 12,
      },
    }),
  { name: 'UxtRibbonBarDropdownButton' },
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

export interface RibbonBarDropdownButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'title'> {
  appearance?: RibbonBarTypes;
  children?: React.ReactNode;
  className?: string;
  classes?: Record<string, string>;
  currentSize?: number;
  disabled?: boolean;
  iconSvg?: string;
  iconSize?: ButtonSizes | number;
  isActive?: boolean;
  isOpen?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onIsOpenChange?: (isOpen: boolean) => void;
  popoverContent?: React.ReactNode;
  size?: ButtonSizes;
  title?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  text?: string;
}

const RibbonBarDropdownButton = React.forwardRef(
  function RibbonBarDropdownButton(
    props: RibbonBarDropdownButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) {
    const {
      appearance = 'simplified',
      children,
      className,
      classes: classesProp,
      currentSize,
      disabled,
      iconSvg,
      iconSize = 20,
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
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const rootRef = useCombinedRefs<HTMLButtonElement>(ref, innerRef);
    const [isOpen, setIsOpen] = React.useState<boolean>(isOpenProp);

    const handleClose = React.useCallback((): void => {
      if (!onIsOpenChange) {
        setIsOpen(false);
        return;
      }
      onIsOpenChange(false);
    }, [onIsOpenChange]);

    const handleOpen = React.useCallback((): void => {
      if (disabled) return;
      if (!onIsOpenChange) {
        setIsOpen(true);
        return;
      }
      onIsOpenChange(true);
    }, [disabled, onIsOpenChange]);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        e.stopPropagation();

        isOpen === true ? handleClose() : handleOpen();

        onClick?.(e);
      },
      [isOpen, handleOpen, handleClose],
    );

    React.useEffect(() => {
      setIsOpen(isOpenProp);
    }, [isOpenProp]);

    const sizeOfTheIcon = React.useMemo((): ButtonSizes | number => {
      if (includes(iconSize, sizesArray) || typeof iconSize === 'number')
        return iconSize;

      return appearance === 'classic' ? 32 : 'regular';
    }, [iconSize, appearance]);

    return (
      <RibbonBarTooltip title={title || text} isDisabled={disabled}>
        <button
          className={classnames(
            classes.root,
            {
              [classes.disabled]: disabled,
              [classes.active]: isActive,
              [classes.classic]: appearance === 'classic',
            },
            className,
          )}
          disabled={disabled}
          onClick={handleClick}
          ref={rootRef}
          {...rest}
        >
          {children || (
            <>
              {showIf(iconSvg)(() => (
                <Icon
                  className={classes.icon}
                  size={sizeOfTheIcon}
                  svg={iconSvg}
                />
              ))}
              {showIf(text)(<span className={classes.label}>{text}</span>)}
              <Icon
                svg={chevronDown}
                size={appearance === 'classic' ? 8 : 12}
                className={classes.chevronDown}
              />
            </>
          )}
          {showIf(innerRef && popoverContent)(
            <Popper
              className={classes.popover}
              open={isOpen}
              placement="bottom-start"
              anchorEl={innerRef.current}
            >
              <ClickAwayListener onClickAway={handleClose}>
                {/* Reason for adding the extra div is as children's are mandatory for the 
            ClickAwayListener component*/}
                <div>{popoverContent}</div>
              </ClickAwayListener>
            </Popper>,
          )}
        </button>
      </RibbonBarTooltip>
    );
  },
);

export default React.memo(RibbonBarDropdownButton);
