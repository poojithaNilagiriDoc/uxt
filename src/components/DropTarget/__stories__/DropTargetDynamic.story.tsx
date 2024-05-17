import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import Button from '../../Button';
import List from '../../List';
import Shell from '../../Shell';
import Toolbar from '../../Toolbar';
import DropTarget from '../index';

export default function DropTargetDynamic() {
  const theme = useTheme();
  const [files, setFiles] = React.useState([]);
  const [isFileOver, setIsFileOver] = React.useState(false);

  const handleBrowseInputValueChange = React.useCallback(
    function handleBrowseInputValueChange(e) {
      e.persist();

      if (e.target.value === '') return;

      setFiles([...files, ...Array.from(e.target.files)]);
    },
    [files],
  );

  const handleDragOver = React.useCallback(
    function handleDragOver(e) {
      e.preventDefault();

      if (isFileOver) return;

      setIsFileOver(true);
    },
    [isFileOver],
  );

  const handleDrop = React.useCallback(
    function handleDrop(e) {
      e.persist();
      e.preventDefault();

      setFiles([...files, Array.from(e.dataTransfer.files)]);
      setIsFileOver(false);
    },
    [files],
  );

  return (
    <Shell>
      <Toolbar position="top" style={{ background: 'white' }}>
        <h1>Documents</h1>
      </Toolbar>
      <div
        onDragLeave={() => setIsFileOver(false)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          paddingTop: 8,
          position: 'relative',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            color: theme.palette.text.secondary,
            display: 'flex',
            flex: '0 0 auto',
            minHeight: 26,
            paddingLeft: 16,
            paddingRight: 8,
            textTransform: 'uppercase',
          }}
        >
          Drag files here or
          <Button
            appearance="text"
            style={{
              position: 'relative',
            }}
          >
            <input
              id="INPUT"
              multiple={true}
              onChange={handleBrowseInputValueChange}
              style={{
                height: 0.1,
                opacity: 0,
                overflow: 'hidden',
                position: 'absolute',
                width: 0.1,
                zIndex: -1,
              }}
              type="file"
            />
            <label
              htmlFor="INPUT"
              style={{
                alignItems: 'center',
                color: theme.palette.text.link,
                cursor: 'pointer',
                display: 'flex',
                height: 36,
              }}
            >
              BROWSE
            </label>
          </Button>
        </div>
        <List
          isInternalScrollEnabled={false}
          items={files}
          primaryTextAccessor="name"
        />
        <DropTarget isFileOver={isFileOver} text="Drop to upload files" />
      </div>
    </Shell>
  );
}
