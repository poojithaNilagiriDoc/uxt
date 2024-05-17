import Color from 'color';
import { default as NamedColorValues } from '../constants/namedColors';
import isRGBAColor from './isRGBAColor';

type NamedColors = keyof typeof NamedColorValues;

type RGBAColor = {
  a: number;
  r: number | '';
  g: number | '';
  b: number | '';
};

const getRGBAFromNamedColor = (
  color: RGBAColor | NamedColors,
  withOpacity: boolean = false,
  fallbackColor: RGBAColor | NamedColors = { a: 1, r: 0, g: 0, b: 0 },
) => {
  if (!color) return fallbackColor;

  if (isRGBAColor(color)) {
    return withOpacity ? color : { a: 1, b: color.b, g: color.g, r: color.r };
  }

  let safeColor = isRGBAColor(fallbackColor)
    ? fallbackColor
    : { a: 1, ...Color(fallbackColor.toLowerCase()).rgb().object() };

  if (String(color).toLowerCase() in NamedColorValues) {
    safeColor = {
      ...Color(NamedColorValues[String(color).toLowerCase()]).rgb().object(),
      a: 1,
    };
  }

  return safeColor;
};

export default getRGBAFromNamedColor;
