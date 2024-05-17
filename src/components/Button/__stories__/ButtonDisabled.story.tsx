import React from 'react';
import Button from '../index';

export default function ButtonDisabled() {
  return (
    <>
      <Button
        appearance="text"
        disabled={true}
        style={{ margin: 16 }}
        text="text"
      />
      <Button
        appearance="outlined"
        disabled={true}
        style={{ margin: 16 }}
        text="outlined"
      />
      <Button
        appearance="contained"
        disabled={true}
        style={{ margin: 16 }}
        text="contained"
      />
    </>
  );
}
