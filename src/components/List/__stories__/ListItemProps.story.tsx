import add from 'lodash/fp/add';
import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import range from 'lodash/fp/range';
import React from 'react';
import ListItem from '../../ListItem';
import Shell from '../../Shell';
import List from '../index';

const getItem = id => ({
  title: `Item ${id}`,
  description: `An item with the id ${id}`,
  id,
});
const getItems = compose(map(compose(getItem, add(1))), range(0));

export default function ListItemProps() {
  const handleDoubleClick = React.useCallback(function handleDoubleClick(item) {
    console.log(item);
  }, []);

  const handleDragEnd = React.useCallback(function handleDragEnd(item, e) {
    console.log('handleDragEnd', e);
  }, []);

  const handleDragStart = React.useCallback(function handleDragStart(item) {
    console.log('handleDragStart', item);
  }, []);

  const ItemComponent = React.useCallback(
    function ItemComponent(itemProps) {
      return (
        <ListItem
          {...itemProps}
          draggable={true}
          onDoubleClick={e => handleDoubleClick(itemProps.item, e)}
          onDragEnd={e => handleDragEnd(itemProps.item, e)}
          onDragStart={() => handleDragStart(itemProps.item)}
          tabIndex={0}
        />
      );
    },
    [handleDragEnd, handleDragStart, handleDoubleClick],
  );

  return (
    <Shell>
      <List
        itemComponent={ItemComponent}
        items={getItems(100)}
        primaryTextAccessor="title"
      />
    </Shell>
  );
}
