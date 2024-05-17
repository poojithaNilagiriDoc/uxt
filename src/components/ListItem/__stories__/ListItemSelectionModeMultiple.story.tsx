import React from 'react';
import useToggle from 'react-use/lib/useToggle';
import star from 'uxt-graphics/icons/star';
import ListItem from '../index';

const item = {
  name: 'Nick',
  iconSvg: star,
  picture: 'http://lorempixel.com/256/256/technics/?99501',
  occupation: 'Software Engineer',
  company: 'Intergraph',
};

export default function ListItemSelectionModeMultiple() {
  const [isSelected, toggleIsSelected] = useToggle(true);

  return (
    <ListItem
      iconSvgAccessor="iconSvg"
      isSelected={isSelected}
      item={item}
      onToggle={toggleIsSelected}
      primaryTextAccessor="name"
      selectionMode="multiple"
      type="single"
    />
  );
}
