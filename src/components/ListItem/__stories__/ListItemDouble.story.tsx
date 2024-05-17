import React from 'react';
import star from 'uxt-graphics/icons/star';
import ListItem from '../index';

const item = {
  name: 'Nick',
  iconSvg: star,
  picture: 'http://lorempixel.com/256/256/technics/?99501',
  occupation: 'Software Engineer',
  company: 'Intergraph',
};

export default function ListItemDouble() {
  return (
    <ListItem
      iconSvgAccessor="iconSvg"
      item={item}
      primaryTextAccessor="name"
      secondaryTextAccessor="company"
      type="double"
    />
  );
}
