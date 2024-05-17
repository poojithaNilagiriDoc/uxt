import classnames from 'classnames';
import isNumber from 'lodash/fp/isNumber';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { AutoSizer } from 'react-virtualized';
import makeStyles from '../_helpers/makeStyles';
import SpinnerLine from './SpinnerLine';
import SpinnerTicks from './SpinnerTicks';

function sizeToPixels(size) {
  if (isNumber(size)) return size;

  if (size === 'auto') return '100%';

  if (size === 'small') return 24;

  if (size === 'large') return 64;

  return 48;
}

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flex: (props: SpinnerProps) =>
        props.size === 'auto' ? '1 1 auto' : '0 0 auto',
      height: (props: SpinnerProps) => sizeToPixels(props.size),
      width: (props: SpinnerProps) => sizeToPixels(props.size),
    },
    svg: {},
  }),
  { name: 'UxtSpinner' },
);

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  appearance?: 'line' | 'ticks';
  className?: string;
  classes?: object;
  duration?: number;
  size?: 'auto' | 'large' | 'medium' | 'small' | number;
}

const Spinner = React.forwardRef(function Spinner(
  props: SpinnerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    appearance = 'line',
    classes: classesProp,
    className,
    duration = 2500,
    size,
    ...rest
  } = props;
  const classes = useStyles(props);

  const SvgComponent = appearance === 'ticks' ? SpinnerTicks : SpinnerLine;

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <AutoSizer>
        {({ height, width }) => (
          <SvgComponent
            className={classes.svg}
            duration={duration}
            height={height}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
});

export default React.memo(Spinner);
