import React from 'react';
import italic from 'uxt-graphics/icons/italic';
import underline from 'uxt-graphics/icons/underline';
import bold from 'uxt-graphics/icons/bold';
import Shell from '../../Shell';
import ToggleIconButtonGroup, { Item, Items } from '../index';
import theme from '../../../themes/light';

export default function ToggleIconButtonGroupDisable() {
  const [activeItem, setActiveItem] = React.useState<Item>();
  const items: Items = [
    { iconSvg: italic, disabled: false },
    { iconSvg: underline, disabled: true },
    { iconSvg: bold, disabled: false },
  ];

  return (
    <Shell style={{ alignItems: 'center', paddingTop: theme.spacing(3) }}>
      <ToggleIconButtonGroup
        items={items}
        iconSvgAccessor="iconSvg"
        onActiveItemChange={setActiveItem}
        activeItem={activeItem}
      />
    </Shell>
  );
}
