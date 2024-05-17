import React from 'react';
import Button from '../../../Button';
import CenteredContent from '../../../CenteredContent';
import Transition from '../index';

export default function TransitionDynamic() {
  const getPage = React.useCallback(function getPage(transition) {
    return (
      <>
        <Button
          onClick={() =>
            transition.goBack({ pageNumber: transition.payload.pageNumber - 1 })
          }
          text="Go Back"
        />
        <div style={{ justifyContent: 'center', display: 'flex', padding: 16 }}>
          {transition.payload.pageNumber}
        </div>
        <Button
          onClick={() =>
            transition.goForward({
              pageNumber: transition.payload.pageNumber + 1,
            })
          }
          text="Go Forward"
        />
        <Button onClick={transition.reset} text="Reset" />
      </>
    );
  }, []);

  return (
    <CenteredContent>
      <Transition getPage={getPage} initialPayload={{ pageNumber: 10 }} />
    </CenteredContent>
  );
}
