import React from 'react';
import phone from 'uxt-graphics/icons/phone';
import check from 'uxt-graphics/icons/check';
import createStyles from '@material-ui/core/styles/createStyles';
import Avatar from '../index';
import Icon from '../../Icon';
import Position from '../../constants/position';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-evenly',
      },
      icon: {
        width: theme.spacing(2),
        height: theme.spacing(2),
        background: theme.palette.background.topbar,
        fill: theme.palette.common.white,
        borderRadius: '50%',
      },
    }),
  {
    name: 'UxtAvatarStatus',
  },
);

interface AvatarStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  classes: Object;
}

export default function AvatarStatus(props: AvatarStatusProps) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Avatar
        src="https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
        onClick={() => alert()}
        showStatus={true}
        statusType="available"
      />
      <Avatar showStatus={true} statusType="do not disturb" size="large">
        RS
      </Avatar>
      <Avatar variant="square" showStatus={true} statusType="busy">
        <Icon svg={phone} />
      </Avatar>
      <Avatar
        src="https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png"
        showStatus={true}
        statusType="away"
        statusPosition={Position.Top}
        status={<Icon svg={check} classes={{ root: classes.icon }} />}
      />
    </div>
  );
}
