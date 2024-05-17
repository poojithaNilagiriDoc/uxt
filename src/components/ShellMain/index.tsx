import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      width: '100%',
    },
  }),
  { name: 'UxtShellMain' },
);

export interface ShellMainProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
}

const ShellMain = React.forwardRef(function ShellMain(
  props: ShellMainProps,
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

export default React.memo(ShellMain);
