import React from 'react';
import Shell from '../../Shell';
import TreeList from '../index';
import data from './data';

export default function TreeListSelectedId() {
  const [selectedIds, setSelectedIds] =
    React.useState<Array<string | number>>();

  return (
    <Shell>
      <TreeList
        expandOnSelect={false}
        items={data}
        onSelectedIdsChange={ids => setSelectedIds(ids)}
        selectedIds={selectedIds}
        selectionMode="multiple"
        textAccessor="displayName"
      />
    </Shell>
  );
}
