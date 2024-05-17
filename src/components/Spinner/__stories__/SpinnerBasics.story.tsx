import React from 'react';
import Spinner from '../index';

export default function SpinnerBasics() {
  return (
    <>
      <Spinner appearance="line" duration={2500} size="medium" />
      <Spinner appearance="ticks" duration={10000} size="medium" />
    </>
  );
}
