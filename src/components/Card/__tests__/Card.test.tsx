import React from 'react';
import { mount } from 'enzyme';
import Card from '../index';
import Toolbar from '../../Toolbar';
import Button from '../../Button';

const mockOpenClick = jest.fn();
const mockButton1Click = jest.fn();
const mockButton2Click = jest.fn();
const initialProps = {
  onClick: mockOpenClick,
  onActionButton1Click: mockButton1Click,
  onActionButton2Click: mockButton2Click,
  actionButton1Text: 'action1',
  actionButton2Text: 'action2',
};

const component = mount(<Card {...initialProps} />);

describe('UxtCard', () => {
  it('check render of component', () => {
    expect(component.find(Card).length).toEqual(1);
  });

  it('check click event', () => {
    expect(component.find('div').length).toEqual(4);
    component.find('div').at(0).prop('onClick')();

    expect(mockOpenClick).toHaveBeenCalled();
  });

  it('check Toolbar component on onActionButton1Click and onActionButton2Click click', () => {
    expect(component.find(Toolbar).length).toEqual(1);

    component.setProps({
      onActionButton1Click: null,
      onActionButton2Click: null,
    });

    expect(component.find(Toolbar).length).toEqual(0);

    component.setProps({
      onActionButton1Click: mockButton1Click,
      onActionButton2Click: null,
    });

    expect(component.find(Toolbar).length).toEqual(1);

    component.setProps({
      onActionButton1Click: null,
      onActionButton2Click: mockButton2Click,
    });

    expect(component.find(Toolbar).length).toEqual(1);
  });

  it('check Button component props on button1 and button2 click', () => {
    component.setProps({
      onActionButton1Click: null,
      onActionButton2Click: null,
    });

    expect(component.find(Button).length).toEqual(0);

    component.setProps({
      onActionButton1Click: mockButton1Click,
      onActionButton2Click: null,
    });

    expect(component.find(Button).text()).toEqual('action1');
    const event: MouseEvent = new MouseEvent('click');

    component.find(Button).prop('onClick')(event);

    expect(component.find(Button).prop('appearance')).toEqual('text');
    expect(mockButton1Click).toHaveBeenCalled();

    component.setProps({
      onActionButton1Click: null,
      onActionButton2Click: mockButton2Click,
    });

    expect(component.find(Button).text()).toEqual('action2');
    component.find(Button).prop('onClick')(event);
    expect(mockButton2Click).toHaveBeenCalled();
  });
});
