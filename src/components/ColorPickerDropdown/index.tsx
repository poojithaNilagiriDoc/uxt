import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';
import type { IconProps } from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        display: 'flex',
        height: theme.height.input,
        overflow: 'hidden',
        position: 'relative',
        width: 60,
        '&::after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          content: '""',
          display: 'block',
          transition: 'background-color 100ms ease',
        },
        '&:hover::after': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:active::after': {
          backgroundColor: theme.palette.action.disabled,
        },
      },
      swatch: {
        position: 'relative',
        width: theme.height.input,
      },
      swatchBackground: {
        ...theme.mixins.absoluteFill,
        backgroundImage:
          'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd 100%), linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd 100%)',
        backgroundPosition: '0 0, 4px 4px',
        backgroundSize: '8.1px 8.1px',
      },
      swatchForeground: {
        ...theme.mixins.absoluteFill,
      },
      dropdown: {
        alignItems: 'center',
        borderLeft: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'center',
        width: 20,
      },
      dropdownChevron: {},
    }),
  { name: 'UxtColorPickerDropdown' },
);

type DivAttributesWithoutColor = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'color'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

interface RGBAColor {
  a: number;
  b: number | '';
  g: number | '';
  r: number | '';
}

export interface ColorPickerDropdownProps extends DivAttributesWithoutColor {
  className?: string;
  classes?: object;
  color?: RGBAColor;
  expanderIconProps?: Partial<IconProps>;
}

const ColorPickerDropdown = React.forwardRef(function ColorPickerDropdown(
  props: ColorPickerDropdownProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    color,
    expanderIconProps,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.swatch}>
        <div className={classes.swatchBackground} />
        <div
          className={classes.swatchForeground}
          style={{
            backgroundColor: `rgba(
              ${color?.r === '' ? 0 : color?.r},
              ${color?.g === '' ? 0 : color?.g},
              ${color?.b === '' ? 0 : color?.b},
              ${color?.a}
            )`,
          }}
        />
      </div>
      <div className={classes.dropdown}>
        <Icon
          className={classes.dropdownChevron}
          size="small"
          svg={chevronDown}
          {...expanderIconProps}
        />
      </div>
    </div>
  );
});

export default React.memo(ColorPickerDropdown);
