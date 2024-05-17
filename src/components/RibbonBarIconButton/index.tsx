import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import includes from 'lodash/fp/includes';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';
import type { IconProps } from '../Icon';
import RibbonBarType from '../constants/ribbonBarType';
import Size from '../constants/size';
import RibbonBarTooltip from '../RibbonBarTooltip';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: 40,
        justifyContent: 'center',
        position: 'relative',
        width: 40,
        '&::after': {
          backgroundColor: 'transparent',
          borderRadius: theme.shape.borderRadius,
          content: '""',
          display: 'block',
          height: 36,
          left: '50%',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 100ms ease',
          width: 36,
        },
        '&:hover::after': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:active::after': {
          backgroundColor: theme.palette.action.disabled,
        },
      },
      classic: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        '&::after': {
          width: theme.spacing(3),
          height: theme.spacing(3),
        },
      },
      icon: {
        height: '100%',
        width: '100%',
      },
      disabled: {
        opacity: 0.5,
        pointerEvents: 'auto',
        cursor: 'default',
        '&:active': {
          pointerEvents: 'none',
        },
        '&::after': {
          display: 'none',
        },
      },
    }),
  { name: 'UxtRibbonBarIconButton' },
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

export interface RibbonBarIconButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  appearance?: RibbonBarTypes;
  className?: string;
  classes?: Record<string, string>;
  currentSize?: number;
  iconProps?: Partial<IconProps>;
  iconSvg?: string;
  iconSize?: ButtonSizes | number;
  isDisabled?: boolean;
  size?: ButtonSizes;
  title?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const RibbonBarIconButton = React.forwardRef(function RibbonBarIconButton(
  props: RibbonBarIconButtonProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    iconProps,
    iconSvg,
    iconSize,
    isDisabled,
    size,
    title,
    appearance = 'simplified',
    ...rest
  } = props;
  const classes = useStyles(props);

  const sizeOfTheIcon = React.useMemo((): ButtonSizes | number => {
    if (includes(iconSize, sizesArray) || typeof iconSize === 'number')
      return iconSize;

    return appearance === 'classic' ? 'small' : 'regular';
  }, [iconSize, appearance]);

  return (
    <RibbonBarTooltip title={title} isDisabled={isDisabled}>
      <div
        className={classnames(
          classes.root,
          {
            [classes.disabled]: isDisabled,
            [classes.classic]: appearance === 'classic',
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        <Icon
          className={classes.icon}
          size={sizeOfTheIcon}
          svg={iconSvg}
          {...iconProps}
        />
      </div>
    </RibbonBarTooltip>
  );
});

export default React.memo(RibbonBarIconButton);
