import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import globe from 'uxt-graphics/icons/globe';
import makeStyles from '../../_helpers/makeStyles';
import Button from '../../Button';
import Shell from '../../Shell';
import Banner from '../index';

const useStyles = makeStyles(
  createStyles({
    showBannerButton: {
      margin: 20,
    },
  }),
  {},
);

function BannerConfirmation(props) {
  const classes = useStyles(props);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = React.useCallback(
    function handleClick() {
      setIsOpen(!isOpen);
    },
    [isOpen],
  );

  return (
    <Shell>
      <Banner
        actionButton1Text="continue as guest"
        iconSvg={globe}
        isOpen={isOpen}
        message="Your password was updated on your other device. In order to continue working, please sign in again to access your account."
        onActionButton1Click={() =>
          console.log('You Selected to Continue as a Guest')
        }
        actionButton2Text="sign in"
        onActionButton2Click={() => console.log('You Selected to Sign In')}
      ></Banner>
      <div>
        <Button
          className={classes.showBannerButton}
          onClick={handleClick}
          text="Show Banner"
        />
      </div>
    </Shell>
  );
}

export default BannerConfirmation;
