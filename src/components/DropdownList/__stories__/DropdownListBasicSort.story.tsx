import React from 'react';
import DropdownList from '../index';
import theme from '../../../themes/light';

export default function DropdownListBasicSort() {
  const [value, setValue] = React.useState<string>();

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <DropdownList
        items={[
          { text: 'Greg', value: 1 },
          { text: 'Julie', value: 2 },
          { text: 'Bill', value: 3 },
          { text: 'Antidisestablishmentarianism', value: 4 },
          { text: 'Frank', value: 5 },
          { text: 'Jim', value: 6 },
          { text: 'Craig', value: 7 },
        ]}
        onValueChange={v => setValue(v)}
        placeholder="Select person"
        textAccessor="text"
        value={value}
        valueAccessor="value"
        isSortable={true}
        sortDirection="desc"
      />
    </div>
  );
}
