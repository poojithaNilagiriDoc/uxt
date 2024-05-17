import React from 'react';
import bold from 'uxt-graphics/icons/bold';
import italic from 'uxt-graphics/icons/italic';
import underline from 'uxt-graphics/icons/underline';
import Shell from '../../Shell';
import ToggleIconButtonGroup, { Item, Items } from '../index';
import Orientation from '../../constants/orientation';
import theme from '../../../themes/light';

export default function ToggleIconButtonGroupOrientation() {
  const [activeItem, setActiveItem] = React.useState<Item>();
  const items: Items = [
    { iconSvg: italic },
    { iconSvg: underline },
    { iconSvg: bold },
  ];

  return (
    <Shell style={{ alignItems: 'center', paddingTop: theme.spacing(3) }}>
      <ToggleIconButtonGroup
        onActiveItemChange={setActiveItem}
        activeItem={activeItem}
        items={items}
        orientation={Orientation.Vertical}
      />
    </Shell>
  );
}
