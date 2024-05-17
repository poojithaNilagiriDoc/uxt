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

function Text(props) {
  return (
    <div>
      {props.primaryTextAccessor} | {props.secondaryTextAccessor}
    </div>
  );
}

export default function ListItemTextComponent() {
  return (
    <ListItem
      textComponent={Text}
      iconSvgAccessor="iconSvg"
      item={item}
      primaryTextAccessor="name"
      secondaryTextAccessor="occupation"
    />
  );
}
