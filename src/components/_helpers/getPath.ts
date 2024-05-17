export default function getPath(
  notchWidth: number,
  el: object,
  height: number,
  width: number,
) {
  if (!el) return '';
  // Fall back to reading a specific corner's style because Firefox doesn't
  // report the style on border-radius.
  const radius: number = 2;
  const cornerWidth: number = radius + 1.2;
  const leadingStrokeLength: number = Math.abs(9 - cornerWidth);
  const paddedNotchWidth: number = notchWidth === 0 ? 0 : notchWidth + 8;

  // The right, bottom, and left sides of the outline follow the same SVG path.
  const pathMiddle: string =
    'a' +
    radius +
    ',' +
    radius +
    ' 0 0 1 ' +
    radius +
    ',' +
    radius +
    'v' +
    (height - 2 * cornerWidth) +
    'a' +
    radius +
    ',' +
    radius +
    ' 0 0 1 ' +
    -radius +
    ',' +
    radius +
    'h' +
    (-width + 2 * cornerWidth) +
    'a' +
    radius +
    ',' +
    radius +
    ' 0 0 1 ' +
    -radius +
    ',' +
    -radius +
    'v' +
    (-height + 2 * cornerWidth) +
    'a' +
    radius +
    ',' +
    radius +
    ' 0 0 1 ' +
    radius +
    ',' +
    -radius;

  return (
    'M' +
    (cornerWidth + leadingStrokeLength + paddedNotchWidth) +
    ',' +
    1 +
    'h' +
    (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength) +
    pathMiddle +
    'h' +
    leadingStrokeLength
  );
}
