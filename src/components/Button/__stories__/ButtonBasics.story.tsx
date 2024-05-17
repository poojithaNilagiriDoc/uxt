import React from 'react';
import Button from '../index';

export default function ButtonBasics() {
  return (
    <>
      <Button appearance="text" style={{ margin: 16 }} text="text" />
      <Button appearance="outlined" style={{ margin: 16 }} text="outlined" />
      <Button appearance="contained" style={{ margin: 16 }} text="contained" />
    </>
  );
}
