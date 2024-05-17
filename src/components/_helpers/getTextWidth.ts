import round from 'lodash/round';

// fontStyle Example: '16px Roboto'
const textMeasuringCanvas: HTMLCanvasElement =
  typeof document !== 'undefined'
    ? document.createElement('canvas')
    : undefined;

export default function getTextWidth(
  fontStyle: React.CSSProperties['font'],
  text: string,
): number {
  const context: CanvasRenderingContext2D = textMeasuringCanvas
    ? textMeasuringCanvas.getContext('2d')
    : null;

  if (!context) return 0;

  context.font = fontStyle;

  const metrics: TextMetrics = context.measureText(text);
  return round(metrics.width);
}
