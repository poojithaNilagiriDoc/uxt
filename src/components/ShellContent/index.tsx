import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
  }),
  { name: 'UxtShellContent' },
);

export interface ShellContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
}

const ShellContent = React.forwardRef(function ShellContent(
  props: ShellContentProps,
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

export default React.memo(ShellContent);
