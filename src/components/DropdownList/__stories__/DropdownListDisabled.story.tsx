import React from 'react';
import DropdownChoice, { DropdownChoiceProps } from '../../DropdownChoice';
import DropdownList, { Items } from '../index';
import theme from '../../../themes/light';

export default function DropdownListBasics() {
  const [value, setValue] = React.useState<string>();

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <DropdownList
        isDisabled={true}
        label="My Value"
        onValueChange={setValue}
        value={value}
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
