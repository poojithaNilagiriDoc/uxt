import compose from 'lodash/fp/compose';
import every from 'lodash/fp/every';
import filter from 'lodash/fp/filter';
import find from 'lodash/fp/find';
import _flatten from 'lodash/fp/flatten';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import map from 'lodash/fp/map';
import some from 'lodash/fp/some';
import uniq from 'lodash/fp/uniq';
import React from 'react';
import treecko from 'treecko';
import Shell from '../../Shell';
import TreeItem from '../../TreeItem';
import TreeList from '../index';
import data from './data';

export default function TreeListPartialSelection() {
  const [items, setItems] = React.useState(function getInitialItems() {
    return treecko.softMap(x => ({ ...x, isCollapsed: true }), data);
  });
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [selectedIdsWithAncestors, setSelectedIdsWithAncestors] =
    React.useState([]);

  const handleSelectedIdsChange = React.useCallback(
    function handleSelectedIdsChange(ids) {
      const selectedLeafIds = toPartialSelection(ids, items);

      setSelectedIds(selectedLeafIds);
      setSelectedIdsWithAncestors(fromPartialSelection(selectedLeafIds, items));
    },
    [items],
  );

  const ItemComponent = React.useCallback(
    function ItemComponent(props) {
      const hasSelectedId = i => includes(i.id, selectedIdsWithAncestors);
      const descendants = flatten(props.item, []);
      const areAllDescendantsSelected =
        !isEmpty(descendants) && every(hasSelectedId, descendants);
      const areSomeButNotAllDescendantsSelected =
        some(hasSelectedId, descendants) && !areAllDescendantsSelected;

      return (
        <TreeItem
          {...props}
          isIndeterminate={areSomeButNotAllDescendantsSelected}
          isSelected={
            props.isSelected ||
            areSomeButNotAllDescendantsSelected ||
            areAllDescendantsSelected
          }
        />
      );
    },
    [selectedIdsWithAncestors],
  );

  React.useEffect(() => {
    console.log('Actual Selected Ids', selectedIds);
  }, [selectedIds]);

  return (
    <Shell>
      <TreeList
        isSelectDeep={true}
        itemComponent={ItemComponent}
        items={items}
        onItemsChange={setItems}
        onSelectedIdsChange={handleSelectedIdsChange}
        selectedIds={selectedIdsWithAncestors}
        selectionMode="multiple"
        textAccessor="displayName"
      />
    </Shell>
  );
}

function getAncestorsArray(item, accumulatedAncestors, flatItems) {
  const parent = getParent(item, flatItems);

  if (!parent) return accumulatedAncestors;

  return getAncestorsArray(
    parent,
    [...accumulatedAncestors, parent],
    flatItems,
  );
}

function fromPartialSelection(allSelectedIds, rootItems) {
  const flatItems = flatten({ children: rootItems }, []);

  return compose(
    uniq,
    map(item => item.id),
    _flatten,
    map(item => [item, ...getAncestorsArray(item, [], flatItems)]),
    map(selectedId => find(i => i.id === selectedId, flatItems)),
  )(allSelectedIds);
}

function toPartialSelection(allSelectedIds, rootItems) {
  const getItemById = id =>
    find(x => x.id === id, flatten({ children: rootItems }, []));
  const getIsLeafNode = x => isEmpty(x.children);

  return compose(
    map(x => x.id),
    filter(getIsLeafNode),
    map(getItemById),
  )(allSelectedIds);
}

function getParent(item, flatItems) {
  const hasItemInChildren = x =>
    includes(
      item.id,
      x.children.map(c => c.id),
    );

  return find(hasItemInChildren, flatItems);
}

function flatten(item, accumulatedItems = []) {
  const flatChildren = !isEmpty(item.children)
    ? item.children.reduce((acc, cur) => flatten(cur, acc), [])
    : [];

  return accumulatedItems.concat([item]).concat(flatChildren);
}
