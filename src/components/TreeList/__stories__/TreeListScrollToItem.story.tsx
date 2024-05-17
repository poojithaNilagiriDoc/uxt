import findIndex from 'lodash/fp/findIndex';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import React from 'react';
import Button from '../../Button';
import Shell from '../../Shell';
import TreeList, { TreeListMethods } from '../index';
import data, { DataType } from './data';

export default function TreeListScrollToItem() {
  const treeListRef = React.useRef<TreeListMethods>();
  const [items, setItems] = React.useState<Array<DataType>>(() =>
    softMap(
      (item, { parent }) => ({
        ...item,
        isCollapsed: true,
        parentId: parent ? parent.id : '',
      }),
      data,
    ),
  );
  const [selectedId, setSelectedId] = React.useState<string | number>();

  const focusItem = React.useCallback(
    (id: string | number): void => {
      const idsToExpand = findIdsToExpand(id, items);

      const iteratee = item => {
        if (!includes(item.id, idsToExpand)) {
          return item;
        }

        return {
          ...item,
          isCollapsed: false,
        };
      };

      setItems(softMap(iteratee, items));
      setSelectedId(id);
    },
    [items],
  );

  React.useEffect((): void => {
    const rowIndex: number = findIndex(
      item => item.id === selectedId,
      flattenIfExpanded(items),
    );

    if (treeListRef.current)
      (treeListRef.current as TreeListMethods).scrollToRow(rowIndex);
  }, [items, selectedId]);

  return (
    <Shell style={{ flexDirection: 'row' }}>
      <TreeList
        expandOnSelect={true}
        items={items}
        onItemsChange={setItems}
        ref={treeListRef}
        selectedId={selectedId}
        style={{ borderRight: '1px solid black', flex: '1 1 50%' }}
        textAccessor="displayName"
      />
      <div style={{ flex: '1 1 50%', padding: 16 }}>
        <Button
          onClick={() => focusItem('0RZ005A')}
          text={'Scroll To "EEBC, Battery Charger"'}
        />
        <Button
          onClick={() => focusItem('0RZ09NA')}
          text={'Scroll To "MCG, Gear"'}
        />
      </div>
    </Shell>
  );
}

function findIdsToExpand(descendantId, items) {
  const reducer = (ids, item) => [...ids, item.id];
  return reduceAncestryBy(item => item.id === descendantId, reducer, [], items);
}

function findOr(defaultValue, predicate, xs, metadata = {}) {
  return reduce(
    (acc, cur) => {
      if (acc !== defaultValue) return acc;

      if (predicate(cur, metadata)) return cur;

      if (isEmpty(cur.children)) return acc;

      return findOr(acc, predicate, cur.children, { parent: cur });
    },
    defaultValue,
    xs,
  );
}

function flattenIfExpanded(xs) {
  return reduce(
    (acc, cur) => {
      const children = cur.isCollapsed ? [] : flattenIfExpanded(cur.children);

      return [...acc, cur, ...children];
    },
    [],
    xs,
  );
}

function softMap(iteratee, xs, metadata = {}) {
  return map(
    x => ({
      ...iteratee(x, metadata),
      children: softMap(iteratee, x.children, {
        parent: x,
      }),
    }),
    xs,
  );
}

function reduceAncestryBy(predicate, reducer, acc, xs) {
  const cur = findOr('notfound', predicate, xs);

  if (cur === 'notfound') return acc;

  return reduceAncestryBy(
    x => x.id === cur.parentId,
    reducer,
    reducer(acc, cur),
    xs,
  );
}
