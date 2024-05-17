import React from 'react';
import alarm from 'uxt-graphics/icons/alarm';
import Icon from '../../Icon';
import Badge from '../index';

export default function BadgeBasics() {
  return (
    <Badge count={3}>
      <Icon svg={alarm} />
    </Badge>
  );
}
