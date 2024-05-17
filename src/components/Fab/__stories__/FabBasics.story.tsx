import React from 'react';
import add from 'uxt-graphics/icons/add';
import Fab from '../index';

export default function FabBasics() {
  return (
    <>
      <Fab iconSvg={add} />
      <Fab iconSvg={add} isMini={true} />
      <Fab iconSvg={add} isExtended={true} text="Add" />
    </>
  );
}
