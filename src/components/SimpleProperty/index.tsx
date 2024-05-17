import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        '& + &': {
          marginTop: theme.spacing(1.5),
        },
      },
      name: {
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(0.5),
      },
      value: {},
    }),
  { name: 'UxtSimpleProperty' },
);

export interface SimplePropertyProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  name?: React.ReactNode;
  value?: React.ReactNode;
}

const SimpleProperty = React.forwardRef(function SimpleProperty(
  props: SimplePropertyProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, classes: classesProp, name, value, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.name}>{name}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
});

export default React.memo(SimpleProperty);
