import React from 'react';
import tags from '../../../../sample-data/tags';
import Shell from '../../Shell';
import List from '../index';

export default function ListSelectedId() {
  const [selectedId, setSelectedId] = React.useState<string | number>();

  return (
    <Shell>
      <List
        items={tags}
        onSelectedIdChange={id => setSelectedId(id)}
        primaryTextAccessor="name"
        secondaryTextAccessor="description"
        selectedId={selectedId}
      />
    </Shell>
  );
}
