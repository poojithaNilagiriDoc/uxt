import classnames from 'classnames';
import range from 'lodash/range';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Chip from '../Chip';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        display: 'inline-flex',
        flex: '0 0 auto',
        flexWrap: 'wrap',
        paddingRight: theme.spacing(1),
      },
      chip: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
      },
      disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
        pointerEvents: 'none',
      },
    }),
  { name: 'UxtProgressControl' },
);

export interface ProgressControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  isDisabled?: boolean;
  maxValue?: number;
  minValue?: number;
  onValueChange?: (value: number) => void;
  stepSize?: number;
  value?: number;
}

const ProgressControl = React.forwardRef(function ProgressControl(
  props: ProgressControlProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isDisabled,
    maxValue = 100,
    minValue = 0,
    onValueChange,
    stepSize = 25,
    value: valueProp,
    ...rest
  } = props;
  const classes = useStyles(props);

  const possibleValues = React.useMemo(
    () =>
      range(minValue, maxValue + stepSize, stepSize).filter(
        value => value <= maxValue,
      ),
    [maxValue, minValue, stepSize],
  );

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
      {possibleValues.map((value, i) => (
        <Chip
          className={classes.chip}
          isActive={value === valueProp}
          key={i}
          onIsActiveChange={() => onValueChange(value)}
          text={`${value}%`}
        />
      ))}
    </div>
  );
});

export default React.memo(ProgressControl);
