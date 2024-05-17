import React from 'react';
import CallOut from '../index';
import TreeList from '../../TreeList';
import TreeItem from '../../TreeItem';
import Shell from '../../Shell';
import data, { DataType } from '../../TreeList/__stories__/data';
import type { UxtTheme } from '../../../themes/UxtTheme';
import useTheme from '../../_helpers/useTheme';

type Item = {
  [key: string]: any;
};

type Items = Array<Item>;

const listItems: Items = [
  { text: 'Item 1', id: 1 },
  { text: 'Item 2', id: 2 },
  { text: 'Item 3', id: 4 },
  { text: 'Item 4', id: 5 },
  { text: 'Item 5', id: 6 },
  { text: 'Item 6', id: 7 },
  { text: 'Item 7', id: 8 },
  { text: 'Item 8', id: 9 },
];

export default function CallOutTreeListTooltip() {
  const [selectedItem, setSelectedItem] = React.useState<DataType>();
  const theme = useTheme() as UxtTheme;

  const ItemComponent = React.useCallback(function ItemComponent(itemProps) {
    const { style, item, key, ...rest } = itemProps;
    const { position, left, top, bottom, right, ...restStyle } = style;

    return (
      <CallOut
        key={key}
        style={{ position, top, left, right, bottom }}
        placement="bottom"
        PopperProps={{
          modifiers: {
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          },
        }}
        anchorElement={
          <TreeItem item={item} style={{ ...restStyle }} {...rest} />
        }
      >
        <div>Hello {item.displayName}</div>
      </CallOut>
    );
  }, []);

  return (
    <Shell>
      <TreeList
        style={{ width: 400 }}
        expandOnSelect={false}
        items={data}
        onSelectedItemChange={item => setSelectedItem(item)}
        selectedItem={selectedItem}
        selectionMode="single"
        textAccessor="displayName"
        itemComponent={ItemComponent}
      />
    </Shell>
  );
}
