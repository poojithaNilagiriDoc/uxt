import React from 'react';
import overflow from 'uxt-graphics/icons/overflow';
import search from 'uxt-graphics/icons/search';
import createStyles from '@material-ui/core/styles/createStyles';
import { action } from '@storybook/addon-actions';
import TreeList from '../index';
import makeStyles from '../../_helpers/makeStyles';
import Shell from '../../Shell';
import PushPanel from '../../PushPanel';
import Input from '../../Input';
import type { UxtTheme } from '../../../themes/UxtTheme';
import showIf from '../../_helpers/showIf';
import data, { DataType } from './data';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      treeList: {
        width: 400,
      },
      textAccessorComponentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing(1)}px`,
      },
      pushPanel: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        height: '100%',
      },
      searchContainer: {
        padding: theme.spacing(2),
      },
    }),
  {
    name: 'UxtStorybookTreeListSearch',
  },
);

export default function TreeListSearch() {
  const classes = useStyles({});
  const [selectedItems, setSelectedItems] = React.useState<Array<DataType>>([]);
  const [filteredItems, setFilteredItems] =
    React.useState<Array<DataType>>(data);
  const [searchText, setSearchText] = React.useState<string>();
  const itemIsCollapsedMapRef = React.useRef<Map<DataType, boolean>>(
    new Map<DataType, boolean>(),
  );

  const textAccessorComponent = React.useCallback(
    (item: DataType): React.ReactNode => {
      return (
        <div className={classes.textAccessorComponentContainer}>
          {showIf(item?.displayName?.indexOf('Types') !== -1)(
            <div>{item.id}</div>,
          )}
          <div>{item.displayName}</div>
        </div>
      );
    },
    [],
  );

  const handleSearchClick = React.useCallback((): void => {
    const getFilteredItems = (items: Array<DataType>, value: string) => {
      let result: Array<DataType> = [];

      items?.forEach((item: DataType) => {
        let _result: Array<DataType> = [];
        let children: Array<DataType> = [];

        if (item?.children && item?.children.length > 0) {
          children = getFilteredItems(item.children, value);
        }

        const originalItem: DataType = [
          ...itemIsCollapsedMapRef.current?.keys(),
        ]?.find((mappedItem: DataType) => mappedItem.id === item.id);

        if (children?.length > 0) {
          _result.push({
            ...originalItem,
            children: children,
            isCollapsed: itemIsCollapsedMapRef.current.get(originalItem),
          });
        }

        if (
          children &&
          children.length === 0 &&
          item?.displayName?.indexOf(value) !== -1
        ) {
          _result?.push({
            ...item,
            isCollapsed: true,
          });
        }

        result = [...result, ..._result];
      });
      return result;
    };
    const _filteredItems: Array<DataType> =
      searchText === undefined || searchText === '' || searchText === null
        ? data
        : getFilteredItems(data, searchText);

    setFilteredItems(_filteredItems);
  }, [searchText]);

  const handleItemIsCollapsedChange = React.useCallback(
    (item: DataType, isCollapsed: boolean): void => {
      itemIsCollapsedMapRef.current.set(item, isCollapsed);
    },
    [],
  );

  return (
    <Shell>
      <PushPanel className={classes.pushPanel} width={400} isOpen={true}>
        <div className={classes.searchContainer}>
          <Input
            value={searchText}
            onValueChange={setSearchText}
            iconSvg={search}
            iconProps={{ onClick: handleSearchClick }}
          />
        </div>
        <TreeList
          className={classes.treeList}
          action={[
            {
              text: 'Option A',
              action: (item: DataType) => {
                action(`Clicked Option A and item is ${item}`);
              },
            },
            {
              text: 'Option B',
              action: (item: DataType) => {
                action(`Clicked Option B and item is ${item}`);
              },
            },
          ]}
          actionIconSvg={overflow}
          expandOnSelect={false}
          idAccessor="id"
          isSelectDeep={false}
          items={filteredItems}
          selectedItems={selectedItems}
          onSelectedItemsChange={(items: Array<DataType>) =>
            setSelectedItems(items)
          }
          selectionMode="multiple"
          textAccessor={textAccessorComponent}
          rowHeight={56}
          onItemsChange={setFilteredItems}
          onItemIsCollapsedChange={handleItemIsCollapsedChange}
        />
      </PushPanel>
    </Shell>
  );
}
