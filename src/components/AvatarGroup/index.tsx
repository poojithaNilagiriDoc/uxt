import { v4 as uuid } from 'uuid';
import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '../_helpers/makeStyles';
import Avatar from '../Avatar';
import { UxtTheme } from '../../themes/UxtTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      avatar: {
        marginLeft: -theme.spacing(2),
      },
      avatarRoot: {
        '&:hover': {
          backgroundColor: 'transparent',
          opacity: 1,
        },
      },
    }),
  { name: 'UxtAvatarGroup' },
);

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: Object;
  children?: JSX.Element[];
  onClick?: () => void;
  max?: number;
  size?: 'small' | 'regular' | 'large';
}

const AvatarGroup = React.forwardRef(function AvatarGroup(
  props: AvatarGroupProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    classes: classesProp,
    className,
    children,
    onClick,
    size,
    max = 3,
    ...rest
  } = props;
  const classes = useStyles(props);
  const extraAvatars: number =
    children.length > max ? children.length - max : 0;

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      {children.slice(0, children.length - extraAvatars).map((child, index) => {
        return React.cloneElement(child, {
          classes: { root: classes.avatarRoot },
          className: classnames(child.props.className, classes.avatar),
          key: uuid(),
          style: {
            zIndex: children.length - index,
          },
          size: size,
        });
      })}
      {extraAvatars ? (
        <Avatar
          className={classes.avatar}
          classes={{ root: classes.avatarRoot }}
          size={size}
          style={{
            zIndex: 0,
            marginLeft: '0.5em',
          }}
        >
          +{extraAvatars}
        </Avatar>
      ) : null}
    </div>
  );
});

export default React.memo(AvatarGroup);
