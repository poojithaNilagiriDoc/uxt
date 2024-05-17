import React from 'react';
import { action } from '@storybook/addon-actions';
import wrench from 'uxt-graphics/icons/wrench';
import NestedListItem from '../index';

const item = {
  children: [
    { text: 'Greg' },
    { text: 'Jim' },
    { text: 'Susan' },
    { text: 'Dajuan' },
  ],
  iconSvg: wrench,
  text: 'People',
};

export default function NestedListItemBasics() {
  return (
    <NestedListItem
      childrenAccessor="children"
      iconSvgAccessor="iconSvg"
      isCollapsed={false}
      isCollapsible={true}
      item={item}
      onIsCollapsedChange={action('onIsCollapsedChange')}
      onSelectedItemChange={action('onSelectedItemChange')}
    />
  );
}
