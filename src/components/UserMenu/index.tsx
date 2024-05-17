import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import chevronUp from 'uxt-graphics/icons/chevron-up';
import user from 'uxt-graphics/icons/user';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
      },
      header: {
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        display: 'flex',
        flex: '1 0 auto',
        height: theme.height.toolbar,
        paddingLeft: theme.spacing(0.5),
      },
      text: {
        ...theme.typography.subtitle2,
        flex: '1 1 auto',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(0.25),
      },
      userIcon: {},
      chevron: {},
      items: {
        backgroundColor: theme.palette.action.hover,
        boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
        overflow: 'hidden',
      },
    }),
  { name: 'UxtUserMenu' },
);

export interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  text?: string;
}

const UserMenu = React.forwardRef(function UserMenu(
  props: UserMenuProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, className, classes: classesProp, text, ...rest } = props;
  const classes = useStyles(props);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.header} onClick={() => setIsOpen(!isOpen)}>
        <Icon className={classes.userIcon} size="small" svg={user} />
        <div className={classes.text}>{text}</div>
        <Icon
          className={classes.chevron}
          size="small"
          svg={isOpen ? chevronUp : chevronDown}
        />
      </div>
      <div className={classes.items} style={{ height: isOpen ? 'auto' : '0' }}>
        {children}
      </div>
    </div>
  );
});

export default React.memo(UserMenu);
