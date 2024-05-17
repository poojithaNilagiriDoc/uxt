import React from 'react';
import folder from 'uxt-graphics/icons/folder';
import Chip from '../index';

export default function ChipIcon() {
  return (
    <>
      <Chip iconSvg={folder} isActive={true} text="Active" />
      <Chip iconSvg={folder} isActive={false} text="Inactive" />
    </>
  );
}
