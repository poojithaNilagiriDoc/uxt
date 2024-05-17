import React from 'react';
import DropTarget from '../index';

export default function DropTargetInvalid() {
  return (
    <DropTarget isFileOver={true} isInvalid={true} text="Drag & Drop Files" />
  );
}
