import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'flex-start',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
      },
      label: {
        flex: '1 1 auto',
        marginBottom: theme.spacing(1),
        marginTop: 14,
        transition: 'color 0.25s ease',
      },
      switch: {
        alignItems: 'center',
        display: 'flex',
        flex: '0 0 auto',
        height: 18,
        marginBottom: (theme.height.item - 18) / 2,
        marginTop: (theme.height.item - 18) / 2,
        position: 'relative',
        width: 36,
      },
      track: {
        backgroundColor: theme.palette.action.disabled,
        borderRadius: 8,
        height: 12,
        transition: 'background-color 0.25s ease',
        width: 36,
      },
      thumb: {
        backgroundColor: theme.palette.background.thumb,
        borderRadius: '100%',
        boxShadow: theme.shadows[1],
        height: 18,
        left: 0,
        position: 'absolute',
        top: 0,
        transform: 'translateX(0)',
        transition: 'transform 0.25s ease, background-color 0.25s ease',
        width: 18,
      },
      disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      on: {
        '& $track': {
          backgroundColor: theme.palette.action.selected,
        },
        '& $thumb': {
          backgroundColor: theme.palette.primary.main,
          transform: 'translateX(18px)',
        },
      },
    }),
  { name: 'UxtSwitch' },
);

export interface SwitchProps
  extends React.HTMLAttributes<HTMLDivElement>,
    React.HTMLProps<HTMLDivElement> {
  className?: string;
  classes?: object;
  isDisabled?: boolean;
  isOn?: boolean;
  onIsOnChange?: (isOn: boolean, e: MouseEvent) => void;
  text?: string;
}

const Switch = React.forwardRef(function Switch(
  props: SwitchProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isDisabled = false,
    isOn,
    onIsOnChange,
    text,
    ...rest
  } = props;

  const classes = useStyles(props);

  const handleClick = React.useCallback(
    function handleClick(e) {
      if (isDisabled) return;

      onIsOnChange(!isOn, e);
    },
    [isDisabled, isOn, onIsOnChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.disabled]: isDisabled,
          [classes.on]: isOn,
        },
        className,
      )}
      tabIndex={isDisabled ? -1 : 0}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      {showIf(text)(() => (
        <div className={classes.label}>{text}</div>
      ))}
      <div className={classes.switch}>
        <div className={classes.track} />
        <div className={classes.thumb} />
      </div>
    </div>
  );
});

export default React.memo(Switch);
