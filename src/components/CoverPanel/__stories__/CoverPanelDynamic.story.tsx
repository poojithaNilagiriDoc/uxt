import React from 'react';
import useCounter from 'react-use/lib/useCounter';
import useToggle from 'react-use/lib/useToggle';
import Shell from '../../Shell';
import CoverPanel from '../index';

export default function CoverPanelDynamic() {
  const [isOpen, toggleIsOpen] = useToggle(true);
  const [width, { set: setWidth }] = useCounter(256);

  return (
    <Shell style={{ flexDirection: 'row' }}>
      <CoverPanel
        isOpen={isOpen}
        minWidth={56}
        onWidthChange={setWidth}
        width={width}
      >
        <div style={{ flex: '1 1 auto' }}>Sidebar Content</div>
      </CoverPanel>
      <div style={{ flex: '1 1 auto' }} onClick={toggleIsOpen}>
        Main Content
      </div>
    </Shell>
  );
}
