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

function Icon(props) {
  return <div>{props.svg.length}</div>;
}

export default function ListItemIconComponent() {
  return (
    <ListItem
      iconComponent={Icon}
      iconSvgAccessor="iconSvg"
      item={item}
      primaryTextAccessor="name"
    />
  );
}
