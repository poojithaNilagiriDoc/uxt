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
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
      countdownText: {
        ...theme.typography.h1,
        [theme.breakpoints.down('xs')]: { ...theme.typography.h4 },
      },
      timerText: {
        ...theme.typography.h5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: theme.spacing(1),
      },
      timer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      timerContainer: {
        display: 'inline-flex',
      },
    }),
  { name: 'UxtCountdownTimerBasics' },
);

export default function CountdownTimerBasics(props: CountdownTimerProps) {
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
        className={classes.countdownText}
        remainingTime={countDownDate}
        onTimerEnd={handleTimerEnd}
        ref={countdownTimerRef}
        classes={{
          timerText: classes.timerText,
          timerContainer: classes.timerContainer,
        }}
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
