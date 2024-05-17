import React from 'react';
import star from 'uxt-graphics/icons/star';
import ToggleIconButton from '../index';

export default function ToggleIconButtonDynamic() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div style={{ padding: 16 }}>
      <ToggleIconButton
        iconSvg={star}
        isActive={isActive}
        onIsActiveChange={setIsActive}
      />
    </div>
  );
}
