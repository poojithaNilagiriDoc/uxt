import React from 'react';
import ContentSwitcher from '../index';

export default function ContentSwitcherBasics() {
  return (
    <ContentSwitcher
      contentKey={'b'}
      contentMap={{
        a: <>一</>,
        b: <>二</>,
        c: <>三</>,
      }}
      fallbackContent={<div>Nothing here...</div>}
      useDisplayNone={false}
    />
  );
}
