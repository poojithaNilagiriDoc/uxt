import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import includes from 'lodash/fp/includes';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';
import RibbonBarType from '../constants/ribbonBarType';
import Size from '../constants/size';
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
        width: ({ appearance }: RibbonBarButtonProps) =>
          appearance === 'classic' ? 'min-content' : 'fit-content',
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
        height: 36,
        marginLeft: ({ appearance }: RibbonBarButtonProps) =>
          appearance === 'classic' ? 0 : theme.spacing(-1.5),
        marginTop: -1,
        width: 36,
      },
      label: {
        flex: '1 1 auto',
        lineHeight: 'normal',
        marginTop: ({ appearance }: RibbonBarButtonProps) =>
          appearance === 'classic' ? 2 : 0,
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
        height: ({ iconSvg, text, children }: RibbonBarButtonProps) =>
          (iconSvg && text) || children ? 68 : '',
        fontSize: theme.typography.caption.fontSize,
      },
    }),
  { name: 'UxtRibbonBarButton' },
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

export interface RibbonBarButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'title'> {
  appearance?: RibbonBarTypes;
  children?: React.ReactNode;
  className?: string;
  classes?: Record<string, string>;
  currentSize?: number;
  disabled?: boolean;
  iconSvg?: string;
  iconSize?: ButtonSizes | number;
  size?: ButtonSizes;
  text?: string;
  title?:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const RibbonBarButton = React.forwardRef(function RibbonBarButton(
  props: RibbonBarButtonProps,
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
    size,
    text,
    title,
    ...rest
  } = props;
  const classes = useStyles(props);

  const sizeOfTheIcon = React.useMemo((): ButtonSizes | number => {
    if (includes(iconSize, sizesArray) || typeof iconSize === 'number')
      return iconSize;

    return appearance === 'classic' ? 'large' : 'regular';
  }, [iconSize, appearance]);

  return (
    <RibbonBarTooltip title={title || text} isDisabled={disabled}>
      <button
        className={classnames(
          classes.root,
          {
            [classes.disabled]: disabled,
            [classes.classic]: appearance === 'classic',
          },
          className,
        )}
        disabled={disabled}
        ref={ref}
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
            <span className={classes.label}>{text}</span>
          </>
        )}
      </button>
    </RibbonBarTooltip>
  );
});

export default React.memo(RibbonBarButton);
