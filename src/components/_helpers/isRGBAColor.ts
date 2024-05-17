import { default as NamedColorValues } from '../constants/namedColors';

type NamedColors = keyof typeof NamedColorValues;

type RGBAColor = {
  a: number;
  r: number | '';
  g: number | '';
  b: number | '';
};

const isRGBAColor = (color: RGBAColor | NamedColors): color is RGBAColor => {
  return (
    typeof color !== 'string' &&
    'a' in color &&
    'r' in color &&
    'g' in color &&
    'b' in color
  );
};

export default isRGBAColor;
