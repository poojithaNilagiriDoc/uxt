import React from 'react';
import plateCutting from 'uxt-graphics/icons/plate-cutting';
import createStyles from '@material-ui/core/styles/createStyles';
import plant from 'uxt-graphics/icons/plant';
import Shell from '../../Shell';
import TreeList from '../index';
import type { TreeItemProps } from '../../TreeItem';
import TreeItem from '../../TreeItem';
import safeGet from '../../_helpers/safeGet';
import type { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import data, { DataType } from './data';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      nonSelectable: {
        display: 'none',
      },
    }),
  {
    name: 'UxtStorybookTreeListTwoLevelsExpanded',
  },
);

const childrenAccessor = 'children';
const idAccessor = 'id';
const selectableAccessor = 'selectable';

export default function TreeListPlantHierarchy() {
  const [items, setItems] = React.useState<Array<DataType>>(data);
  const [selectedItems, setSelectedItems] = React.useState<Array<DataType>>([]);

  // We don't want to trigger re-renders on changes to these
  const itemsChildrenMap = React.useRef<Map<string, number>>(
    new Map<string, number>(),
  );
  const selectedItemsMap = React.useRef<Map<string, number>>(
    new Map<string, number>(),
  );

  const classes = useStyles({});

  const areSomeChildrenSelected = React.useCallback((item: DataType) => {
    return false;
  }, []);

  const areAllChildrenSelected = React.useCallback((item: DataType) => {
    return false;
  }, []);

  const ItemComponent = React.useCallback(
    (props: TreeItemProps) => {
      const { depth, item, ...rest } = props;
      const isFirstTwoLevels = depth === 0 || depth === 1;
      const selectable = safeGet(true, selectableAccessor, item);

      const id = safeGet('', idAccessor, item);

      if (!itemsChildrenMap.current.has(id)) {
        itemsChildrenMap.current.set(
          id,
          (safeGet([], childrenAccessor, item) as Array<DataType>).length || 0,
        );
      }

      return (
        <TreeItem
          classes={
            !selectable || depth === 0
              ? { checkbox: classes.nonSelectable }
              : undefined
          }
          {...rest}
          item={item}
          depth={depth}
          isIndeterminate={areSomeChildrenSelected(item as DataType)}
          isSelected={
            areAllChildrenSelected(item as DataType) ||
            areSomeChildrenSelected(item as DataType)
          }
          isCollapsed={isFirstTwoLevels === false}
          iconSvgAccessor={
            depth === 0
              ? () => plant
              : depth === 1
              ? () => plateCutting
              : undefined
          }
        />
      );
    },
    [areAllChildrenSelected, areSomeChildrenSelected],
  );

  return (
    <Shell>
      <TreeList
        itemComponent={ItemComponent}
        expandOnSelect={true}
        items={items}
        defaultCollapsed={false}
        onSelectedItemsChange={items => setSelectedItems(items)}
        selectedItems={selectedItems}
        selectionMode="multiple"
        textAccessor="displayName"
        isCollapsedAccessor={'isCollapsed'}
        isSelectDeep={true}
        onItemsChange={(items: Array<DataType>) => setItems(items)}
      />
    </Shell>
  );
}
