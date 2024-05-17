import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
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

function BannerAlert(props) {
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
        actionButton1Text="DISMISS"
        isOpen={isOpen}
        message="Some text in the banner with one action"
        onActionButton1Click={() => console.log('You Selected to Dismiss')}
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

export default BannerAlert;
