import classnames from 'classnames';
import { motion } from 'framer-motion';
import createStyles from '@material-ui/core/styles/createStyles';
import { transparentize } from 'polished';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Tooltip from '../_internal/Tooltip';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.mixins.absoluteFill,
        pointerEvents: 'none',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      background: {
        backgroundColor: transparentize(0.95, theme.palette.primary.main),
        border: `2px dashed ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        pointerEvents: 'auto',
      },
      tooltipWrapper: {
        bottom: theme.spacing(4),
        left: '50%',
        position: 'absolute',
      },
      tooltip: {},
      content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        pointerEvents: 'auto',
        gap: theme.spacing(2),
      },
      invalid: {
        '& $background': {
          backgroundColor: transparentize(0.95, theme.palette.error.main),
          borderColor: theme.palette.error.main,
        },
        '& $tooltip': {
          backgroundColor: theme.palette.error.main,
        },
      },
    }),
  { name: 'UxtDropTarget' },
);

const tooltipVariants = {
  active: { opacity: 1, x: '-50%', y: 0 },
  inactive: { opacity: 0, x: '-50%', y: 32 },
};

export interface DropTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  isFileOver?: boolean;
  isInvalid?: boolean;
  text?: string;
}

const DropTarget = React.forwardRef(function DropTarget(
  props: DropTargetProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    children,
    isFileOver,
    isInvalid,
    text,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.invalid]: isInvalid },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <motion.div
        animate={{ opacity: isFileOver ? 1 : 0 }}
        className={classes.background}
        initial={false}
        transition={{ duration: 0.25 }}
      />
      <div className={classes.content}>{children}</div>
      <motion.div
        animate={isFileOver ? 'active' : 'inactive'}
        className={classes.tooltipWrapper}
        initial={false}
        transition={{ duration: 0.25 }}
        variants={tooltipVariants}
      >
        <Tooltip className={classes.tooltip} text={text} />
      </motion.div>
    </div>
  );
});

export default React.memo(DropTarget);
