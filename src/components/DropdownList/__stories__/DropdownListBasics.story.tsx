import React from 'react';
import DropdownChoice, { DropdownChoiceProps } from '../../DropdownChoice';
import DropdownList, { Items } from '../index';
import theme from '../../../themes/light';

export default function DropdownListBasics() {
  const [value, setValue] = React.useState<string>();

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <DropdownList
        label="My Value"
        onValueChange={setValue}
        value={value}
        enableInfiniteLoading={true}
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
    { value: 3, text: 'Grant' },
    { value: 4, text: 'Bill' },
    { value: 5, text: 'Antidisestablishmentarianism' },
    { value: 6, text: 'Frank' },
    { value: 7, text: 'Brown' },
    { value: 8, text: 'Jim' },
    { value: 9, text: 'Craig' },
  ];
}
