import React from 'react';
import NestedListChildItem from '../index';

const item = { id: 'a', text: 'A' };

export default function NestedListChildItemSelectedItem() {
  return (
    <NestedListChildItem item={item} selectedItem={item} textAccessor="text" />
  );
}
