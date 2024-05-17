import classnames from 'classnames';
import { motion } from 'framer-motion';
import Grow from '@material-ui/core/Grow';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import activeWorkItem from 'uxt-graphics/icons/active-work-item';
import error from 'uxt-graphics/icons/error';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import sanitize from '../../_helpers/sanitize';
import makeStyles from '../../_helpers/makeStyles';
import Button from '../../Button';
import Icon from '../../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        bottom: 0,
        color: theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: theme.zIndex.modal,
      },
      overlay: {
        backgroundColor: theme.palette.common.black,
        bottom: 0,
        left: 0,
        opacity: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      window: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 600,
        paddingTop: theme.spacing(1),
        position: 'relative',
        transform: 'scale(0)',
        maxHeight: '90vh',
      },
      header: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
      },
      errorIndicator: {
        alignItems: 'flex-end',
        display: 'none',
        paddingBottom: theme.spacing(0.5),
      },
      errorIndicatorIcon: {
        height: 16,
        fill: theme.palette.error.main,
        marginRight: theme.spacing(0.5),
        width: 16,
      },
      errorIndicatorText: {
        fontSize: '0.75rem',
        fontWeight: 600,
      },
      successIndicator: {
        alignItems: 'flex-end',
        display: 'none',
        paddingBottom: theme.spacing(0.5),
      },
      successIndicatorIcon: {
        height: 16,
        fill: theme.palette.success.main,
        marginRight: theme.spacing(0.5),
        width: 16,
      },
      successIndicatorText: {
        fontSize: '0.75rem',
        fontWeight: 600,
      },
      warningIndicator: {
        alignItems: 'flex-end',
        display: 'none',
        paddingBottom: theme.spacing(0.5),
      },
      warningIndicatorIcon: {
        height: 16,
        fill: theme.palette.warning.main,
        marginRight: theme.spacing(0.5),
        width: 16,
      },
      warningIndicatorText: {
        fontSize: '0.75rem',
        fontWeight: 600,
      },
      title: {
        ...theme.typography.h6,
        overflowWrap: 'break-word',
      },
      content: {
        overflow: 'auto',
        padding: theme.spacing(3),
        paddingTop: theme.spacing(2),
        width: '100%',
        wordWrap: 'break-word',
      },
      actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(1),
      },
      cancelButton: {},
      submitButton: {
        color: theme.palette.text.link,
      },
      error: {
        '& $window': {
          borderTop: `8px solid ${theme.palette.error.main}`,
        },
        '& $errorIndicator': {
          display: 'flex',
        },
      },
      success: {
        '& $window': {
          borderTop: `8px solid ${theme.palette.success.main}`,
        },
        '& $successIndicator': {
          display: 'flex',
        },
      },
      warning: {
        '& $window': {
          borderTop: `8px solid ${theme.palette.warning.main}`,
        },
        '& $warningIndicator': {
          display: 'flex',
        },
      },
    }),
  { name: 'UxtDialog' },
);

type DivAttributesWithoutOnSubmit = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'onSubmit'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};
export interface DialogProps extends DivAttributesWithoutOnSubmit {
  cancelText?: string;
  className?: string;
  classes?: object;
  errorText?: string;
  htmlMessage?: string;
  message?: React.ReactNode;
  onCancel?: (flag: false, e: MouseEvent) => void;
  onSubmit?: (flag: true, e: MouseEvent) => void;
  submitText?: string;
  successText?: string;
  titleText?: string;
  type?: 'error' | 'info' | 'success' | 'warning';
  warningText?: string;
}

function Dialog(props: DialogProps) {
  const {
    cancelText = 'Cancel',
    className,
    classes: classesProp,
    errorText = 'Error',
    htmlMessage,
    message,
    onCancel,
    onSubmit = () => {},
    submitText = 'Ok',
    successText = 'Success',
    titleText,
    type = 'info' as const,
    warningText = 'Warning',
    ...rest
  } = props;
  const classes = useStyles(props);

  const removeDialog = React.useCallback(function removeDialog() {
    const dialogEl = document.body.querySelector('#UxtDialog');
    if (!dialogEl) return;
    document.body.removeChild(dialogEl);
  }, []);

  const handlePopState = React.useCallback((): void => {
    window.removeEventListener('popstate', handlePopState);
    removeDialog();
  }, [removeDialog]);

  React.useEffect(
    function () {
      if (window.history.length < 2) {
        window.history.pushState(null, null, window.location.pathname);
      }
      window.addEventListener('popstate', handlePopState, true);

      return () => {
        removeDialog();
        window.removeEventListener('popstate', handlePopState);
      };
    },
    [removeDialog, handlePopState],
  );

  const handleCancel = React.useCallback(
    function handleCancel(e) {
      onCancel(false, e);
      removeDialog();
    },
    [onCancel, removeDialog],
  );

  const handleSubmit = React.useCallback(
    function handleSubmit(e) {
      onSubmit(true, e);
      removeDialog();
    },
    [onSubmit, removeDialog],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.error]: type === 'error',
          [classes.success]: type === 'success',
          [classes.warning]: type === 'warning',
        },
        className,
      )}
      {...rest}
    >
      <motion.div
        animate={{ opacity: 0.5 }}
        className={classes.overlay}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      <Grow in={true} timeout={500}>
        <div className={classes.window}>
          {showIf(titleText)(
            <div className={classes.header}>
              <div className={classes.errorIndicator}>
                <Icon
                  className={classes.errorIndicatorIcon}
                  size="small"
                  svg={error}
                />
                <div className={classes.errorIndicatorText}>{errorText}</div>
              </div>
              <div className={classes.successIndicator}>
                <Icon
                  className={classes.successIndicatorIcon}
                  size="small"
                  svg={activeWorkItem}
                />
                <div className={classes.successIndicatorText}>
                  {successText}
                </div>
              </div>
              <div className={classes.warningIndicator}>
                <Icon
                  className={classes.warningIndicatorIcon}
                  size="small"
                  svg={error}
                />
                <div className={classes.warningIndicatorText}>
                  {warningText}
                </div>
              </div>
              <div className={classes.title}>{titleText}</div>
            </div>,
          )}
          <div
            className={classes.content}
            dangerouslySetInnerHTML={
              htmlMessage ? { __html: sanitize(htmlMessage) } : undefined
            }
          >
            {htmlMessage ? undefined : message}
          </div>
          <div className={classes.actions}>
            {showIf(onCancel)(
              <Button
                appearance="text"
                className={classes.cancelButton}
                onClick={handleCancel}
                text={cancelText}
              />,
            )}
            <Button
              appearance="text"
              className={classes.submitButton}
              onClick={handleSubmit}
              text={submitText}
            />
          </div>
        </div>
      </Grow>
    </div>
  );
}

export default React.memo(Dialog);
