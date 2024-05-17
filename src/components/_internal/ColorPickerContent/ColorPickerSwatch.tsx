import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import Checkbox from '../../Checkbox';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        width: 40,
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
      background: {
        backgroundImage:
          'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd 100%), linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd 100%)',
        backgroundPosition: '0 0, 4px 4px',
        backgroundSize: '8.1px 8.1px',
        borderRadius: 4,
        height: 24,
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 24,
      },
      foreground: {
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
        height: 24,
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 24,
      },
      checkbox: {
        bottom: 2,
        margin: 0,
        position: 'absolute',
        right: 2,
      },
      checkboxActive: {
        '& $checkboxBox': {
          backgroundColor: theme.palette.common.white,
          borderColor: theme.palette.common.white,
        },
        '& $checkboxCheck': {
          backgroundColor: theme.palette.common.white,
        },
        '&:focus $checkboxBox': {
          borderColor: theme.palette.common.white,
        },
      },
      checkboxBox: {
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.common.white,
        boxShadow: theme.shadows[1],
        margin: 0,
        transform: ' scale(0.75)',
      },
      checkboxCheck: {
        '&::after': {
          borderColor: theme.palette.common.black,
        },
      },
    }),
  { name: 'UxtColorPickerSwatch' },
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

export interface ColorPickerSwatchProps extends DivAttributesWithoutColor {
  className?: string;
  classes?: object;
  color?: RGBAColor;
  index?: number;
  isCheckable?: boolean;
  isChecked?: boolean;
  onApply?: (color: RGBAColor) => void;
  onCheckToggle?: (index: number) => void;
}

function ColorPickerSwatch(props: ColorPickerSwatchProps) {
  const {
    className,
    classes: classesProp,
    color = { a: 0, b: 0, g: 0, r: 0 },
    index,
    isCheckable,
    isChecked,
    onApply,
    onCheckToggle,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleClick = React.useCallback(
    function handleClick() {
      if (isCheckable) {
        onCheckToggle(index);
        return;
      }
      onApply(color);
    },
    [color, index, isCheckable, onApply, onCheckToggle],
  );

  return (
    <div
      className={classnames(classes.root, className)}
      onClick={handleClick}
      {...rest}
    >
      <div className={classes.background} />
      <div
        className={classes.foreground}
        style={{
          backgroundColor: `rgba(
            ${color.r},
            ${color.g},
            ${color.b},
            ${color.a}
          )`,
        }}
      />
      {showIf(isCheckable)(
        <Checkbox
          className={classes.checkbox}
          classes={{
            active: classes.checkboxActive,
            box: classes.checkboxBox,
            check: classes.checkboxCheck,
          }}
          isActive={isChecked}
        />,
      )}
    </div>
  );
}

export default React.memo(ColorPickerSwatch);
