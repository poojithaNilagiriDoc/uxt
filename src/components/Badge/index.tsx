import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import hideIf from '../_helpers/hideIf';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'inline-block',
        position: 'relative',
      },
      count: {
        alignItems: 'center',
        backgroundColor: theme.palette.error.main,
        borderRadius: 9,
        display: 'flex',
        height: 18,
        justifyContent: 'center',
        minWidth: 18,
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
      },
      countText: {
        color: 'white',
        fontSize: '0.75rem',
      },
      dot: {
        backgroundColor: theme.palette.error.main,
        borderRadius: 4,
        display: 'flex',
        height: theme.spacing(1),
        pointerEvents: 'none',
        position: 'absolute',
        right: theme.spacing(0.25),
        top: theme.spacing(0.5),
        width: theme.spacing(1),
      },
    }),
  { name: 'UxtBadge' },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  count?: number;
  isDot?: boolean;
  isVisible?: boolean;
}

const Badge = React.forwardRef(function Badge(
  props: BadgeProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    count,
    isDot,
    isVisible,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      {children}
      {showIf(isVisible || count)(
        <>
          {hideIf(isDot)(
            <div className={classes.count}>
              <span className={classes.countText}>{count}</span>
            </div>,
          )}
          {showIf(isDot)(<div className={classes.dot} />)}
        </>,
      )}
    </div>
  );
});

export default React.memo(Badge);
