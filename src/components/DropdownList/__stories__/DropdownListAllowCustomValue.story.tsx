import React from 'react';
import DropdownList from '../index';
import theme from '../../../themes/light';

export default function DropdownListEditable() {
  const [text, setText] = React.useState<string>('');
  const [value, setValue] = React.useState<number>(4);

  const handleValueChange = React.useCallback(function handleValueChange(
    v: number,
  ): void {
    setValue(v);

    v ? setText(`${v}px`) : setText(undefined);
  },
  []);

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <DropdownList
        allowCustomValue={true}
        items={[
          { text: '8px', value: 8 },
          { text: '9px', value: 9 },
          { text: '10px', value: 10 },
          { text: '12px', value: 12 },
          { text: '14px', value: 14 },
          { text: '16px', value: 16 },
          { text: '20px', value: 20 },
        ]}
        label="Font Size"
        onValueChange={handleValueChange}
        style={{ width: 150 }}
        text={text}
        textAccessor="text"
        value={value}
        valueAccessor="value"
      />
    </div>
  );
}
