import startsWith from 'lodash/fp/startsWith';
import React from 'react';
import DropdownList, { Items } from '../index';
import theme from '../../../themes/light';
import DropdownChoice, { DropdownChoiceProps } from '../../DropdownChoice';
import toLowerCase from '../../_helpers/toLowerCase';

const items: Items = [
  { value: 'Apple', text: 'Apple' },
  { value: 'Argon', text: 'Argon' },
  { value: 'Banana', text: 'Banana' },
  { value: 'Cherry', text: 'Cherry' },
  { value: 'Durian', text: 'Durian' },
  { value: 'EggFruit', text: 'EggFruit' },
  { value: 'Fig', text: 'Fig' },
  { value: 'Grape', text: 'Grape' },
  { value: 'Honeydew', text: 'Honeydew' },
];

export default function DropdownListEditableWithFilteredItems() {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  const getFilteredItems = React.useCallback(function getFilteredItems(
    item: any,
    inputValue: string,
  ): boolean {
    return startsWith(toLowerCase(inputValue), toLowerCase(item.text));
  },
  []);

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <DropdownList
        enableFirstLetterSelection={false}
        label="Fruit"
        onValueChange={setValue}
        style={{ width: 150 }}
        value={value}
        text={value}
        textAccessor="value"
        valueAccessor="value"
        filter={getFilteredItems}
      >
        {items.map((item: DropdownChoiceProps) => (
          <DropdownChoice
            key={item.value}
            text={item.text}
            value={item.value}
          />
        ))}
      </DropdownList>
    </div>
  );
}
