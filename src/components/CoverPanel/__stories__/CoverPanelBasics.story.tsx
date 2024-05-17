import React from 'react';
import Shell from '../../Shell';
import CoverPanel from '../index';

export default function CoverPanelBasics() {
  return (
    <Shell style={{ flexDirection: 'row' }}>
      <CoverPanel isOpen={true}>
        <div style={{ flex: '1 1 auto' }}>Sidebar Content</div>
      </CoverPanel>
      <div style={{ flex: '1 1 auto' }}>Main Content</div>
    </Shell>
  );
}
