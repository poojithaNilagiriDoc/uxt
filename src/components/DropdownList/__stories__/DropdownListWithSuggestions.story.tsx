import React from 'react';
import DropdownList, { Items } from '../index';

const items: Items = [
  { text: 'Apple', value: 1 },
  { text: 'Banana', value: 2 },
  { text: 'Cherry', value: 3 },
  { text: 'Durian', value: 4 },
  { text: 'EggFruit', value: 5 },
  { text: 'Fig', value: 6 },
  { text: 'Grape', value: 7 },
  { text: 'Honeydew', value: 8 },
];

export default function DropdownListWithSuggestions() {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  return (
    <div style={{ padding: 16 }}>
      <DropdownList
        isSearchable={true}
        items={items}
        label="Fruit"
        onValueChange={v => setValue(v)}
        style={{ width: 150 }}
        textAccessor="text"
        value={value}
        valueAccessor="value"
        isPopupFittedToInput={false}
      />
    </div>
  );
}
