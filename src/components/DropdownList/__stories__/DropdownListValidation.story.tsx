import React from 'react';
import DropdownChoice, { DropdownChoiceProps } from '../../DropdownChoice';
import DropdownList from '../index';
import theme from '../../../themes/light';

const items = [
  { value: 1, text: 'Valid' },
  { value: 2, text: 'Invalid' },
];

export default function DropdownListValidation() {
  const [value, setValue] = React.useState<number>();
  const isInvalid: boolean = React.useMemo(() => value === 2, [value]);

  return (
    <div style={{ margin: theme.spacing(2) }}>
      <DropdownList
        helperText="Helper Text"
        isInvalid={isInvalid}
        label="My Value"
        onValueChange={setValue}
        value={value}
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
