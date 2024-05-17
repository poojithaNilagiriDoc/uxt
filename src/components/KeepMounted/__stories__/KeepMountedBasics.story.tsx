import { createStyles } from '@material-ui/core';
import React from 'react';
import star from 'uxt-graphics/icons/star';
import { v4 as uuid } from 'uuid';
import document from 'uxt-graphics/icons/document';
import type { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import KeepMounted from '../index';
import PushPanel from '../../PushPanel';
import Switch from '../../Switch';
import showIf from '../../_helpers/showIf';
import Input from '../../Input';
import ToggleIconButtonGroup from '../../ToggleIconButtonGroup';
import safeGet from '../../_helpers/safeGet';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.mixins.absoluteFill,
        width: '100%',
        height: '100%',
        display: 'flex',
      },
      content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
      },
      panel: {
        height: '100%',
        boxShadow: theme.shadows[3],
        display: 'flex',
        flexDirection: 'column',
      },
      valueContainer: {
        background: theme.palette.background.paper,
        width: 200,
        height: 200,
        boxShadow: theme.shadows[6],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.spacing(2),
      },
      panelHeader: {
        ...theme.typography.subtitle1,
        height: theme.height.toolbar,
        paddingLeft: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      panelShowValueContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
      },
    }),
  {
    name: 'UxtStorybookKeepMountedBasics',
  },
);

interface Item {
  id: string;
  iconSvg: string;
  content: React.ReactNode;
}

const Tab1Content = () => {
  const [value, setValue] = React.useState<number>(0);
  return (
    <Input
      style={{ width: 300 }}
      type="number"
      step="10"
      min={0}
      max={100}
      value={String(value)}
      onValueChange={(v: string) => setValue(Number(v))}
    />
  );
};

const Tab2Content = () => {
  const [value, setValue] = React.useState<number>(0);
  return (
    <Input
      style={{ width: 300 }}
      type="number"
      step="5"
      min={0}
      max={100}
      value={String(value)}
      onValueChange={(v: string) => setValue(Number(v))}
    />
  );
};

const getContent = (tabName: string): React.ReactNode => {
  return tabName === 'Tab 1' ? <Tab1Content /> : <Tab2Content />;
};

const items: Array<Item> = [
  { id: uuid(), iconSvg: star, content: getContent('Tab 1') },
  { id: uuid(), iconSvg: document, content: getContent('Tab 2') },
];

export default function KeepMountedBasics() {
  const [useKeepMounted, setUseKeepMounted] = React.useState<boolean>(false);
  const [activeItem, setActiveItem] = React.useState<any>(items[0]);
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <PushPanel className={classes.panel} isOpen={true} width={300}>
        <div className={classes.panelHeader}>Configure</div>
        <div className={classes.panelShowValueContainer}>
          <span>Use KeepMounted</span>
          <Switch isOn={useKeepMounted} onIsOnChange={setUseKeepMounted} />
        </div>
      </PushPanel>
      <div className={classes.content}>
        <div>
          <ToggleIconButtonGroup
            items={items}
            onActiveItemChange={(activeItem: any) => setActiveItem(activeItem)}
            activeItem={activeItem}
          />
          <div>
            {items.map((item: Item) => {
              const isActive =
                safeGet(undefined, 'id', item) ===
                safeGet(undefined, 'id', activeItem);
              return useKeepMounted ? (
                <KeepMounted
                  keepMounted={!isActive}
                  shouldForceUpdate={false}
                  key={item.id}
                  render={() => item.content}
                />
              ) : isActive ? (
                <div key={item.id}>{item.content}</div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
