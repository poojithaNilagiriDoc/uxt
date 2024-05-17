import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import convertToDate from '../_helpers/convertToDate';

export interface CountdownTimerProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  classes?: object;
  className?: string;
  daysText?: string;
  hoursText?: string;
  minutesText?: string;
  onTimerEnd?: () => void;
  secondsText?: string;
  showText?: boolean;
  remainingTime: Date | string;
  yearsText?: string;
}

export interface CountdownTimerMethods {
  start?: () => void;
  stop?: () => void;
}

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
    },
    timer: {},
    timerContainer: {},
    timerText: {},
  }),
  { name: 'UxtCountdownTimer' },
);

const CountdownTimer = React.forwardRef(function CountdownTimer(
  props: CountdownTimerProps,
  ref: React.Ref<CountdownTimerMethods>,
) {
  const {
    className,
    daysText = 'day(s)',
    hoursText = 'hour(s)',
    minutesText = 'minute(s)',
    onTimerEnd = () => {},
    secondsText = 'second(s)',
    showText = false,
    remainingTime: remainingTimeProp,
    yearsText = 'year(s)',
  } = props;
  const classes = useStyles(props);
  const [years, setYears] = React.useState<number>(undefined);
  const [days, setDays] = React.useState<number>(undefined);
  const [hours, setHours] = React.useState<number>(undefined);
  const [minutes, setMinutes] = React.useState<number>(undefined);
  const [seconds, setSeconds] = React.useState<number>(undefined);
  const timerStopped = React.useRef<boolean>(true);
  const interval = React.useRef<ReturnType<typeof setTimeout>>();
  const remainingTime = React.useRef<Date>(
    typeof remainingTimeProp === 'string'
      ? convertToDate(remainingTimeProp as string)
      : remainingTimeProp,
  );

  const getLeapYears = (startYear: number, endYear: number): number => {
    let leapYears: number = 0;

    for (let i = startYear; i <= endYear; i++) {
      if (i % 100 === 0 ? i % 400 === 0 : i % 4 === 0) leapYears++;
    }
    return leapYears;
  };

  const getRemainingTime = React.useCallback((): void => {
    const now = new Date();
    const timeDifference: number =
      remainingTime.current.getTime() - now.getTime();
    let years: number = remainingTime.current.getFullYear() - now.getFullYear();
    const totalDays: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24),
    );
    const leapYears: number = getLeapYears(
      now.getFullYear(),
      remainingTime.current.getFullYear(),
    );

    if (totalDays - ((years - leapYears) * 365 + leapYears * 366) < 0) {
      years = 0;
    }

    const days: number = years
      ? totalDays - ((years - leapYears) * 365 + leapYears * 366)
      : totalDays;
    const hours: number = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes: number = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (timeDifference < 0) {
      clearInterval(interval.current);

      if (onTimerEnd) {
        onTimerEnd();
      }
    } else {
      setYears(years);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }
  }, [onTimerEnd, remainingTime]);

  const startTimer = React.useCallback((): void => {
    timerStopped.current = false;
    remainingTime.current =
      typeof remainingTimeProp === 'string'
        ? convertToDate(remainingTimeProp as string)
        : (remainingTimeProp as Date);

    getRemainingTime();

    interval.current = setInterval(() => {
      if (!timerStopped.current) {
        getRemainingTime();
      }
    }, 1000);
  }, [getRemainingTime, remainingTimeProp]);

  const stop = (): void => {
    timerStopped.current = true;

    if (interval.current) clearInterval(interval.current);
  };

  React.useImperativeHandle(
    ref,
    () => ({
      start: startTimer,
      stop: stop,
    }),
    [startTimer, stop],
  );

  React.useEffect(() => {
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return showIf(!timerStopped.current)(
    showText ? (
      <div className={classnames(classes.root, className)}>
        {showIf(years)(
          <div className={classes.timerContainer}>
            <div className={classes.timer}>{years}</div>
            <div className={classes.timerText}>{yearsText}</div>
          </div>,
        )}
        {showIf(days > 0 || years > 0)(
          <div className={classes.timerContainer}>
            <div className={classes.timer}>{days}</div>
            <div className={classes.timerText}>{daysText}</div>
          </div>,
        )}
        {showIf(days > 0 || years > 0 || hours > 0)(
          <div className={classes.timerContainer}>
            <div className={classes.timer}>{hours}</div>
            <div className={classes.timerText}>{hoursText}</div>
          </div>,
        )}
        {showIf(days > 0 || years > 0 || hours > 0 || minutes > 0)(
          <div className={classes.timerContainer}>
            <div className={classes.timer}>{minutes}</div>
            <div className={classes.timerText}>{minutesText}</div>
          </div>,
        )}
        {showIf(
          days > 0 || years > 0 || hours > 0 || minutes > 0 || seconds > 0,
        )(
          <div className={classes.timerContainer}>
            <div className={classes.timer}>{seconds}</div>
            <div className={classes.timerText}>{secondsText}</div>
          </div>,
        )}
      </div>
    ) : (
      <div className={classnames(classes.root, className)}>
        {showIf(years)(
          <div className={classes.timer}>
            {years < 10 ? `0${years}:` : `${years}:`}
          </div>,
        )}
        {showIf(days > 0 || years > 0)(
          <div className={classes.timer}>
            {days < 10 ? `0${days}:` : `${days}:`}
          </div>,
        )}
        {showIf(days > 0 || years > 0 || hours > 0)(
          <div className={classes.timer}>
            {hours < 10 ? `0${hours}:` : `${hours}:`}
          </div>,
        )}
        {showIf(days > 0 || years > 0 || hours > 0 || minutes > 0)(
          <div className={classes.timer}>
            {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
          </div>,
        )}
        {showIf(
          days > 0 || years > 0 || hours > 0 || minutes > 0 || seconds > 0,
        )(
          <div className={classes.timer}>
            {seconds < 10 ? `0${seconds}` : `${seconds}`}
          </div>,
        )}
      </div>
    ),
  );
});

export default React.memo(CountdownTimer);
