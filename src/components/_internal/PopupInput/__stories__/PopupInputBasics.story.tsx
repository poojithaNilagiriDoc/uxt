import React from 'react';
import { action } from '@storybook/addon-actions';
import search from 'uxt-graphics/icons/search';
import PopupInput from '../index';

export default function PopupInputBasics() {
  return (
    <div style={{ padding: 16 }}>
      <PopupInput
        iconSvg={search}
        isPopupOpen={false}
        onIsPopupOpenChange={action('onIsPopupOpenChange')}
        onKeyDown={action('onKeyDown')}
        onValueChange={action('onValueChange')}
        placeholder="Search"
        value=""
        style={{ marginBottom: 16 }}
      >
        <div style={{ padding: 12 }}>Popup!</div>
      </PopupInput>
      <PopupInput
        iconSvg={search}
        isPopupOpen={true}
        onIsPopupOpenChange={action('onIsPopupOpenChange')}
        onKeyDown={action('onKeyDown')}
        onValueChange={action('onValueChange')}
        placeholder="Search"
        value=""
      >
        <div style={{ padding: 12 }}>Popup!</div>
      </PopupInput>
    </div>
  );
}
