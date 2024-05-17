import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        animationIterationCount: 'infinite',
        animationName: '$uxtSpinnerLine',
        animationTimingFunction: 'linear',
      },
      shape: {
        animationIterationCount: 'infinite',
        animationName: '$uxtSpinnerLineShape',
        animationTimingFunction: 'ease-in-out',
        fill: 'transparent',
        stroke: theme.palette.primary.main,
        strokeDasharray: 175,
        strokeDashoffset: 170,
        strokeLinecap: 'round',
        strokeWidth: 6,
        transformOrigin: 'center center',
      },
      '@keyframes uxtSpinnerLine': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      '@keyframes uxtSpinnerLineShape': {
        '0%': {
          strokeDashoffset: 170,
          transform: 'rotate(0deg)',
        },
        '50%': {
          strokeDashoffset: 10,
          transform: 'rotate(180deg)',
        },
        '100%': {
          strokeDashoffset: 170,
          transform: 'rotate(0deg)',
        },
      },
    }),
  { name: 'UxtSpinnerLine' },
);

export interface SpinnerLineProps extends React.HTMLAttributes<SVGElement> {
  className?: string;
  classes?: object;
  duration?: number;
  height?: number;
  width?: number;
}

function SpinnerLine(props: SpinnerLineProps) {
  const {
    className,
    classes: classesProp,
    duration,
    height,
    width,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <svg
      className={classnames(classes.root, className)}
      style={{
        animationDuration: `${duration}ms`,
        height: height,
        width: width,
      }}
      viewBox="0 0 64 64"
      {...rest}
    >
      <circle
        className={classes.shape}
        cx={32}
        cy={32}
        r={28}
        style={{
          animationDuration: `${duration}ms`,
        }}
      />
    </svg>
  );
}

export default React.memo(SpinnerLine);
