import React from 'react';
import overflow from 'uxt-graphics/icons/overflow';
import Shell from '../../Shell';
import TreeList from '../index';
import data from './data';

export default function TreeListExternalScroll() {
  return (
    <Shell style={{ overflowY: 'auto' }}>
      <TreeList
        action={[{ text: 'a', action: () => {} }]}
        actionIconSvg={overflow}
        isInternalScrollEnabled={false}
        items={data}
        textAccessor="displayName"
      />
    </Shell>
  );
}
