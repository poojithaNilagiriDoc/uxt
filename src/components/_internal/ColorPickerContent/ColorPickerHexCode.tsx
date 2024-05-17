import classnames from 'classnames';
import Color from 'color';
import startsWith from 'lodash/fp/startsWith';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import Input from '../../Input';
import getRGBAFromNamedColor from '../../_helpers/getRGBAFromNamedColor';
import { NamedColors } from '../../ColorPicker';
import namedColors from '../../constants/namedColors';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        flex: '1 1 0',
        marginRight: theme.spacing(1),
      },
    }),
  { name: 'UxtColorPickerHexCode' },
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

export interface ColorPickerHexCodeProps extends DivAttributesWithoutColor {
  className?: string;
  classes?: object;
  color?: RGBAColor;
  label?: string;
  onColorChange?: (color: RGBAColor) => void;
  onColorChangeEnd?: (color: RGBAColor) => void;
}

function ColorPickerHexCode(props: ColorPickerHexCodeProps) {
  const {
    className,
    classes: classesProp,
    color = { a: 0, b: 0, g: 0, r: 0 },
    label = 'Hex',
    onColorChange,
    onColorChangeEnd,
    ...rest
  } = props;
  const classes = useStyles(props);
  const prevHexCode = React.useRef<string>();
  const [hexCode, setHexCode] = React.useState<NamedColors | string>(
    getRGBAFromNamedColor(color),
  );

  React.useEffect(() => {
    const { r, g, b } = getRGBAFromNamedColor(color);
    const resultantHexCode = Color({ r, g, b }).hex();
    setHexCode(resultantHexCode);
    prevHexCode.current = resultantHexCode;
  }, [color]);

  const handleBlur = React.useCallback(
    function handleBlur() {
      const fallbackColor = {
        a: 1,
        ...Color(prevHexCode.current).rgb().object(),
      } as RGBAColor;

      let safeColor: RGBAColor = fallbackColor;

      if (!(hexCode.toLowerCase() in namedColors)) {
        const withHash = startsWith('#', hexCode) ? hexCode : `#${hexCode}`;
        try {
          safeColor = Color(withHash).rgb().object();
        } catch (e: unknown) {
          safeColor = fallbackColor;
        }
      } else {
        safeColor = getRGBAFromNamedColor(
          hexCode as unknown as NamedColors,
          false,
          {
            a: 1,
            ...Color(prevHexCode.current).rgb().object(),
          },
        );
      }

      onColorChange?.({
        a: color.a,
        b: safeColor.b,
        g: safeColor.g,
        r: safeColor.r,
      });
      onColorChangeEnd?.({
        a: color.a,
        b: safeColor.b,
        g: safeColor.g,
        r: safeColor.r,
      });
    },
    [color, hexCode, onColorChange, onColorChangeEnd, setHexCode],
  );

  return (
    <Input
      autoComplete="off"
      className={classnames(classes.root, className)}
      label={label}
      onBlur={handleBlur}
      onValueChange={setHexCode}
      value={hexCode}
      {...rest}
    />
  );
}

export default React.memo(ColorPickerHexCode);

export function getHexCode(rgba: RGBAColor): string {
  return Color({
    b: rgba.b,
    g: rgba.g,
    r: rgba.r,
  }).hex();
}
