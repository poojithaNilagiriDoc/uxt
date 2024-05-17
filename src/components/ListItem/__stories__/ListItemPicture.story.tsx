import React from 'react';
import star from 'uxt-graphics/icons/star';
import ListItem from '../index';

const item = {
  name: 'Nick',
  iconSvg: star,
  picture: 'https://via.placeholder.com/40',
  occupation: 'Software Engineer',
  company: 'Intergraph',
};

export default function ListItemPicture() {
  return (
    <ListItem
      pictureAccessor="picture"
      item={item}
      primaryTextAccessor="name"
      type="single"
    />
  );
}
