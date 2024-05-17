import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import IconButton from '../index';

export default function IconButtonBasics() {
  return (
    <>
      <IconButton title="Star" iconSvg={star} onClick={action('onClick')} />
      <IconButton
        title="Star"
        iconSvg={star}
        isDisabled={true}
        onClick={action('onClick')}
      />
    </>
  );
}
