import React from 'react';
import bold from 'uxt-graphics/icons/bold';
import italic from 'uxt-graphics/icons/italic';
import underline from 'uxt-graphics/icons/underline';
import Shell from '../../Shell';
import SelectionMode from '../../constants/selectionMode';
import theme from '../../../themes/light';
import RibbonBarToggleIconButtonGroup, {
  Items,
} from '../../RibbonBarToggleIconButtonGroup';

export default function RibbonBarToggleIconButtonGroupMultipleSelection() {
  const [activeItems, setActiveItems] = React.useState<Items>([]);
  const items: Items = [
    { iconSvg: italic, title: 'Italic' },
    { iconSvg: underline, title: 'Underline' },
    { iconSvg: bold, title: 'Bold' },
  ];

  return (
    <Shell style={{ alignItems: 'center', paddingTop: theme.spacing(3) }}>
      <RibbonBarToggleIconButtonGroup
        selectionMode={SelectionMode.Multiple}
        onActiveItemsChange={setActiveItems}
        activeItems={activeItems}
        items={items}
      />
    </Shell>
  );
}
