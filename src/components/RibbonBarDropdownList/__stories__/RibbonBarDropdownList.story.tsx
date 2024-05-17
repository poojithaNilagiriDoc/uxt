import React from 'react';
import DropdownChoice, { DropdownChoiceProps } from '../../DropdownChoice';
import RibbonBarDropdownList, { Items } from '../index';

interface RibbonBarDropdownListChoiceProps extends DropdownChoiceProps {
  fontFamily: React.CSSProperties['fontFamily'];
}

export default function RibbonBarButtonBasics() {
  const [value, setValue] = React.useState<string>();

  return (
    <div style={{ padding: 16 }}>
      <RibbonBarDropdownList
        placeholder="Font"
        onValueChange={setValue}
        value={value}
        showFilterItems={true}
        separateAccessor={'isSeparator'}
      >
        {getItems().map((item: RibbonBarDropdownListChoiceProps) => (
          <DropdownChoice
            key={item.value}
            text={item.text}
            value={item.value}
            style={{ fontFamily: item.fontFamily }}
            isSeparator={item.isSeparator}
          />
        ))}
      </RibbonBarDropdownList>
    </div>
  );
}

function getItems(): Items {
  return [
    {
      value: 12,
      text: 'Stencil Std',
      fontFamily: 'Stencil Std',
    },
    {
      value: 11,
      text: 'Bradley Hand',
      fontFamily: 'Bradley Hand',
      disabled: true,
    },
    { value: 10, text: 'Recently Used', isSeparator: true },
    { value: 2, text: 'Verdana', fontFamily: 'Verdana' },
    { value: 3, text: 'Garamond', fontFamily: 'Garamond' },
    { value: 4, text: 'Tahoma', fontFamily: 'Tahoma' },
    {
      value: 5,
      text: 'Courier New',
      fontFamily: 'Courier New ',
    },
    { value: 6, text: 'cursive', fontFamily: 'cursive' },
    { value: 7, text: 'system-ui', fontFamily: 'system-ui' },
    {
      value: 8,
      text: 'Times New Roman',
      fontFamily: 'Times New Roman',
    },
    { value: 9, text: 'Brush Script MT', fontFamily: 'Brush Script MT' },
  ];
}
