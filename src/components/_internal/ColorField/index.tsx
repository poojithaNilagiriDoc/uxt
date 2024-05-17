import classnames from 'classnames';
import Color from 'color';
import round from 'lodash/round';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  createStyles({
    root: {
      position: 'relative',
    },
    tint: {
      background:
        'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    shade: {
      background: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    indicator: {
      backgroundColor: 'transparent',
      border: '1px solid white',
      borderRadius: 4,
      boxShadow:
        '0 2px 5px rgba(0, 0, 0, 0.25), 0 2px 5px rgba(0, 0, 0, 0.25) inset',
      height: 8,
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      width: 8,
    },
  }),
  { name: 'UxtColorField' },
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

interface HSVAColor {
  a: number;
  h: number;
  s: number;
  v: number;
}

export interface ColorFieldProps extends DivAttributesWithoutColor {
  className?: string;
  classes?: object;
  color?: RGBAColor;
  onColorChange?: (color: RGBAColor) => void;
  onColorChangeEnd?: (color: RGBAColor) => void;
  style?: React.CSSProperties;
  width?: number;
}

const ColorField = React.forwardRef(function ColorField(
  props: ColorFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    color = { a: 0, b: 0, g: 0, r: 0 },
    onColorChange,
    onColorChangeEnd,
    style,
    width,
    ...rest
  } = props;
  const classes = useStyles(props);

  const hsva = React.useMemo(() => rgbaToHsva(color), [color]);

  const handleDrag = React.useCallback(
    function handleDrag(e, data: DraggableData) {
      if (onColorChange) {
        const { height, width } = data.node.getBoundingClientRect();
        const s = (100 / width) * data.x;
        const v = 100 - (100 / height) * data.y;

        onColorChange(hsvaToRgba({ ...hsva, s, v }));
      }
    },
    [hsva, onColorChange],
  );

  const handleDragStart = React.useCallback(
    function handleDrag(e, data: DraggableData) {
      if (onColorChange) {
        const { height, width } = data.node.getBoundingClientRect();
        const s = (100 / width) * data.x;
        const v = 100 - (100 / height) * data.y;

        onColorChange(hsvaToRgba({ ...hsva, s, v }));
      }
    },
    [hsva, onColorChange],
  );

  const handleDragEnd = React.useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      const { height, width } = data.node.getBoundingClientRect();
      const s = (100 / width) * data.x;
      const v = 100 - (100 / height) * data.y;

      if (onColorChangeEnd) onColorChangeEnd?.(hsvaToRgba({ ...hsva, s, v }));
      if (onColorChange) onColorChange?.(hsvaToRgba({ ...hsva, s, v }));
    },
    [hsva, onColorChange, onColorChangeEnd],
  );

  return (
    <DraggableCore
      onDrag={handleDrag}
      onStart={handleDragStart}
      onStop={handleDragEnd}
    >
      <div
        className={classnames(classes.root, className)}
        ref={ref}
        style={{
          backgroundColor: `hsl(${hsvaToHslHue(hsva)}, 100%, 50%)`,
          height: (width / 4) * 2.2,
          width,
          ...style,
        }}
        {...rest}
      >
        <div className={classes.tint} />
        <div className={classes.shade} />
        <div
          className={classes.indicator}
          style={{ left: `${hsva.s}%`, top: `${100 - hsva.v}%` }}
        />
      </div>
    </DraggableCore>
  );
});

export default React.memo(ColorField);

function hsvaToHslHue(hsva) {
  const hsl = Color({ h: hsva.h, s: hsva.s, v: hsva.v }).hsl().object();

  return hsl.h;
}

function hsvaToRgba(hsva: HSVAColor): RGBAColor {
  const rgb = Color({ h: hsva.h, s: hsva.s, v: hsva.v }).rgb().object();

  return {
    a: hsva.a,
    b: round(rgb.b),
    g: round(rgb.g),
    r: round(rgb.r),
  };
}

function rgbaToHsva(rgba: RGBAColor): HSVAColor {
  return {
    ...Color({ b: rgba.b, g: rgba.g, r: rgba.r }).hsv().object(),
    a: rgba.a,
  };
}
