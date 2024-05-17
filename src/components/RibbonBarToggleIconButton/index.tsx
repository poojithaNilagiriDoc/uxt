import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import includes from 'lodash/fp/includes';
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
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: theme.height.input,
        justifyContent: 'center',
        position: 'relative',
        width: theme.height.input,
        '&::after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          borderRadius: theme.shape.borderRadius,
          content: '""',
          display: 'block',
          margin: 2,
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
      background: {
        backgroundColor: theme.palette.divider,
        borderRadius: theme.shape.borderRadius,
        height: ({ appearance }: RibbonBarToggleIconButtonProps) =>
          appearance === 'classic' ? 20 : 36,
        transform: 'scale(0)',
        transition: 'transform 250ms ease',
        width: ({ appearance }: RibbonBarToggleIconButtonProps) =>
          appearance === 'classic' ? 20 : 36,
      },
      icon: {
        left: 0,
        position: 'absolute',
        top: 0,
      },
      active: {
        '& $background': {
          transform: 'scale(1)',
        },
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
      classic: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    }),
  { name: 'UxtRibbonBarToggleIconButton' },
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

export interface RibbonBarToggleIconButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  appearance?: RibbonBarTypes;
  className?: string;
  classes?: Record<string, string>;
  iconSvg: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onIsActiveChange?: (isActive: boolean) => void;
  iconSize?: ButtonSizes | number;
  size?: ButtonSizes;
  title?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const RibbonBarToggleIconButton = React.forwardRef(
  function RibbonBarToggleIconButton(
    props: RibbonBarToggleIconButtonProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    const {
      appearance = 'simplified',
      className,
      classes: classesProp,
      iconSvg,
      iconSize,
      isActive,
      isDisabled,
      onIsActiveChange,
      size,
      title,
      ...rest
    } = props;
    const classes = useStyles(props);

    const handleClick = React.useCallback((): void => {
      if (!onIsActiveChange) return;

      onIsActiveChange(!isActive);
    }, [isActive, onIsActiveChange]);

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
              [classes.classic]: appearance === 'classic',
              [classes.active]: isActive,
              [classes.disabled]: isDisabled,
            },
            className,
          )}
          onClick={handleClick}
          ref={ref}
          {...rest}
        >
          <div className={classes.background} />
          <Icon
            className={classnames(classes.icon, {
              [classes.classic]: appearance === 'classic',
            })}
            size={sizeOfTheIcon}
            svg={iconSvg}
          />
        </div>
      </RibbonBarTooltip>
    );
  },
);

export default React.memo(RibbonBarToggleIconButton);
