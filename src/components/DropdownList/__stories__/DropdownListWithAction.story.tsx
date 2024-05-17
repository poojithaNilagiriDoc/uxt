import React from 'react';
import DropdownChoice, { DropdownChoiceProps } from '../../DropdownChoice';
import DropdownList, { Items } from '../index';

export default function DropdownListWithAction() {
  const [value, setValue] = React.useState<string>();

  return (
    <div style={{ padding: 16 }}>
      <DropdownList
        label="My Value"
        onValueChange={setValue}
        value={value}
        onActionClick={() => console.log('Clicked on action!')}
        actionText="view all"
      >
        {getItems().map((item: DropdownChoiceProps) => (
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

function getItems(): Items {
  return [
    { value: 1, text: 'Greg' },
    { value: 2, text: 'Julie' },
    { value: 3, text: 'Bill' },
    { value: 4, text: 'Antidisestablishmentarianism' },
    { value: 5, text: 'Frank' },
    { value: 6, text: 'Jim' },
    { value: 7, text: 'Craig' },
  ];
}
