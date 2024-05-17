import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import ExpanderHeader from '../../ExpanderHeader';
import Shell from '../../Shell';
import Expander from '../index';

function Header(props) {
  const theme = useTheme();

  return (
    <ExpanderHeader
      {...props}
      style={{
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    />
  );
}

const Content = props => (
  <div
    style={{
      flex: '1 1 auto',
      borderTop: '1px solid #ddd',
      padding: 16,
    }}
  >
    {props.text}
  </div>
);

export default function ExpanderAccordion() {
  const [openExpanderName, setOpenExpanderName] =
    React.useState('classification');

  const getExpanderStyle = React.useCallback(
    function getExpanderStyle(expanderName) {
      if (openExpanderName === expanderName) {
        return {
          flexGrow: 1,
        };
      }

      return undefined;
    },
    [openExpanderName],
  );

  const handleExpanderIsOpenChange = React.useCallback(
    function handleExpanderIsOpenChange(expanderName, isOpen) {
      setOpenExpanderName(isOpen ? expanderName : '');
    },
    [],
  );

  return (
    <Shell
      style={{
        borderBottom: '1px solid #ddd',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <Expander
        headerComponent={Header}
        headerText="Classification"
        isOpen={openExpanderName === 'classification'}
        onIsOpenChange={isOpen =>
          handleExpanderIsOpenChange('classification', isOpen)
        }
        style={getExpanderStyle('classification')}
      >
        <Content text="Classification Content" />
      </Expander>
      <Expander
        headerComponent={Header}
        headerText="Documents"
        isOpen={openExpanderName === 'documents'}
        onIsOpenChange={isOpen =>
          handleExpanderIsOpenChange('documents', isOpen)
        }
        style={getExpanderStyle('documents')}
      >
        <Content text="Documents Content" />
      </Expander>
      <Expander
        headerComponent={Header}
        headerText="Extras"
        isOpen={openExpanderName === 'extras'}
        onIsOpenChange={isOpen => handleExpanderIsOpenChange('extras', isOpen)}
        style={getExpanderStyle('extras')}
      >
        <Content text="Extras Content" />
      </Expander>
      <Expander
        headerComponent={Header}
        headerText="File Manager"
        isOpen={openExpanderName === 'file-manager'}
        onIsOpenChange={isOpen =>
          handleExpanderIsOpenChange('file-manager', isOpen)
        }
        style={getExpanderStyle('file-manager')}
      >
        <Content text="File Manager Content" />
      </Expander>
    </Shell>
  );
}
