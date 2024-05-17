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
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.height.toolbar / 2,
        boxShadow: theme.shadows[2],
        color: theme.palette.primary.contrastText,
        cursor: 'pointer',
        display: 'inline-flex',
        fill: theme.palette.primary.contrastText,
        flex: '0 0 auto',
        height: theme.height.toolbar,
        overflow: 'hidden',
        position: 'relative',
        transition: 'height 0.25s ease',
        width: theme.height.toolbar,
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
      icon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        transition: 'margin-left 0.25s ease, margin-right 0.25s ease',
      },
      text: {
        fontSize: '0.875rem',
        opacity: 0,
        overflow: 'hidden',
        paddingRight: 0,
        textTransform: 'uppercase',
        transition:
          'opacity 0.1s ease, padding-right 0.25s ease, width 0.25s ease',
        width: 0,
      },
      extended: {
        borderRadius: theme.height.item / 2,
        height: theme.height.item,
        width: 'auto',
        '& $icon': {
          marginLeft: theme.spacing(0.5),
          marginRight: theme.spacing(0.5),
        },
        '& $text': {
          opacity: 1,
          paddingRight: theme.spacing(2.5),
          width: 'auto',
        },
      },
      mini: {
        borderRadius: theme.height.input / 2,
        height: theme.height.input,
        width: theme.height.input,
        '& $icon': {
          marginLeft: 0,
          marginRight: 0,
        },
      },
      disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    }),
  { name: 'UxtFab' },
);

export interface FabProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  iconProps?: Partial<IconProps>;
  iconSvg?: string;
  isDisabled?: boolean;
  isExtended?: boolean;
  isMini?: boolean;
  text?: string;
}

const Fab = React.forwardRef(function Fab(
  props: FabProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    iconProps,
    iconSvg,
    isExtended = false,
    isDisabled,
    isMini = false,
    text,
    ...rest
  } = props;
  const classes = useStyles(props);
  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.extended]: isExtended,
          [classes.disabled]: isDisabled,
          [classes.mini]: isMini,
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <Icon className={classes.icon} svg={iconSvg} {...iconProps} />
      <div className={classes.text}>{text}</div>
    </div>
  );
});

export default React.memo(Fab);
