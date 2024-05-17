import React from 'react';
import phone from 'uxt-graphics/icons/phone';
import Avatar from '../index';
import Icon from '../../Icon';

export default function AvatarBasics() {
  return (
    <div
      style={{
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-evenly',
      }}
    >
      <Avatar
        alt="Image"
        src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-human-avatar-free-vector-png-image_4825373.jpg"
        onClick={() => alert()}
        requestHeaders={{
          'User-Agent': 'Mozilla/4.0 (compatible; MSIE5.01; Windows NT)',
          'Content-Type': 'text/xml; charset=utf-8',
          'Content-Length': 'length',
          'Accept-Language': 'en-us',
          'Accept-Encoding': 'gzip, deflate',
          Connection: 'Keep-Alive',
          'Access-Control-Allow-Origin': '*',
        }}
      />
      <Avatar alt="Text" variant="rounded" />
      <Avatar>RS</Avatar>
      <Avatar variant="square">
        <Icon svg={phone} />
      </Avatar>
      <Avatar size="large" />
      <Avatar
        src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-human-avatar-free-vector-png-image_4825373.jpg"
        isDisabled={true}
      />
    </div>
  );
}
