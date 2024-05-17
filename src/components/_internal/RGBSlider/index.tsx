import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import Slider from '../../Slider';
import toUpperCase from '../../_helpers/toUpperCase';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        display: 'flex',
        flex: '0 0 auto',
      },
      label: {
        fontSize: '0.875rem',
        marginLeft: theme.spacing(2),
      },
      slider: {
        flex: '1 1 auto',
      },
      sliderLeftTrack: {
        display: 'none',
      },
      sliderRightTrack: {
        border: `1px solid ${theme.palette.action.disabled}`,
        borderRadius: 6,
        height: 8,
        left: '0 !important',
      },
      sliderThumbCenter: {
        backgroundColor: theme.palette.background.thumb,
        borderColor: theme.palette.background.thumb,
        boxShadow: theme.shadows[2],
        height: 18,
        width: 18,
      },
      sliderAtZero: {
        '& $sliderThumbCenter': {
          backgroundColor: theme.palette.background.thumb,
          borderColor: theme.palette.background.thumb,
        },
      },
      tooltip: {
        borderRadius: '50%',
        boxShadow: theme.shadows[1],
        height: 40,
        margin: 2,
        width: 40,
      },
    }),
  { name: 'UxtRGBSlider' },
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

export interface RGBSliderProps extends DivAttributesWithoutColor {
  className?: string;
  classes?: object;
  color?: RGBAColor;
  controlledComponent?: 'b' | 'g' | 'r';
  label?: string;
  onColorChange?: (color: RGBAColor) => void;
  onColorChangeEnd?: (color: RGBAColor) => void;
}

function RGBSlider(props: RGBSliderProps) {
  const {
    className,
    classes: classesProp,
    color = { a: 0, b: 0, g: 0, r: 0 },
    controlledComponent = 'r' as const,
    label,
    onColorChange,
    onColorChangeEnd,
    ...rest
  } = props;
  const classes = useStyles(props);

  const getRGBString = React.useCallback(
    function getRGBString(controlledComponentValue) {
      return {
        b: `rgb(${color.r}, ${color.g}, ${controlledComponentValue})`,
        g: `rgb(${color.r}, ${controlledComponentValue}, ${color.b})`,
        r: `rgb(${controlledComponentValue}, ${color.g}, ${color.b})`,
      }[controlledComponent];
    },
    [color.b, color.g, color.r, controlledComponent],
  );

  const getGradientStop = React.useCallback(
    function getGradientStop(percent) {
      const controlledComponentValue = Math.ceil((percent / 100) * 255);

      return `${getRGBString(controlledComponentValue)} ${percent}%`;
    },
    [getRGBString],
  );

  const handleSliderValueChange = React.useCallback(
    function handleSliderValueChange(value: unknown) {
      onColorChange?.({
        ...color,
        [controlledComponent]: value,
      });
    },
    [color, controlledComponent, onColorChange],
  );

  const handleSliderValueChangeEnd = React.useCallback(
    (value: number) => {
      onColorChangeEnd?.({ ...color, [controlledComponent]: value });
    },
    [color, controlledComponent, onColorChangeEnd],
  );

  const tooltipContentComponent = React.useCallback(
    ({ value }) => {
      return (
        <div
          className={classes.tooltip}
          style={{ backgroundColor: getRGBString(value) }}
        />
      );
    },
    [getRGBString, classes],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <div className={classes.label}>
        {label || toUpperCase(controlledComponent)}
      </div>
      <Slider
        className={classes.slider}
        classes={{
          leftTrack: classes.sliderLeftTrack,
          rightTrack: classes.sliderRightTrack,
          thumbCenter: classes.sliderThumbCenter,
          atZero: classes.sliderAtZero,
        }}
        isInputEnabled={true}
        maxValue={255}
        minValue={0}
        onValueChange={handleSliderValueChange}
        onValueChangeEnd={handleSliderValueChangeEnd}
        rightTrackStyles={{
          background: `
        linear-gradient(
          to right,
          ${getGradientStop(0)},
          ${getGradientStop(50)},
          ${getGradientStop(100)}
        )
        `,
        }}
        tooltipContentComponent={tooltipContentComponent}
        value={color[controlledComponent]}
      />
    </div>
  );
}

export default React.memo(RGBSlider);
