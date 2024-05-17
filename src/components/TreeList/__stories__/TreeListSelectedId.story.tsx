import React from 'react';
import Shell from '../../Shell';
import TreeList from '../index';
import data from './data';

export default function TreeListSelectedId() {
  const [selectedId, setSelectedId] = React.useState<string | number>();

  return (
    <Shell>
      <TreeList
        expandOnSelect={false}
        items={data}
        onSelectedIdChange={id => setSelectedId(id)}
        selectedId={selectedId}
        selectionMode="single"
        textAccessor="displayName"
      />
    </Shell>
  );
}
