import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import ListItem from '../index';

const item = {
  name: 'Nick',
  iconSvg: star,
  picture: 'http://lorempixel.com/256/256/technics/?99501',
  occupation: 'Software Engineer',
  company: 'Intergraph',
};

function Action(props) {
  return <div onClick={props.action}>ACTION</div>;
}

export default function ListItemActionComponent() {
  return (
    <ListItem
      action={action('trash')}
      actionComponent={Action}
      iconSvgAccessor="iconSvg"
      item={item}
      primaryTextAccessor="name"
      type="single"
    />
  );
}
