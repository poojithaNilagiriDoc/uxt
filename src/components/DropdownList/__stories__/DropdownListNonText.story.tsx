import React from 'react';
import theme from '../../../themes/light';
import Icon from '../../Icon';
import Input from '../../Input';
import DropdownList, { Items } from '../index';

type Item = {
  onSelect?: (value: string) => void;
  selectedValue: string;
  value: string;
};

function ItemComponent(props: Item) {
  const { onSelect, selectedValue, value } = props;

  return (
    <div
      onClick={() => onSelect(value)}
      style={{
        alignItems: 'center',
        backgroundColor:
          selectedValue === value ? theme.palette.action.selected : '',
        display: 'flex',
        height: theme.height.item,
        overflow: 'hidden',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          borderBottom: `2px ${value} ${theme.palette.common.black}`,
          flex: '1 0 auto',
          flexBasis: '30%',
          height: 0,
        }}
      />
      <div
        style={{
          flex: '1 1 auto',
          flexBasis: '70%',
          marginLeft: theme.spacing(1),
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function DropdownListNonText() {
  const [value, setValue] = React.useState<string>('solid');

  const InputComponent = React.useCallback(
    function InputComponent(props): JSX.Element {
      return (
        <Input {...props}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              height: theme.height.item,
              paddingLeft: theme.spacing(2) - 4,
            }}
          >
            <div
              style={{
                borderBottom: `2px ${value} black`,
                flex: '1 1 auto',
                height: 0,
              }}
            />
            <Icon size="small" svg={props.iconSvg} />
          </div>
        </Input>
      );
    },
    [value],
  );

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <DropdownList
        inputComponent={InputComponent}
        label="Style"
        onValueChange={setValue}
        style={{ width: 150 }}
        text=" "
        value={value}
      >
        {getItems().map(item => (
          <ItemComponent
            key={item.value}
            selectedValue={value}
            value={item.value}
          />
        ))}
      </DropdownList>
    </div>
  );
}

function getItems(): Items {
  return [{ value: 'solid' }, { value: 'dashed' }, { value: 'dotted' }];
}
