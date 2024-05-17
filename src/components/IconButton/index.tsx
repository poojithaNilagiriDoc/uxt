import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';
import type { IconProps } from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        borderRadius: 20,
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: 40,
        justifyContent: 'center',
        position: 'relative',
        width: 40,
        '&::after': {
          backgroundColor: 'transparent',
          borderRadius: 18,
          content: '""',
          display: 'block',
          height: 36,
          left: '50%',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 100ms ease',
          width: 36,
        },
        '&:hover::after': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:active::after': {
          backgroundColor: theme.palette.action.disabled,
        },
      },
      icon: {
        height: '100%',
        width: '100%',
      },
      disabled: {
        opacity: 0.5,
        pointerEvents: 'auto',
        cursor: 'default',
        '&:active': {
          pointerEvents: 'none',
        },
        '&::after': {
          display: 'none',
        },
      },
    }),
  { name: 'UxtIconButton' },
);

export interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  iconProps?: Partial<IconProps>;
  iconSvg?: string;
  isDisabled?: boolean;
  size?: 'small' | 'regular' | 'large' | number;
}

const IconButton = React.forwardRef(function IconButton(
  props: IconButtonProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    iconProps,
    iconSvg,
    isDisabled,
    size,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.disabled]: isDisabled },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <Icon className={classes.icon} size={size} svg={iconSvg} {...iconProps} />
    </div>
  );
});

export default React.memo(IconButton);
