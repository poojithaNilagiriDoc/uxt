import React from 'react';
import Shell from '../../Shell';
import TreeList from '../index';
import data, { DataType } from './data';

export default function TreeListSelectedItem() {
  const [selectedItem, setSelectedItem] = React.useState<DataType>();

  return (
    <Shell>
      <TreeList
        expandOnSelect={false}
        items={data}
        onSelectedItemChange={item => setSelectedItem(item)}
        selectedItem={selectedItem}
        selectionMode="single"
        textAccessor="displayName"
      />
    </Shell>
  );
}
