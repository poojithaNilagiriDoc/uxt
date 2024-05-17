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
        cursor: 'pointer',
        display: 'flex',
        fontSize: '0.875rem',
        height: theme.height.item,
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        position: 'relative',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '&::after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          transition: 'background-color 0.1s ease',
        },
        '&:hover::after': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:active::after': {
          backgroundColor: theme.palette.action.disabled,
        },
      },
    }),
  { name: 'UxtUserMenuItem' },
);

export interface UserMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  text?: string;
}

const UserMenuItem = React.forwardRef(function UserMenuItem(
  props: UserMenuItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, classes: classesProp, text, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      {text}
    </div>
  );
});

export default React.memo(UserMenuItem);
