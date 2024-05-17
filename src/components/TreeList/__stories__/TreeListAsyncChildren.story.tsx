import isEmpty from 'lodash/fp/isEmpty';
import React from 'react';
import treecko from 'treecko';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import TreeList from '../index';
import data, { DataType } from './data';

const dataWithIsCollapsed = treecko.softMap(
  x => ({ ...x, isCollapsed: true }),
  data,
);

export default function TreeListAsyncChildren() {
  const [items, setItems] = React.useState<Array<DataType>>(() =>
    dataWithIsCollapsed.map(attachPlaceholderChildren),
  );
  const [selectedId, setSelectedId] = React.useState<string>('');

  const loadChildrenForItem = React.useCallback(
    function loadChildrenForItem(parentItem) {
      const loadChildrenIfMatching = item => {
        if (item.id === parentItem.id) {
          const itemWithChildren = findItemById(
            parentItem.id,
            dataWithIsCollapsed,
          );

          return {
            ...item,
            children: itemWithChildren.children.map(attachPlaceholderChildren),
            isCollapsed: false,
          };
        }

        return { ...item, children: item.children.map(loadChildrenIfMatching) };
      };

      // Delaying by 400ms to imitate network call.
      setTimeout(() => {
        setItems(items.map(loadChildrenIfMatching));
      }, 400);
    },
    [items],
  );

  const handleItemIsCollapsedChange = React.useCallback(
    function handleItemIsCollapsedChange(item, ...rest) {
      action('onItemIsCollapsedChange')(item, ...rest);

      if (!isEmpty(item.children) && item.children[0].isPlaceholderItem) {
        loadChildrenForItem(item);
      }
    },
    [loadChildrenForItem],
  );

  return (
    <Shell>
      <TreeList
        idAccessor="id"
        items={items}
        onItemIsCollapsedChange={handleItemIsCollapsedChange}
        onItemsChange={setItems}
        onSelectedIdChange={(id: string | number) => setSelectedId(String(id))}
        selectedId={selectedId}
        selectionMode="single"
        textAccessor="displayName"
      />
    </Shell>
  );
}

function attachPlaceholderChildren(item) {
  const children = isEmpty(item.children)
    ? []
    : [
        {
          id: -1,
          isCollapsed: true,
          isPlaceholderItem: true,
          displayName: 'Loading children...',
          children: [],
        },
      ];

  return { ...item, children };
}

function findItemById(id, items) {
  return items.reduce((result, item) => {
    if (result !== undefined) return result;

    if (item.id === id) return item;

    if (isEmpty(item.children)) return result;

    return findItemById(id, item.children);
  }, undefined);
}
