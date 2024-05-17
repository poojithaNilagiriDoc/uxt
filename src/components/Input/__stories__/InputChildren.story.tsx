import React from 'react';
import star from 'uxt-graphics/icons/star';
import Icon from '../../Icon';
import Input from '../index';

export default function InputChildren() {
  return (
    <div style={{ padding: 16 }}>
      <Input label="Custom Content">
        <Icon svg={star} />
      </Input>
    </div>
  );
}
