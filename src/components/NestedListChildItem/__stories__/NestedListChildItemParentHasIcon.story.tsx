import React from 'react';
import NestedListChildItem from '../index';

export default function NestedListChildItemParentHasIcon() {
  return (
    <NestedListChildItem
      item={{ text: 'A' }}
      parentHasIcon={true}
      textAccessor="text"
    />
  );
}
