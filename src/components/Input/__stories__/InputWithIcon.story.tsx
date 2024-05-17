import React from 'react';
import search from 'uxt-graphics/icons/search';
import Input from '../index';
import NotificationService from '../../../services/NotificationService';

export default function InputWithIcon() {
  return (
    <div style={{ padding: 16 }}>
      <Input
        iconSvg={search}
        style={{ width: 120 }}
        value="Value that runs into icon"
        iconProps={{
          onClick: () => {
            NotificationService.info('Clicked Icon');
          },
        }}
      />
    </div>
  );
}
