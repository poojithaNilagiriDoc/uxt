import React from 'react';
import DropdownList from '../index';
import theme from '../../../themes/light';

export default function DropdownListItemDisable() {
  const [value, setValue] = React.useState<string>();

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <DropdownList
        items={[
          { text: 'Greg', value: 1, disabled: false },
          { text: 'Julie', value: 2, disabled: true },
          { text: 'Bill', value: 3, disabled: true },
          { text: 'Antidisestablishmentarianism', value: 4, disabled: false },
          { text: 'Frank', value: 5, disabled: true },
          { text: 'Jim', value: 6, disabled: true },
          { text: 'Craig', value: 7, disabled: false },
        ]}
        onValueChange={setValue}
        placeholder="Select person"
        textAccessor="text"
        value={value}
        valueAccessor="value"
        itemDisabledAccessor="disabled"
      />
    </div>
  );
}
