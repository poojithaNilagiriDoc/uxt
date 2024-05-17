import React from 'react';
import DropdownList, { Comparator } from '../index';
import theme from '../../../themes/light';

interface User {
  name: string;
  value: number;
}

const users: Array<User> = [
  { name: 'Greg', value: 1 },
  { name: 'Julie', value: 2 },
  { name: 'Bill', value: 3 },
  { name: 'Antidisestablishmentarianism', value: 4 },
  { name: 'Frank', value: 5 },
  { name: 'Jim', value: 6 },
  { name: 'Craig', value: 7 },
];

const compareFn: Comparator<User> = (user1: User, user2: User) => {
  return user1.value === user2.value ? 0 : user2.value > user1.value ? 1 : -1;
};

export default function DropdownListCustomSort() {
  const [value, setValue] = React.useState<string>();

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <DropdownList
        items={users}
        onValueChange={v => setValue(v)}
        placeholder="Select person"
        textAccessor="name"
        value={value}
        valueAccessor="value"
        isSortable={true}
        sortComparator={compareFn}
      />
    </div>
  );
}
