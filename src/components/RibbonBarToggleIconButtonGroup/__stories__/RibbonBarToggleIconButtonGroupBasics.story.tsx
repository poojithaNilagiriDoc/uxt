import React from 'react';
import bold from 'uxt-graphics/icons/bold';
import italic from 'uxt-graphics/icons/italic';
import underline from 'uxt-graphics/icons/underline';
import Shell from '../../Shell';
import ToggleIconButtonGroup, { Item, Items } from '../index';
import theme from '../../../themes/light';

export default function RibbonBarToggleIconButtonGroupBasics() {
  const [activeItem, setActiveItem] = React.useState<Item>();
  const items: Items = [
    { iconSvg: italic, title: 'Italic' },
    { iconSvg: underline, title: 'Underline' },
    { iconSvg: bold, title: 'Bold' },
  ];

  return (
    <Shell style={{ alignItems: 'center', paddingTop: theme.spacing(3) }}>
      <ToggleIconButtonGroup
        items={items}
        onActiveItemChange={setActiveItem}
        activeItem={activeItem}
      />
    </Shell>
  );
}
