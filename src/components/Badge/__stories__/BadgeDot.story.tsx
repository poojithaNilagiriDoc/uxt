import React from 'react';
import alarm from 'uxt-graphics/icons/alarm';
import compare from 'uxt-graphics/icons/compare';
import star from 'uxt-graphics/icons/star';
import alignCenterHorizointal from 'uxt-graphics/icons/align-center-horizontal';
import visualization from 'uxt-graphics/icons/visualization';
import createStyles from '@material-ui/core/styles/createStyles';
import Icon from '../../Icon';
import Badge from '../index';
import makeStyles from '../../_helpers/makeStyles';
import type { UxtTheme } from '../../../themes/UxtTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.mixins.absoluteFill,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  {
    name: 'UxtStorybookBadgeDot',
  },
);

export default function BadgeDot() {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <Badge isDot={true} isVisible={true}>
        <Icon svg={alarm} />
      </Badge>
      <Badge isDot={true} isVisible={true}>
        <Icon svg={compare} />
      </Badge>
      <Badge isDot={true} isVisible={true}>
        <Icon svg={star} />
      </Badge>
      <Badge isDot={true} isVisible={true}>
        <Icon svg={visualization} />
      </Badge>
      <Badge isDot={true} isVisible={true}>
        <Icon svg={alignCenterHorizointal} />
      </Badge>
    </div>
  );
}
