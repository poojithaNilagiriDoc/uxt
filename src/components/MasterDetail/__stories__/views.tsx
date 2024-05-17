import React from 'react';
import hideIf from '../../_helpers/hideIf';

function Content(props) {
  return (
    <div>
      {hideIf(props.isScreenWide)(
        <div onClick={() => props.onCurrentViewNameChange('')}>Back</div>,
      )}
      Content for {props.name}
    </div>
  );
}

const Views = {
  'View A': function ViewA(props) {
    return <Content name="View A" {...props} />;
  },
  'View B': function ViewB(props) {
    return <Content name="View B" {...props} />;
  },
  'View C': function ViewC(props) {
    return <Content name="View C" {...props} />;
  },
  'View D': function ViewD(props) {
    return <Content name="View D" {...props} />;
  },
  'View E': function ViewE(props) {
    return <Content name="View E" {...props} />;
  },
};

export default Views;
