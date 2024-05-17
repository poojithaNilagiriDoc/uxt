import React from 'react';
import { mount } from 'enzyme';
import SearchCore, { SearchCoreProps } from '..';

const initialProps: SearchCoreProps = {
  value: 'sample',
  placeholder: 'Search',
};
const component = mount(<SearchCore {...initialProps} />);

describe('UxtSearchCore', () => {
  it('check render of component', () => {
    expect(component.find(SearchCore).length).toEqual(1);
  });

  it('check for className prop', () => {
    component.setProps({
      className: 'search-core',
    });

    expect(component.find(SearchCore).prop('className')).toEqual('search-core');
  });

  it('check for onChange', () => {
    const mockOnChange = jest.fn();

    component.setProps({
      value: 'movie',
      onValueChange: mockOnChange,
    });
    component.update();

    component.find('input').first().simulate('change');

    expect(mockOnChange).toHaveBeenCalledWith('movie');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
