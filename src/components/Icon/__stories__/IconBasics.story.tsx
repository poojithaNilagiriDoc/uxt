import React from 'react';
import star from 'uxt-graphics/icons/star';
import Icon from '../index';

export default function IconBasics() {
  return (
    <>
      <Icon size="small" svg={star} />
      <Icon size="regular" svg={star} />
      <Icon size="large" svg={star} />
      <Icon style={{ fill: 'blue' }} svg={star} />
      <Icon size={20} svg={star} />
    </>
  );
}
