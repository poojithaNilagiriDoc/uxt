import React from 'react';
import gear from 'uxt-graphics/icons/gear';
import help from 'uxt-graphics/icons/help';
import user from 'uxt-graphics/icons/user';
import NestedList from '../index';

export default function NestedListExternalIsCollapsed() {
  const [items, setItems] = React.useState(getInitialItems);
  const [selectedId, setSelectedId] = React.useState();

  return (
    <NestedList
      defaultCollapsed={false}
      iconSvgAccessor="iconSvg"
      isCollapsible={true}
      items={items}
      onItemsChange={items => setItems(items)}
      onSelectedIdChange={id => setSelectedId(id)}
      selectedId={selectedId}
    />
  );
}

function getInitialItems() {
  return [
    {
      iconSvg: user,
      id: 0,
      text: 'People',
      children: [
        { id: 1, text: 'Bob' },
        { id: 2, text: 'Susan' },
        { id: 3, text: 'Greg' },
      ],
    },
    {
      iconSvg: gear,
      id: 4,
      isCollapsed: true,
      text: 'Settings',
      children: [
        { id: 5, text: 'Notifications' },
        { id: 6, text: 'Theme' },
        { id: 7, text: 'About' },
      ],
    },
    {
      id: 8,
      iconSvg: help,
      text: 'Help',
      children: [],
    },
  ];
}
