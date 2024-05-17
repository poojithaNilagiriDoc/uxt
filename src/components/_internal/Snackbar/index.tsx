import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import Button from '../../Button';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.sidebar,
        borderLeft: `${theme.spacing(1)}px solid transparent`,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        color: theme.palette.getContrastText(theme.palette.background.sidebar),
        display: 'flex',
        height: theme.height.item,
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(3),
      },
      message: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      actionButton: {
        color: theme.palette.primary.light,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(-2),
        '&:hover': {
          cursor: 'pointer',
        },
      },
      multiline: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: 'auto',
        paddingBottom: 20,
        paddingTop: 20,
        '& $message': {
          hyphens: 'auto',
          overflow: 'visible',
          textOverflow: 'clip',
          whiteSpace: 'normal',
        },
        '& $actionButton': {
          marginLeft: 'auto',
        },
      },
      error: { borderColor: theme.palette.error.main },
      info: { borderColor: theme.palette.primary.main },
      success: { borderColor: theme.palette.success.main },
      warning: { borderColor: theme.palette.warning.main },
    }),
  { name: 'UxtSnackbar' },
);

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  actionText?: string;
  className?: string;
  classes?: object;
  isMultiline?: boolean;
  message?: string;
  onActionClick?: () => void;
  type?: 'error' | 'info' | 'success' | 'warning';
}

function Snackbar(props: SnackbarProps) {
  const {
    actionText,
    className,
    classes: classesProp,
    isMultiline,
    message,
    onActionClick,
    type,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.error]: type === 'error',
          [classes.info]: type === 'info',
          [classes.multiline]: isMultiline,
          [classes.success]: type === 'success',
          [classes.warning]: type === 'warning',
        },
        className,
      )}
      {...rest}
    >
      <div className={classes.message}>{message}</div>
      {showIf(actionText)(() => (
        <Button
          appearance="text"
          className={classes.actionButton}
          onClick={onActionClick}
          text={actionText}
        />
      ))}
    </div>
  );
}

export default React.memo(Snackbar);
