import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import safeGet from '../_helpers/safeGet';
import makeStyles from '../_helpers/makeStyles';

interface KeepMountedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  className?: string;
  classes?: Record<string, string>;
  keepMounted?: boolean | (() => boolean);
  render?: () => React.ReactNode;
  shouldForceUpdate?: boolean | (() => boolean);
}

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {},
    }),
  {
    name: 'UxtKeepMounted',
  },
);

const KeepMounted = (props: KeepMountedProps) => {
  const {
    className,
    keepMounted,
    shouldForceUpdate = false,
    render,
    ...rest
  } = props;
  const children = React.useRef<React.ReactNode | null>(render());
  const classes = useStyles(props);

  React.useEffect(() => {
    if (
      safeGet(false, () => shouldForceUpdate, undefined) &&
      !safeGet(false, () => keepMounted, undefined)
    ) {
      children.current = render();
    }
  }, [shouldForceUpdate, keepMounted]);

  return (
    <div
      className={classnames(classes.root, className)}
      style={{
        display: safeGet(false, () => keepMounted, undefined) ? 'none' : null,
      }}
      {...rest}
    >
      {children.current}
    </div>
  );
};

export default React.memo(KeepMounted);
