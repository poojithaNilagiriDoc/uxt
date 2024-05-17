import React from 'react';
import tags from '../../../../sample-data/tags';
import Shell from '../../Shell';
import List from '../index';

export default function ListSelectedItems() {
  const [selectedItems, setSelectedItems] = React.useState<Array<any>>([]);

  return (
    <Shell>
      <List
        items={tags}
        onSelectedItemChange={item => setSelectedItems([item])}
        onSelectedItemsChange={items => setSelectedItems(items)}
        primaryTextAccessor="name"
        secondaryTextAccessor="description"
        selectedItems={selectedItems}
        selectionMode="mixed"
      />
    </Shell>
  );
}
