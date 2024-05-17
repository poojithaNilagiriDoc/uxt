import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import gear from 'uxt-graphics/icons/gear';
import user from 'uxt-graphics/icons/user';
import CardContentBasic from '../index';

export default function CardContentBasicBasics() {
  return (
    <CardContentBasic
      icon1Action={[{ text: 'Do stuff', action: action('ICON1_PRESSED') }]}
      icon2Action={action('ICON2_PRESSED')}
      icon2IconSvg={user}
      icon3Action={action('ICON3_PRESSED')}
      icon3IconSvg={gear}
      item={getItem()}
      leftTextLine1TextAccessor={'name'}
      leftTextLine2TextAccessor={item => `${item.plants.length} plants`}
      leftTextLine3TextAccessor={'description'}
      rightTextLine1TextAccessor={'products[0]'}
      rightTextLine2TextAccessor={'products[1]'}
      rightTextLine3TextAccessor={'products[2]'}
      style={
        boolean('Show on card', false)
          ? { margin: 16, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)' }
          : {}
      }
    />
  );
}

function getItem() {
  return {
    name: 'Site_Name_002',
    plants: ['a', 'b', 'c', 'd'],
    description: 'A cool site that has stuff',
    products: ['Smart P&ID', 'Smart Electrical', 'Smart Process Engineering'],
  };
}
