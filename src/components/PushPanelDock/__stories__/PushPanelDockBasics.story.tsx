import React from 'react';
import star from 'uxt-graphics/icons/star';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '../../_helpers/makeStyles';
import PushPanelDockItem from '../../PushPanelDockItem';
import PushPanelDock from '../index';

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'row-reverse',
      },
    }),
  {
    name: 'PushPanelDockBasics',
  },
);

export default function PushPanelDockBasics(props) {
  const classes = useStyles(props);
  const [width, setWidth] = React.useState<number>(256);

  return (
    <div className={classes.root}>
      <PushPanelDock onPanelWidthChange={setWidth} panelWidth={width}>
        <PushPanelDockItem
          iconSvg={star}
          isActive={false}
          title="star"
          panelContent="Dock Item 1"
        />
        <PushPanelDockItem
          iconSvg={star}
          isActive={false}
          title="star"
          panelContent="Dock Item 2"
        />
      </PushPanelDock>
    </div>
  );
}
