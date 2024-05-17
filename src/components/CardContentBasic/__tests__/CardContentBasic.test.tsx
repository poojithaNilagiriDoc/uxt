import React from 'react';
import { mount } from 'enzyme';
import CardContentBasic from '../index';
import ListItemText from '../../ListItemText';
import ListItemAction from '../../ListItemAction';

const mockIsOpenChange = jest.fn();
const mockButton1Change = jest.fn();
const mockButton2Change = jest.fn();
const initialProps = {
  leftTextLine1TextAccessor: 'text1',
  leftTextLine2TextAccessor: 'text2',
  leftTextLine3TextAccessor: 'text3',
  icon1Action: mockIsOpenChange,
  icon2Action: mockButton1Change,
  icon3Action: mockButton2Change,
  icon1IconSvg: 'svg',
  icon2IconSvg: 'svg1',
  icon3IconSvg: 'svg2',
  rightTextLine1TextAccessor: 'line1',
  rightTextLine2TextAccessor: 'line2',
  rightTextLine3TextAccessor: 'line3',
  item: {
    name: 'Site_Name_002',
    plants: ['a', 'b', 'c', 'd'],
    description: 'A cool site that has stuff',
    rightTextLine3TextAccessor: 'Smart P&ID',
  },
};

const component = mount(<CardContentBasic {...initialProps} />);

describe('UxtCardContentBasic', () => {
  it('check render of component', () => {
    expect(component.find(CardContentBasic).length).toEqual(1);
  });

  it('check ListItemText component props on updating leftTextLine1TextAccessor, leftTextLine2TextAccessor, leftTextLine3TextAccessor', () => {
    expect(component.find(ListItemText).length).toEqual(1);
    expect(component.find(ListItemText).prop('primaryTextAccessor')).toEqual(
      'text1',
    );
    expect(component.find(ListItemText).prop('secondaryTextAccessor')).toEqual(
      'text2',
    );
    expect(component.find(ListItemText).prop('tertiaryTextAccessor')).toEqual(
      'text3',
    );
    component.setProps({
      leftTextLine1TextAccessor: 'new text1',
      leftTextLine2TextAccessor: 'new text2',
      leftTextLine3TextAccessor: 'new text3',
    });
    component.update();

    expect(component.find(ListItemText).prop('primaryTextAccessor')).toEqual(
      'new text1',
    );
    expect(component.find(ListItemText).prop('secondaryTextAccessor')).toEqual(
      'new text2',
    );
    expect(component.find(ListItemText).prop('tertiaryTextAccessor')).toEqual(
      'new text3',
    );
  });

  it('check ListItemAction component  props on updating icon1Action, icon2Action, icon3Action', () => {
    expect(component.find(ListItemAction).length).toEqual(3);

    component.setProps({
      icon1Action: null,
      icon2Action: null,
      icon3Action: null,
    });
    expect(component.find(ListItemAction).length).toEqual(0);

    component.setProps({
      icon1Action: mockIsOpenChange,
      icon2Action: mockButton1Change,
      icon3Action: mockButton2Change,
    });
    expect(component.find(ListItemAction).length).toEqual(3);
    expect(component.find(ListItemAction).at(0).prop('item')).toEqual({
      name: 'Site_Name_002',
      plants: ['a', 'b', 'c', 'd'],
      description: 'A cool site that has stuff',
      rightTextLine3TextAccessor: 'Smart P&ID',
    });
    expect(component.find(ListItemAction).at(0).prop('iconSvg')).toEqual('svg');
    expect(component.find(ListItemAction).at(1).prop('iconSvg')).toEqual(
      'svg1',
    );
    expect(component.find(ListItemAction).at(2).prop('iconSvg')).toEqual(
      'svg2',
    );
  });
});
