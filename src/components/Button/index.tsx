import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme.d';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.typography.button,
        alignItems: 'center',
        backgroundColor: 'inherit',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        color: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        fill: theme.palette.text.primary,
        flexDirection: 'row',
        height: 36,
        justifyContent: 'center',
        minWidth: 64,
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        position: 'relative',
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
        '&:focus': {
          border: `1px solid ${theme.palette.primary.main}`,
        },
      },
      icon: {
        height: 36,
        marginLeft: theme.spacing(-1.5),
        marginTop: -1,
        width: 36,
      },
      label: {
        flex: '1 1 auto',
        lineHeight: 'normal',
      },
      contained: {
        backgroundColor: theme.palette.primary.main,
        border: 0,
        boxShadow: theme.shadows[1],
        color: theme.palette.primary.contrastText,
        fill: theme.palette.primary.contrastText,
        '& $icon': {},
        '&:focus': {
          border: 'none',
        },
      },
      disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
        span: {
          opacity: 0.3,
        },
        '&:hover::after': {
          backgroundColor: 'transparent',
        },
        '&:active::after': {
          backgroundColor: 'transparent',
        },
        '&:focus': {
          borderColor: theme.palette.divider,
        },
      },
      text: {
        backgroundColor: 'transparent',
        border: 0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        '& $icon': {
          marginLeft: theme.spacing(-1.25),
          marginTop: 0,
        },
      },
    }),
  { name: 'UxtButton' },
);

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  appearance?: 'contained' | 'outlined' | 'text';
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  disabled?: boolean;
  iconSvg?: string;
  text?: string;
  type?: 'button' | 'reset' | 'submit';
}

const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const {
    appearance = 'outlined',
    children,
    className,
    classes: classesProp,
    disabled,
    iconSvg,
    text,
    type = 'button' as const,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <button
      className={classnames(
        classes.root,
        {
          [classes.contained]: appearance === 'contained',
          [classes.disabled]: disabled,
          [classes.text]: appearance === 'text',
        },
        className,
      )}
      disabled={disabled}
      ref={ref}
      type={type}
      {...rest}
    >
      {children || (
        <>
          {showIf(iconSvg)(() => (
            <Icon className={classes.icon} size="small" svg={iconSvg} />
          ))}
          <span className={classes.label}>{text}</span>
        </>
      )}
    </button>
  );
});

export default React.memo(Button);
