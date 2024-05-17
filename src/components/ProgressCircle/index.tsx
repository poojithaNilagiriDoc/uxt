import classnames from 'classnames';
import clamp from 'lodash/fp/clamp';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'block',
        position: 'relative',
      },
      track: {
        fill: 'transparent',
        stroke: theme.palette.action.hover,
      },
      svg: {},
      fill: {
        fill: 'transparent',
        stroke: theme.palette.primary.main,
        strokeLinecap: 'round',
        transform: 'rotate(270deg)',
        transformOrigin: 'center center',
        transition: 'stroke-dashoffset 250ms ease',
      },
      text: {
        left: '50%',
        marginLeft: 2,
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    }),
  { name: 'UxtProgressCircle' },
);

export interface ProgressCircleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  size?: number;
  style?: React.CSSProperties;
  value?: number;
}

const ProgressCircle = React.forwardRef(function ProgressCircle(
  props: ProgressCircleProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    size = 56,
    style: styleProp,
    value,
    ...rest
  } = props;
  const classes = useStyles(props);
  const safeValue = Math.round(clamp(0, 100, value));
  const strokeWidth = React.useMemo(() => {
    const baseSize = 56;
    const baseStrokeWidth = 5;

    return Math.round((size / baseSize) * baseStrokeWidth);
  }, [size]);

  const radius = React.useMemo(() => {
    const diameter = size - strokeWidth * 2;

    return diameter / 2;
  }, [size, strokeWidth]);

  const style = React.useMemo(() => {
    const baseFontSize = safeValue === 100 ? 14 : 16;

    return {
      fontSize: Math.floor((size / 56) * baseFontSize),
      height: size,
      width: size,
      ...styleProp,
    };
  }, [safeValue, size, styleProp]);

  const fillStyle = React.useMemo(() => {
    const circumference = Math.round(Math.PI * (radius * 2));

    return {
      strokeDasharray: circumference,
      strokeDashoffset: circumference - circumference * (safeValue / 100),
      strokeWidth,
    };
  }, [radius, safeValue, strokeWidth]);

  return (
    <div
      className={classnames(classes.root, className)}
      ref={ref}
      style={style}
      {...rest}
    >
      <svg className={classes.svg} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={classes.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{ strokeWidth }}
        />
        <circle
          className={classes.fill}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={fillStyle}
        />
      </svg>
      <div className={classes.text}>{safeValue}%</div>
    </div>
  );
});

export default React.memo(ProgressCircle);
