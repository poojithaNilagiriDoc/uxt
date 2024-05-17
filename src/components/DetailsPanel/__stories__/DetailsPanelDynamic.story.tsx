import React from 'react';
import Shell from '../../Shell';
import DetailsPanel from '../index';

export default function DetailsPanelDynamic(props) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Shell style={{ flexDirection: 'row' }}>
      <div onClick={() => setIsOpen(true)} style={{ flex: '1 1 0' }} />
      <DetailsPanel isOpen={isOpen} onIsOpenChange={() => setIsOpen(false)}>
        Some Content
      </DetailsPanel>
    </Shell>
  );
}
