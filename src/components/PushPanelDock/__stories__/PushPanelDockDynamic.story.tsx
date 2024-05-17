import React from 'react';
import star from 'uxt-graphics/icons/star';
import camera from 'uxt-graphics/icons/camera';
import cost from 'uxt-graphics/icons/cost';
import help from 'uxt-graphics/icons/help';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '../../_helpers/makeStyles';
import { PushPanelDockItemProps } from '../../PushPanelDockItem';
import PushPanelDock from '../index';
import tags from '../../../../sample-data/tags';
import Shell from '../../Shell';
import List from '../../List';
interface DynamicPushPanelDockItem extends PushPanelDockItemProps {
  id?: string;
  title?: string;
  keepMounted?: boolean;
}

const StarPanelContent = props => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  return (
    <Shell>
      <List
        items={tags}
        onSelectedItemChange={item => setSelectedItems([item])}
        onSelectedItemsChange={items => setSelectedItems(items)}
        primaryTextAccessor="name"
        secondaryTextAccessor="description"
        selectedItems={selectedItems}
        selectionMode="mixed"
      />
    </Shell>
  );
};

const CameraPanelContent = props => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  return (
    <Shell>
      <List
        items={tags}
        onSelectedItemChange={item => setSelectedItems([item])}
        onSelectedItemsChange={items => setSelectedItems(items)}
        primaryTextAccessor="name"
        secondaryTextAccessor="description"
        selectedItems={selectedItems}
        selectionMode="mixed"
      />
    </Shell>
  );
};

const getPanelContent: (content: string) => React.ReactNode = (
  content: string,
) => <h1>{content}</h1>;

const dockItems: Array<DynamicPushPanelDockItem> = [
  {
    id: 'star',
    title: 'star',
    iconSvg: star,
    panelContent: <StarPanelContent />,
    keepMounted: true,
  },
  {
    id: 'camera',
    title: 'camera',
    iconSvg: camera,
    keepMounted: false,
    panelContent: <CameraPanelContent />,
  },
  {
    id: 'cost',
    title: 'cost',
    iconSvg: cost,
    panelContent: getPanelContent('cost'),
  },
  {
    id: 'info',
    iconSvg: help,
    title: 'info',
    panelContent: getPanelContent('info'),
  },
];

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'row-reverse',
      },
      panelContainer: {
        height: '100%',
        display: 'flex',
        flex: '0 0 auto',
      },
    }),
  {
    name: 'PushPanelDockBasics',
  },
);

export default function PushPanelDockDynamic(props) {
  const classes = useStyles(props);
  const [width, setWidth] = React.useState<number>(256);
  const [activeDockItem, setActiveDockItem] =
    React.useState<DynamicPushPanelDockItem>(dockItems[0]);

  return (
    <div className={classes.root}>
      <PushPanelDock
        activeDockItem={activeDockItem}
        dockItems={dockItems}
        onActiveDockItemChange={setActiveDockItem}
        isOnRight={true}
        isDockVisible={dockItems.length > 1}
        panelWidth={width}
        onPanelWidthChange={setWidth}
      />
    </div>
  );
}
