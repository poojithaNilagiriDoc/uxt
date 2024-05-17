import React from 'react';
import play from 'uxt-graphics/icons/play';
import stop from 'uxt-graphics/icons/stop';
import createStyles from '@material-ui/core/styles/createStyles';
import CountdownTimer, {
  CountdownTimerMethods,
  CountdownTimerProps,
} from '../index';
import NotificationService from '../../../services/NotificationService';
import Icon from '../../Icon';
import makeStyles from '../../_helpers/makeStyles';
import { UxtTheme } from '../../../themes/UxtTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background:
          'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      },
      iconButton: {
        marginTop: theme.spacing(4),
        fill: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: theme.palette.error.light,
      },
      icon: {
        width: 128,
        height: 128,
      },
      timer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.paper,
        margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
        boxShadow: theme.shadows[3],
        borderRadius: theme.spacing(0.5),
        width: 180,
        height: 180,
        ...theme.typography.h4,
        [theme.breakpoints.down('sm')]: {
          width: 100,
          height: 100,
        },
        [theme.breakpoints.down('xs')]: {
          width: 50,
          height: 50,
          ...theme.typography.h5,
        },
      },
      timerText: {
        ...theme.typography.h5,
        [theme.breakpoints.down('xs')]: {
          ...theme.typography.body2,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  { name: 'UxtCountdownTimerCustom' },
);

export default function CountdownTimerCustom(props: CountdownTimerProps) {
  const classes = useStyles(props);
  const countDownDate: Date = new Date('April 23,2022 8:16:05');
  const countdownTimerRef = React.useRef<CountdownTimerMethods>();
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const handleTimerEnd = React.useCallback((): void => {
    NotificationService.success('Timer has ended');
  }, []);

  const handleStartStop = React.useCallback((): void => {
    isPlaying
      ? countdownTimerRef.current.stop()
      : countdownTimerRef.current.start();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <div className={classes.root}>
      <CountdownTimer
        classes={{
          timer: classes.timer,
          timerText: classes.timerText,
        }}
        remainingTime={countDownDate}
        onTimerEnd={handleTimerEnd}
        ref={countdownTimerRef}
        showText={true}
      />
      <div className={classes.iconButton} onClick={handleStartStop}>
        <Icon
          className={classes.icon}
          svg={isPlaying ? stop : play}
          size={128}
        />
      </div>
    </div>
  );
}
