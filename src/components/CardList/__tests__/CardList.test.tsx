import React from 'react';
import { mount } from 'enzyme';
import { AutoSizer } from 'react-virtualized';
import Card from '../index';
import CardList from '../index';

const mockButton1Click = jest.fn();
const mockButton2Click = jest.fn();
const mockButton2Change = jest.fn();
const initialProps = {
  actionButton1Text: 'Action 1',
  actionButton2Text: 'Action 2',
  onActionButton1Click: mockButton1Click,
  onActionButton2Click: mockButton2Click,
  onCardClick: mockButton2Change,
};

const component = mount(<Card {...initialProps} />);

describe('UxtCardList', () => {
  it('check render of component', () => {
    expect(component.find(CardList).length).toEqual(1);
  });

  it('check Card component props on update', () => {
    expect(component.find(AutoSizer).length).toEqual(1);
    expect(component.find(Card).length).toEqual(1);
    expect(component.find(Card).prop('actionButton1Text')).toEqual('Action 1');
    expect(component.find(Card).prop('actionButton2Text')).toEqual('Action 2');

    component.setProps({
      actionButton1Text: 'button1',
      actionButton2Text: 'button2',
    });
    component.update();

    expect(component.find(Card).prop('actionButton1Text')).toEqual('button1');
    expect(component.find(Card).prop('actionButton2Text')).toEqual('button2');
    component.find(Card).prop('onActionButton1Click')();
    expect(mockButton1Click).toHaveBeenCalled();
    component.find(Card).prop('onActionButton2Click')();
    expect(mockButton1Click).toHaveBeenCalled();
  });
});
