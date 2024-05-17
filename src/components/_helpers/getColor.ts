import Color from 'color';

export default function getColor(
  colorCode: string,
): React.CSSProperties['backgroundColor'] {
  if (colorCode) {
    if (colorCode.search('#') >= 0) {
      const index: number = colorCode.indexOf('#');

      return colorCode.substring(index, index + 7);
    }

    return Color(colorCode).hex();
  }
}
