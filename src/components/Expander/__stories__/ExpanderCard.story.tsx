import React from 'react';
import Card from '../../Card';
import Button from '../../Button';
import Expander from '../index';

export default function ExpanderCard() {
  const [isOpen, setIsOpen] = React.useState();

  return (
    <div style={{ padding: 16 }}>
      <Card item={{}}>
        <div
          style={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
          }}
        >
          <h3 style={{ padding: 16 }}>My Document</h3>
          <Expander
            headerText={'MORE INFO'}
            isOpen={isOpen}
            onIsOpenChange={x => setIsOpen(x)}
          >
            <div className="content" style={{ padding: 16, paddingTop: 0 }}>
              <div>Some Content!</div>
              <Button>Some Content!</Button>
              <div>Some Content!</div>
              <Button>Some Content!</Button>
            </div>
          </Expander>
        </div>
      </Card>
    </div>
  );
}
