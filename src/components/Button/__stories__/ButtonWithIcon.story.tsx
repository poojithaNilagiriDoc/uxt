import React from 'react';
import star from 'uxt-graphics/icons/star';
import Button from '../index';

export default function ButtonWithIcon() {
  return (
    <>
      <Button
        appearance="text"
        iconSvg={star}
        style={{ margin: 16 }}
        text="text"
      />
      <Button
        appearance="outlined"
        iconSvg={star}
        style={{ margin: 16 }}
        text="outlined"
      />
      <Button
        appearance="contained"
        iconSvg={star}
        style={{ margin: 16 }}
        text="contained"
      />
    </>
  );
}
