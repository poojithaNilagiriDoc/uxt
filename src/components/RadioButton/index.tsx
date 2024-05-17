import classnames from 'classnames';
import isNil from 'lodash/fp/isNil';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
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
        '&:focus $radio': {
          borderColor: theme.palette.primary.main,
        },
      },
      radio: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: '100%',
        display: 'flex',
        flex: '0 0 auto',
        height: 18,
        justifyContent: 'center',
        marginBottom: (theme.height.item - 18) / 2,
        marginRight: (theme.height.item - 18) / 2,
        marginTop: (theme.height.item - 18) / 2,
        transition: 'border-color 0.25s ease',
        width: 18,
      },
      check: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '100%',
        height: 8,
        transform: 'scale(0, 0)',
        transition: 'transform 0.25s ease',
        width: 8,
      },
      label: {
        marginBottom: theme.spacing(1),
        marginTop: 14,
        transition: 'color 0.25s ease',
      },
      active: {
        '& $radio': {
          borderColor: theme.palette.primary.main,
        },
        '& $check': {
          transform: 'scale(1, 1)',
        },
      },
      disabled: {
        opacity: 0.5,
      },
    }),
  { name: 'UxtRadioButton' },
);

type DivAttributesWithoutOnSelect = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'onSelect'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

export interface RadioButtonProps extends DivAttributesWithoutOnSelect {
  className?: string;
  classes?: object;
  isDisabled?: boolean;
  onSelect?: (value: any, e: MouseEvent) => void;
  selectedValue: any;
  text: string;
  value: any;
}

const RadioButton = React.forwardRef(function RadioButton(
  props: RadioButtonProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isDisabled,
    onSelect,
    selectedValue,
    text,
    value,
    ...rest
  } = props;
  const classes = useStyles(props);

  const isActive = React.useMemo(() => {
    if (isNil(value)) return false;

    return selectedValue === value;
  }, [selectedValue, value]);

  const handleClick = React.useCallback(
    function handleClick(e) {
      if (isActive || isDisabled) return;

      onSelect(value, e);
    },
    [isActive, isDisabled, onSelect, value],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.active]: isActive,
          [classes.disabled]: isDisabled,
        },
        className,
      )}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      <div className={classes.radio}>
        <div className={classes.check} />
      </div>
      <div className={classes.label}>{text}</div>
    </div>
  );
});

export default React.memo(RadioButton);
