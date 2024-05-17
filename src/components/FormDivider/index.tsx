import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import ListItemAction, { ListItemActionAction } from '../ListItemAction';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        borderTop: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flex: '0 0 auto',
        height: theme.height.toolbar,
        marginTop: theme.spacing(3),
      },
      text: {
        fontWeight: 500,
        flex: '1 1 auto',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
      },
      action: {
        display: 'flex',
        paddingRight: theme.spacing(1),
      },
      firstSection: {
        borderTop: 'none',
        marginTop: 0,
      },
    }),
  { name: 'UxtFormDivider' },
);

export interface FormDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: ListItemActionAction;
  actionIconSvg?: string;
  actionSize?: 'small' | 'regular' | 'large' | number;
  className?: string;
  classes?: object;
  isFirstSection?: boolean;
  text?: string;
}

const FormDivider = React.forwardRef(function FormDivider(
  props: FormDividerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    action,
    actionIconSvg,
    actionSize,
    className,
    classes: classesProp,
    isFirstSection,
    text,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.firstSection]: isFirstSection },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <div className={classes.text}>{text}</div>
      <ListItemAction
        action={action}
        className={classes.action}
        iconSvg={actionIconSvg}
        size={actionSize}
      />
    </div>
  );
});

export default React.memo(FormDivider);
