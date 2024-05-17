import React from 'react';
import Shell from '../../Shell';
import PushPanel from '../index';

export default function PushPanelBasics() {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <PushPanel isOpen={true}>
        <div style={{ borderRight: '1px solid #ddd', flex: '1 1 auto' }}>
          Sidebar Content
        </div>
      </PushPanel>
      <div style={{ flex: '1 1 auto' }}>Main Content</div>
    </Shell>
  );
}
