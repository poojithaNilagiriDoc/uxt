import React from 'react';
import bold from 'uxt-graphics/icons/bold';
import italic from 'uxt-graphics/icons/italic';
import underline from 'uxt-graphics/icons/underline';
import Shell from '../../Shell';
import ToggleIconButtonGroup, { Items } from '../index';
import SelectionMode from '../../constants/selectionMode';
import Orientation from '../../constants/orientation';
import theme from '../../../themes/light';

export default function ToggleIconButtonGroupMultipleSelection() {
  const [activeItems, setActiveItems] = React.useState<Items>([]);
  const items: Items = [
    { iconSvg: italic },
    { iconSvg: underline },
    { iconSvg: bold },
  ];

  return (
    <Shell style={{ alignItems: 'center', paddingTop: theme.spacing(3) }}>
      <ToggleIconButtonGroup
        selectionMode={SelectionMode.Multiple}
        onActiveItemsChange={setActiveItems}
        activeItems={activeItems}
        items={items}
        orientation={Orientation.Horizontal}
      />
    </Shell>
  );
}
