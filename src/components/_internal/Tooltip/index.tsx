import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.sidebar,
        borderRadius: 4,
        boxShadow: theme.shadows[2],
        color: theme.palette.common.white,
        display: 'inline-flex',
        height: 32,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      text: {
        ...theme.typography.body2,
      },
    }),
  { name: 'UxtTooltip' },
);

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  text?: string;
}

const Tooltip = React.forwardRef(function Tooltip(
  props: TooltipProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, classes: classesProp, text, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.text}>{text}</div>
    </div>
  );
});

export default React.memo(Tooltip);
