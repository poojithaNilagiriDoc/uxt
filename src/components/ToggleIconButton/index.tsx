import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        borderRadius: 8,
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: 40,
        justifyContent: 'center',
        position: 'relative',
        width: 40,
        '&::after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          borderRadius: 8,
          content: '""',
          display: 'block',
          margin: 2,
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
      background: {
        backgroundColor: theme.palette.action.selected,
        borderRadius: 8,
        height: 36,
        transform: 'scale(0)',
        transition: 'transform 250ms ease',
        width: 36,
      },
      icon: {
        left: 0,
        position: 'absolute',
        top: 0,
      },
      active: {
        fill: theme.palette.text.link,
        '& $background': {
          transform: 'scale(1)',
        },
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
  { name: 'UxtToggleIconButton' },
);

type HtmlDivElementProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  | 'children'
  | 'style'
  | 'onClick'
  | 'size'
  | 'action'
  | 'ref'
  | 'data'
  | 'target'
>;

export interface ToggleIconButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    HtmlDivElementProps {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  iconSvg?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onIsActiveChange?: (isActive: boolean) => void;
  size?: 'small' | 'regular' | 'large' | number;
}

const ToggleIconButton = React.forwardRef(function ToggleIconButton(
  props: ToggleIconButtonProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    iconSvg,
    isActive,
    isDisabled,
    onIsActiveChange,
    size,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleClick = React.useCallback(
    function handleClick() {
      if (!onIsActiveChange) return;
      onIsActiveChange(!isActive);
    },
    [isActive, onIsActiveChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.active]: isActive, [classes.disabled]: isDisabled },
        className,
      )}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      <div className={classes.background} />
      <Icon className={classes.icon} size={size} svg={iconSvg} />
    </div>
  );
});

export default React.memo(ToggleIconButton);
