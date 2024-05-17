import classnames from 'classnames';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) => ({
    root: {
      alignItems: 'flex-start',
      cursor: 'pointer',
      display: 'flex',
      flex: '0 0 auto',
      '&:focus $box': {
        borderColor: theme.palette.primary.main,
      },
      position: 'relative',
    },
    box: {
      backgroundColor: (props: CheckboxProps) =>
        props.isActive ? theme.palette.primary.main : 'transparent',
      border: `2px solid ${theme.palette.divider}`,
      borderColor: theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      flex: '0 0 auto',
      height: 18,
      marginBottom: (theme.height.item - 18) / 2,
      marginRight: (theme.height.item - 18) / 2,
      marginTop: (theme.height.item - 18) / 2,
      transition: 'border-color 0.25s ease',
      width: 18,
    },
    check: {
      flex: '1 1 auto',
      opacity: 0,
      position: 'relative',
      transform: 'scale(0, 0)',
      transition:
        'background-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease',
      '&::after': {
        borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
        borderLeft: `2px solid ${theme.palette.primary.contrastText}`,
        borderRight: 'none',
        borderTop: 'none',
        content: '""',
        display: 'block',
        height: 6,
        transform: 'translate(1px, 3px) rotate(-45deg)',
        width: 12,
      },
    },
    input: {
      ...theme.mixins.absoluteFill,
      cursor: 'inherit',
      height: '100%',
      opacity: 0,
      width: '100%',
      zIndex: 1,
    },
    label: {
      marginBottom: theme.spacing(1),
      marginTop: 14,
      transition: 'color 0.25s ease',
    },
    active: {
      '& $box': {
        borderColor: theme.palette.primary.main,
      },
      '& $check': {
        opacity: 1,
        transform: 'scale(1, 1)',
      },
    },
    disabled: {
      opacity: 0.5,
    },
    indeterminate: {
      '& $check::after': {
        borderLeft: 0,
        transform: 'translate(2px, 2px)',
        width: 10,
      },
    },
  }),
  { name: 'UxtCheckbox' },
);

export interface CheckboxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    React.HTMLProps<HTMLDivElement> {
  className?: string;
  classes?: object;
  isActive?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  onIsActiveChange?: (isActive: boolean, e: MouseEvent) => void;
  onIsIndeterminateChange?: (isIndeterminate: boolean, e: MouseEvent) => void;
  text?: string;
}

const Checkbox = React.forwardRef(function Checkbox(
  props: CheckboxProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isActive,
    isDisabled,
    isIndeterminate,
    onIsActiveChange = () => {},
    onIsIndeterminateChange = () => {},
    text,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleInputChange = React.useCallback(
    function handleInputChange(e) {
      if (isActive && isIndeterminate) {
        onIsIndeterminateChange(false, e);
        return;
      }

      onIsActiveChange(!isActive, e);
    },
    [isActive, isIndeterminate, onIsActiveChange, onIsIndeterminateChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.active]: isActive,
          [classes.disabled]: isDisabled,
          [classes.indeterminate]: isIndeterminate,
        },
        className,
      )}
      tabIndex={isDisabled ? -1 : 0}
      ref={ref}
      {...rest}
    >
      <div className={classes.box}>
        <div className={classes.check} />
      </div>
      <input
        checked={isActive}
        className={classes.input}
        disabled={isDisabled}
        onChange={handleInputChange}
        type="checkbox"
      />
      <label className={classes.label}>{text}</label>
    </div>
  );
});

export default React.memo(Checkbox);
