import React from 'react';
import NestedList from '../../NestedList';
import Shell from '../../Shell';
import Sidebar from '../index';

const items = [
  {
    id: 'a',
    children: [{ id: 'aa' }, { id: 'ab' }, { id: 'ac' }],
  },
  {
    id: 'b',
    children: [{ id: 'ba' }, { id: 'bb' }, { id: 'bc' }],
  },
  {
    id: 'c',
  },
];

export default function SidebarNestedList() {
  const [selectedId, setSelectedId] = React.useState('bb');
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <Sidebar isOpen={true}>
        <NestedList
          items={items}
          onSelectedIdChange={id => setSelectedId(id)}
          selectedId={selectedId}
          textAccessor="id"
        />
      </Sidebar>
    </Shell>
  );
}
