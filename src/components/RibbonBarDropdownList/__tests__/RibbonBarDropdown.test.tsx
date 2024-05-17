import React from 'react';
import { mount } from 'enzyme';
import RibbonBarDropdownList, {
  Items,
  RibbonBarDropdownListProps,
} from '../index';
import DropdownChoice, { DropdownChoiceProps } from '../../DropdownChoice';
interface RibbonBarDropdownListChoiceProps extends DropdownChoiceProps {
  fontFamily: React.CSSProperties['fontFamily'];
}

const initialProps: RibbonBarDropdownListProps = {
  isDisabled: false,
  placeholder: 'Font',
};
const items: Items = [
  { value: 1, text: 'Bradley Hand', fontFamily: 'Bradley Hand' },
  { value: 2, text: 'Recently Used', isSeparator: true },
  { value: 3, text: 'Verdana', fontFamily: 'Verdana' },
];
const component = mount(<RibbonBarDropdownList {...initialProps} />);

describe('UxtRibbonBarDropdownList', () => {
  it('check render of component', () => {
    expect(component.find(RibbonBarDropdownList).length).toEqual(1);
  });

  it('check for sort', () => {
    const mockOnValueChange = jest.fn();

    component.setProps({
      items,
      isSortable: true,
      sortDirection: 'desc',
      textAccessor: 'text',
      valueAccessor: 'value',
      value: 2,
      onValueChange: mockOnValueChange,
    });
    component.update();

    expect(component.find(RibbonBarDropdownList).prop('isSortable')).toEqual(
      true,
    );
    expect(component.find(RibbonBarDropdownList).prop('sortDirection')).toEqual(
      'desc',
    );
  });

  it('check for accessors', () => {
    component.setProps({
      items,
      textAccessor: 'text',
      valueAccessor: 'value',
      itemDisabledAccessor: 'isDisabled',
      separateAccessor: 'separator',
    });
    component.update();

    expect(component.find(RibbonBarDropdownList).prop('textAccessor')).toEqual(
      'text',
    );
    expect(component.find(RibbonBarDropdownList).prop('valueAccessor')).toEqual(
      'value',
    );
    expect(
      component.find(RibbonBarDropdownList).prop('itemDisabledAccessor'),
    ).toEqual('isDisabled');
    expect(
      component.find(RibbonBarDropdownList).prop('separateAccessor'),
    ).toEqual('separator');
  });

  it('check for children', () => {
    component.setProps({
      children: items.map((item: RibbonBarDropdownListChoiceProps) => (
        <DropdownChoice
          key={item.value}
          text={item.text}
          value={item.value}
          style={{ fontFamily: item.fontFamily }}
        />
      )),
      value: 2,
    });
    component.update();

    expect(component.find(RibbonBarDropdownList).prop('value')).toEqual(2);
  });
});
