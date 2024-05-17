import classnames from 'classnames';
import clamp from 'lodash/fp/clamp';
import times from 'lodash/fp/times';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

function getTransforms() {
  const getX = i => (-1 * (100 - i)) / 2;

  const getScale = i => i / 100;

  const getStep = i => ({
    scale: getScale(i),
    x: getX(i),
  });

  const steps = times(getStep, 100);

  return steps.map(step => `translateX(${step.x}%) scaleX(${step.scale})`);
}

const transforms = getTransforms();

function getFillStyle(value) {
  const clampedValue = clamp(0, 100, value);

  return { transform: transforms[Math.round(clampedValue)] };
}

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        height: 5,
        overflow: 'hidden',
        width: '100%',
      },
      fill: {
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        width: '100%',
      },
      indeterminate: {
        '& $fill': {
          animation: '$indeterminate 2s linear infinite',
          transform: 'scaleX(0)',
          transformOrigin: '0 0',
        },
      },
      '@keyframes indeterminate': {
        '0%': {
          transform: 'translateX(0%) scaleX(0)',
        },
        '50%': {
          transform: 'translateX(0%) scaleX(1)',
        },
        '100%': {
          transform: 'translateX(100%) scaleX(0)',
        },
      },
    }),
  { name: 'UxtProgressBar' },
);

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  isIndeterminate?: boolean;
  value?: number;
}

const ProgressBar = React.forwardRef(function ProgressBar(
  props: ProgressBarProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isIndeterminate,
    value,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.indeterminate]: isIndeterminate },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <div className={classes.fill} style={getFillStyle(value)} />
    </div>
  );
});

export default React.memo(ProgressBar);
