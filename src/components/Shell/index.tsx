import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  createStyles({
    root: {
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
    },
  }),
  { name: 'UxtShell' },
);

export interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
}

const Shell = React.forwardRef(function Shell(
  props: ShellProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, classes: classesProp, children, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

export default React.memo(Shell);
