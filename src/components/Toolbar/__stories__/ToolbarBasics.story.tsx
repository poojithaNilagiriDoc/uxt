import React from 'react';
import star from 'uxt-graphics/icons/star';
import user from 'uxt-graphics/icons/user';
import IconButton from '../../IconButton';
import Toolbar from '../index';

export default function ToolbarBasics() {
  return (
    <Toolbar position="top">
      <IconButton iconSvg={star} />
      <IconButton iconSvg={user} style={{ marginLeft: 'auto' }} />
    </Toolbar>
  );
}
