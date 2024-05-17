import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { NotificationServiceNotification } from '../../../services/NotificationService';
import makeStyles from '../../_helpers/makeStyles';
import Snackbar from '../Snackbar';

const useStyles = makeStyles(
  createStyles({
    root: {},
  }),
  { name: 'UxtSnackbarStack' },
);

export interface SnackbarStackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  notifications?: Array<NotificationServiceNotification>;
}

function SnackbarStack(props: SnackbarStackProps) {
  const {
    className,
    classes: classesProp,
    notifications = [],
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { easing: 'linear' }, x: '100%' }}
            initial={{ opacity: 0, y: 64 }}
            key={notification.id}
            positionTransition={true}
            style={{ marginBottom: 8 }}
          >
            <Snackbar {...notification} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(SnackbarStack);
