import findIndex from 'lodash/fp/findIndex';
import React from 'react';
import Button from '../../Button';
import List, { ListMethods } from '../index';
import tags from '../../../../sample-data/tags';

export default function ListScrollToRow() {
  const listRef = React.useRef<ListMethods>(null);
  const [selectedId, setSelectedId] = React.useState<string | number>('');

  const focusItem = React.useCallback(function focusItem(name) {
    const index = findIndex(tag => tag.name === name, tags);

    if (index < 0) return;

    setSelectedId(tags[index].id);

    listRef.current?.scrollToRow?.(index);
  }, []);

  return (
    <div
      style={{
        bottom: 0,
        display: 'flex',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      }}
    >
      <List
        items={tags}
        onSelectedIdChange={id => setSelectedId(id)}
        primaryTextAccessor="name"
        ref={listRef}
        secondaryTextAccessor="description"
        selectedId={selectedId}
      />
      <div style={{ padding: 16, width: 256 }}>
        <Button
          onClick={() => focusItem('NEQ-1048')}
          style={{ marginBottom: 16 }}
          text="NEQ-1048"
        />
        <Button
          onClick={() => focusItem('VER-5009')}
          style={{ marginBottom: 16 }}
          text="VER-5009"
        />
        <Button onClick={() => focusItem('REI-5965')} text="REI-5965" />
      </div>
    </div>
  );
}
