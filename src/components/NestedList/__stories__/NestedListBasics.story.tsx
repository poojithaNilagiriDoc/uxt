import React from 'react';
import gear from 'uxt-graphics/icons/gear';
import help from 'uxt-graphics/icons/help';
import user from 'uxt-graphics/icons/user';
import NestedList from '../index';

const items = [
  {
    iconSvg: user,
    text: 'People',
    children: [{ text: 'Bob' }, { text: 'Susan' }, { text: 'Greg' }],
  },
  {
    iconSvg: gear,
    text: 'Settings',
    children: [{ text: 'Notifications' }, { text: 'Theme' }, { text: 'About' }],
  },
  {
    iconSvg: help,
    text: 'Help',
    children: [],
  },
];

export default function NestedListBasics() {
  const [selectedItem, setSelectedItem] = React.useState();

  return (
    <NestedList
      defaultCollapsed={true}
      iconSvgAccessor="iconSvg"
      isCollapsible={true}
      items={items}
      onSelectedItemChange={item => setSelectedItem(item)}
      selectedItem={selectedItem}
    />
  );
}
