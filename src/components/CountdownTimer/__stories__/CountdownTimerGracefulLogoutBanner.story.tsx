import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../../_helpers/makeStyles';
import Button from '../../Button';
import Shell from '../../Shell';
import Banner from '../../Banner';
import { UxtTheme } from '../../../themes/UxtTheme';
import CountdownTimer, { CountdownTimerMethods } from '../index';
import NotificationService from '../../../services/NotificationService';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      showBannerButton: {
        margin: 20,
      },
      bannerButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      root: {
        paddingLeft: theme.spacing(0.5),
      },
    }),
  {},
);

function CountdownTimerGracefulLogoutBanner(props) {
  const classes = useStyles(props);
  const countDownDate: Date = new Date(Date.now() + 5 * 60 * 1000);
  const countdownTimerRef = React.useRef<CountdownTimerMethods>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    !isOpen
      ? countdownTimerRef.current.stop()
      : countdownTimerRef.current.start();
  }, [isOpen]);

  const handleClick = React.useCallback((): void => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleActionButton1Click = React.useCallback((): void => {
    setIsOpen(false);
    countdownTimerRef.current.stop();
    NotificationService.info('You are still signed in');
  }, []);

  const displayMessage: React.ReactNode = (
    <>
      You will be logged out in
      <CountdownTimer
        classes={{
          root: classes.root,
        }}
        remainingTime={countDownDate}
        ref={countdownTimerRef}
      />
    </>
  );

  return (
    <Shell>
      <Banner
        actionButton1Text="Keep me signed in"
        isOpen={isOpen}
        message={displayMessage}
        onActionButton1Click={handleActionButton1Click}
      />
      <div className={classes.bannerButton}>
        <Button
          className={classes.showBannerButton}
          onClick={handleClick}
          text="Show Banner"
        />
      </div>
    </Shell>
  );
}

export default CountdownTimerGracefulLogoutBanner;
