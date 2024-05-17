import React from 'react';
import List from '../../List';
import Shell from '../../Shell';
import Sidebar from '../index';

const items = [
  {
    id: 'a',
  },
  {
    id: 'b',
  },
  {
    id: 'c',
  },
];

export default function SidebarList() {
  const [selectedId, setSelectedId] = React.useState<string>('b');
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <Sidebar isOpen={true}>
        <List
          items={items}
          onSelectedIdChange={id => setSelectedId(id.toString())}
          selectedId={selectedId}
          primaryTextAccessor="id"
        />
      </Sidebar>
    </Shell>
  );
}
