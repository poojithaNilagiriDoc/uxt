import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';
import type { IconProps } from '../Icon';

const cancel =
  '<svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.typography.body1,
        alignItems: 'center',
        backgroundColor: 'inherit',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 32,
        cursor: 'pointer',
        display: 'inline-flex',
        fontSize: '0.9375rem',
        height: 32,
        overflow: 'hidden',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        position: 'relative',
        transition: 'background-color 250ms ease',
        userSelect: 'none',
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
        height: 20,
        width: 20,
      },
      label: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'stretch',
        flex: '1 1 auto',
        flexDirection: 'row',
        gap: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      deleteButton: {
        height: 18,
        width: 18,
      },
      active: {
        backgroundColor: theme.palette.action.selected,
        borderColor: theme.palette.action.selected,
      },
    }),
  { name: 'UxtChip' },
);

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  deleteIconProps?: Partial<IconProps>;
  iconSvg?: string;
  isActive?: boolean;
  onDelete?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onIsActiveChange?: (isActive: boolean, e: MouseEvent) => void;
  text?: string;
}

const Chip = React.forwardRef(function Chip(
  props: ChipProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    classes: classesProp,
    className,
    children,
    deleteIconProps,
    isActive,
    iconSvg,
    onDelete,
    onIsActiveChange,
    text,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleClick = React.useCallback(
    function handleClick(e) {
      if (!onIsActiveChange) return;

      onIsActiveChange(!isActive, e);
    },
    [isActive, onIsActiveChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.active]: isActive },
        className,
      )}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      <>
        {showIf(iconSvg)(() => (
          <Icon className={classes.icon} svg={iconSvg} />
        ))}
        {showIf(!children)(<span className={classes.label}>{text}</span>)}
        <div className={classes.content}>{children}</div>
        {showIf(onDelete)(() => (
          <Icon
            className={classes.deleteButton}
            onClick={onDelete}
            size={18}
            svg={cancel}
            {...deleteIconProps}
          />
        ))}
      </>
    </div>
  );
});

export default React.memo(Chip);
