import React from 'react';
import CallOut from '../index';
import List from '../../List';
import ListItem from '../../ListItem';
import Shell from '../../Shell';

type Item = {
  [key: string]: any;
};

type Items = Array<Item>;

const listItems: Items = [
  { text: 'Item 1', id: 1 },
  { text: 'Item 2', id: 2 },
  { text: 'Item 3', id: 4 },
  { text: 'Item 4', id: 5 },
  { text: 'Item 5 (show tooltip even on disabled element)', id: 6 },
  { text: 'Item 6', id: 7 },
  { text: 'Item 7', id: 8 },
  { text: 'Item 8', id: 9 },
];

export default function CallOutListTooltip() {
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.persist();
      if (e.key === 'Enter') {
        setIsDisabled(!isDisabled);
      }
    },
    [isDisabled],
  );

  const ItemComponent = React.useCallback(
    function ItemComponent(itemProps) {
      const { style, item, ...rest } = itemProps;

      return (
        <CallOut
          style={style}
          placement="bottom-start"
          showTooltipOnDisabledElements={item.text.toString().includes('5')}
          anchorElement={
            <ListItem
              // onKeyDown={handleKeyDown}
              onClick={() => {
                setIsDisabled(true);
              }}
              item={item}
              isDisabled={
                (item.text.toString().includes('6') ||
                  item.text.toString().includes('5')) &&
                isDisabled
              }
              {...rest}
            />
          }
        >
          {item.text}
        </CallOut>
      );
    },
    [isDisabled, handleKeyDown],
  );

  return (
    <Shell onKeyDown={handleKeyDown}>
      <List
        tabIndex={0}
        style={{ width: 400 }}
        idAccessor={'id'}
        items={listItems}
        itemComponent={ItemComponent}
        primaryTextAccessor={'text'}
      />
    </Shell>
  );
}
