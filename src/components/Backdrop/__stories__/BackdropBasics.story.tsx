import React from 'react';
import Button from '../../Button';
import Backdrop from '../index';
import Spinner from '../../Spinner';

export default function BackdropBasics() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button
        appearance="contained"
        onClick={() => setIsOpen(!isOpen)}
        style={{ margin: 16 }}
        text="Show Backdrop"
      />
      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Spinner />
        <p>Loading...</p>
      </Backdrop>
    </>
  );
}
