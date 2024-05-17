import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import FloatingToolbarSubmenu from '../FloatingToolbarSubmenu';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.height.toolbar,
        boxShadow: theme.shadows[1],
        display: 'inline-flex',
        flex: '0 0 auto',
        height: theme.height.toolbar,
        overflow: 'hidden',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        position: 'absolute',
      },
      content: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 0 auto',
      },
    }),
  { name: 'UxtFloatingToolbar' },
);

export interface FloatingToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
}

const FloatingToolbar = React.forwardRef(function FloatingToolbar(
  props: FloatingToolbarProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const contentRef = React.useRef();
  const { children, className, classes: classesProp, ...rest } = props;
  const classes = useStyles(props);
  const mappedChildren = React.useMemo(
    () =>
      React.Children.map(children, child => {
        if (
          (child as React.ReactElement<any>).type === FloatingToolbarSubmenu
        ) {
          return React.cloneElement(child as React.ReactElement<any>, {
            toolbarContentRef: contentRef.current,
          });
        }
        return child;
      }),
    [children, contentRef],
  );

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.content} ref={contentRef}>
        {mappedChildren}
      </div>
    </div>
  );
});

export default React.memo(FloatingToolbar);
