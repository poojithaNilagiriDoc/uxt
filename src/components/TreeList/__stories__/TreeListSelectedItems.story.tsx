import React from 'react';
import Shell from '../../Shell';
import TreeList from '../index';
import data, { DataType } from './data';

export default function TreeListSelectedId() {
  const [selectedItems, setSelectedItems] = React.useState<Array<DataType>>([]);

  return (
    <Shell>
      <TreeList
        expandOnSelect={false}
        items={data}
        onSelectedItemsChange={items => setSelectedItems(items)}
        selectedItems={selectedItems}
        selectionMode="multiple"
        textAccessor="displayName"
      />
    </Shell>
  );
}
