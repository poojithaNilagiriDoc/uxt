import classnames from 'classnames';
import findIndex from 'lodash/fp/findIndex';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {},
      label: {
        color: theme.palette.text.secondary,
        fontSize: '0.75rem',
      },
    }),
  { name: 'UxtRadioGroup' },
);

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  label?: string;
  onValueChange?: (value: any) => void;
  value?: any;
}

const RadioGroup = React.forwardRef(function RadioGroup(
  props: RadioGroupProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    label,
    onValueChange,
    value,
    ...rest
  } = props;
  const classes = useStyles(props);

  const mappedChildren = React.useMemo(
    () =>
      React.Children.map(React.Children.toArray(children), child =>
        React.cloneElement(child as React.ReactElement<any>, {
          onSelect: onValueChange,
          selectedValue: value,
        }),
      ),
    [children, onValueChange, value],
  );

  const choices = React.useMemo(
    () =>
      React.Children.map(children, (c: React.ReactElement<any>) =>
        c ? c.props : undefined,
      ),
    [children],
  );

  const selectNextChoice = React.useCallback(
    function selectNextChoice() {
      const selectedIndex = findIndex({ value })(choices);

      if (selectedIndex === choices.length - 1) return;

      onValueChange(choices[selectedIndex + 1].value);
    },
    [choices, onValueChange, value],
  );

  const selectPreviousChoice = React.useCallback(
    function selectPreviousChoice() {
      const selectedIndex = findIndex({ value })(choices);

      if (selectedIndex === 0) return;

      onValueChange(choices[selectedIndex - 1].value);
    },
    [choices, onValueChange, value],
  );

  const handleKeyUp = React.useCallback(
    function handleKeyUp(e) {
      const arrowDownKeyCode = 40;
      const arrowUpKeyCode = 38;

      if (e.keyCode === arrowDownKeyCode) {
        selectNextChoice();
      }

      if (e.keyCode === arrowUpKeyCode) {
        selectPreviousChoice();
      }
    },
    [selectNextChoice, selectPreviousChoice],
  );

  return (
    <div
      className={classnames(classes.root, className)}
      onKeyUp={handleKeyUp}
      ref={ref}
      tabIndex={0}
      {...rest}
    >
      <div className={classes.label}>{label}</div>
      {mappedChildren}
    </div>
  );
});

export default React.memo(RadioGroup);
