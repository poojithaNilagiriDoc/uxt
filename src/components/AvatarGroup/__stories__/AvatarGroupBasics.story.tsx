import React from 'react';
import phone from 'uxt-graphics/icons/phone';
import Avatar from '../../Avatar';
import Icon from '../../Icon';
import AvatarGroup from '../index';

export default function AvatarGroupBasics() {
  return (
    <AvatarGroup style={{ padding: '16px' }}>
      <Avatar
        src="https://randomuser.me/api/portraits/men/32.jpg"
        onClick={() => alert()}
      />
      <Avatar src="https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png" />
      <Avatar src="https://randomuser.me/api/portraits/women/63.jpg" />
      <Avatar>
        <Icon svg={phone} />
      </Avatar>
      <Avatar size="large" />
      <Avatar isDisabled={true} />
    </AvatarGroup>
  );
}
