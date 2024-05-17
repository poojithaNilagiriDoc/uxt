import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import trash from 'uxt-graphics/icons/trash';
import ListItem from '../index';

const item = {
  name: 'Nick',
  iconSvg: star,
  picture: 'http://lorempixel.com/256/256/technics/?99501',
  occupation: 'Software Engineer',
  company: 'Intergraph',
};

export default function ListItemBasics() {
  return (
    <ListItem
      action={action('trash')}
      actionIconSvg={trash}
      iconSvgAccessor="iconSvg"
      isSelected={true}
      item={item}
      onSelect={action('onSelect')}
      onToggle={action('onToggle')}
      primaryTextAccessor="name"
      type="single"
    />
  );
}
