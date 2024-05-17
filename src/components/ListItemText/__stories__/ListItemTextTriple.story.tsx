import React from 'react';
import ListItemText from '../index';

export default function ListItemTextTriple() {
  return (
    <ListItemText
      item={{ a: 'A', b: 'B', c: 'C' }}
      primaryTextAccessor="a"
      secondaryTextAccessor="b"
      tertiaryTextAccessor="c"
    />
  );
}
