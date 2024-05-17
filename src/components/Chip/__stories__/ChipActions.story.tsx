import React from 'react';
import Divider from '@material-ui/core/Divider';
import createStyles from '@material-ui/core/styles/createStyles';
import alarm from 'uxt-graphics/icons/alarm';
import gear from 'uxt-graphics/icons/gear';
import weatherCloudy from 'uxt-graphics/icons/weather-partly-sunny';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import Card from '../../Card';
import Icon from '../../Icon';
import Chip from '../index';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        flexDirection: 'column',
        width: 420,
      },
      welcomeHeader: {
        paddingLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
      },
      dateAndTimeDisplay: {
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
      },
      weatherIconContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1),
      },
      temperatureLow: {
        color: theme.palette.text.secondary,
      },

      chipContainer: {
        display: 'inline-block',
        flexDirection: 'row',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(2),
      },
      chip: {
        marginRight: theme.spacing(1),
      },
    }),
  {},
);

function ChipActions(props) {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <img
        alt="Home"
        width={'100%'}
        src="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2014/4/29/0/RX-HGMAG021_New-Old-House-136-a-4x3.jpg.rend.hgtvcom.966.725.suffix/1400990104678.jpeg"
      />
      <div className={classes.welcomeHeader}>
        <h1>Welcome Home...</h1>
      </div>
      <div className={classes.dateAndTimeDisplay}>
        <p>Monday, 12:30 PM, Mostly Sunny</p>
      </div>
      <div className={classes.weatherIconContainer}>
        <Icon size={'regular'} svg={weatherCloudy} />
        <h5>
          81° / <span className={classes.temperatureLow}>62° </span>
        </h5>
      </div>
      <Divider variant="middle" />
      <div className={classes.chipContainer}>
        <Chip
          className={classes.chip}
          isActive={false}
          onClick={() => console.log('Turn on Lights')}
          iconSvg={gear}
          text="Turn on Lights"
        />
        <Chip
          className={classes.chip}
          isActive={false}
          onClick={() => console.log('Set Alarm')}
          iconSvg={alarm}
          text="Set Alarm"
        />
      </div>
    </Card>
  );
}

export default ChipActions;
