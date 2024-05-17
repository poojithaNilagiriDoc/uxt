import classnames from 'classnames';
import { motion, MotionProps } from 'framer-motion';
import times from 'lodash/times';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import useTheme from '../_helpers/useTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {},
      tick: {
        backgroundColor: theme.palette.divider,
        borderRadius: 1,
        height: (props: SpinnerTicksProps) => props.height / 10,
        left: '50%',
        position: 'absolute',
        top: 0,
        transformOrigin: (props: SpinnerTicksProps) =>
          `50% ${props.height / 2}px`,
        transition: 'background-color 100ms ease',
        width: 2,
      },
    }),
  { name: 'UxtSpinnerTicks' },
);

type HTMLAttributesWithoutMotionProps<
  Attributes extends React.HTMLAttributes<Element>,
  Element extends HTMLElement,
> = {
  [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};

export interface SpinnerTicksProps
  extends HTMLAttributesWithoutMotionProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  classes?: object;
  duration?: number;
  height?: number;
  tickCount?: number;
  width?: number;
}

const SpinnerTicks = React.forwardRef(function SpinnerTicks(
  props: SpinnerTicksProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    duration,
    height,
    tickCount = 16,
    width,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isFilling, setIsFilling] = React.useState(true);
  const theme = useTheme();

  const rootVariants = React.useMemo(
    () => ({
      empty: { transition: { staggerChildren: duration / tickCount / 1000 } },
      filled: { transition: { staggerChildren: duration / tickCount / 1000 } },
    }),
    [duration, tickCount],
  );

  return (
    <motion.div
      animate={isFilling ? 'filled' : 'empty'}
      className={classnames(classes.root, className)}
      onAnimationComplete={() => {
        setIsFilling(!isFilling);
      }}
      ref={ref}
      variants={rootVariants}
      {...rest}
    >
      {times(tickCount, n => (
        <motion.div
          className={classes.tick}
          initial="empty"
          key={n}
          style={{
            transform: `translateX(-50%) rotate(${n * (360 / tickCount)}deg)`,
          }}
          variants={{
            empty: { backgroundColor: theme.palette.divider },
            filled: { backgroundColor: theme.palette.primary.main },
          }}
        />
      ))}
    </motion.div>
  );
});

export default React.memo(SpinnerTicks);
