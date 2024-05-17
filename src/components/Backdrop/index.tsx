import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import { UxtTheme } from '../../themes/UxtTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: theme.zIndex.modal,
        flexDirection: 'column',
      },
      overlay: {
        backgroundColor: theme.palette.action.disabled,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute',
      },
      children: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
    }),
  { name: 'UxtBackdrop' },
);

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  classes?: object;
  className?: string;
  isOpen?: boolean;
  showOverlay?: boolean;
}

const Backdrop = React.forwardRef(function Backdrop(
  props: BackdropProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    isOpen = false,
    showOverlay = true,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <>
      {showIf(isOpen)(
        <div
          className={classnames(classes.root, className)}
          ref={ref}
          {...rest}
        >
          {showIf(showOverlay)(<div className={classes.overlay}></div>)}
          <div className={classes.children}>{children}</div>
        </div>,
      )}
    </>
  );
});

export default React.memo(Backdrop);
