import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flex: '0 0 auto',
        height: theme?.height?.toolbar || 56,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: '100%',
      },
      items: {
        alignItems: 'center',
        display: 'flex',
        height: theme?.height?.toolbar || 56,
        width: '100%',
        '& h1': {
          fontSize: '1.25rem',
          overflowX: 'hidden',
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      top: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      bottom: {
        borderTop: `1px solid ${theme.palette.divider}`,
      },
      centered: {
        justifyContent: 'center',
        '& $items': {
          maxWidth: theme.breakpoints.values.sm - theme.spacing(2),
        },
      },
    }),
  { name: 'UxtToolbar' },
);

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  isCentered?: boolean;
  position?: 'bottom' | 'top';
}

const Toolbar = React.forwardRef(function Toolbar(
  props: ToolbarProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    isCentered,
    position,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.bottom]: position === 'bottom',
          [classes.centered]: isCentered,
          [classes.top]: position === 'top',
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <div className={classes.items}>{children}</div>
    </div>
  );
});

export default React.memo(Toolbar);
