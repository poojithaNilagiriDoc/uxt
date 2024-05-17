import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/styles/createStyles';
import attachments from 'uxt-graphics/graphics/attachments';
import EmptyState from '../../EmptyState';
import Button from '../../Button';
import DropTarget from '../index';
import makeStyles from '../../_helpers/makeStyles';
import List from '../../List';
import Input from '../../Input';
import Shell from '../../Shell';
import showIf from '../../_helpers/showIf';
import Toolbar from '../../Toolbar';
import NotificationService from '../../../services/NotificationService';
import DialogService from '../../../services/DialogService';
import type { UxtTheme } from '../../../themes/UxtTheme';
import hideIf from '../../_helpers/hideIf';

const INVALID_MESSAGE =
  'Some of the files that were dropped have an invalid file format. Only jpeg/jpg files are allowed';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        gap: theme.spacing(2),
      },
      fileDropContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        gap: theme.spacing(2),
      },
      dropTargetEmpty: {
        ...theme.mixins.absoluteFill,
        width: '100%',
        height: '100%',
      },
      dropTargetWithFiles: {
        height: theme.spacing(30),
      },
      childrenContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1 1 auto',
        flexDirection: 'column',
        gap: theme.spacing(2),
      },
      dropText: {
        ...theme.typography.subtitle1,
        color: theme.palette.text.secondary,
      },
      fileList: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: theme.spacing(31),
      },
      titleToolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    }),
  {
    name: 'UxtStorybookDropTargetBasics',
  },
);

export default function DropTargetBasics(props = {}) {
  const [isFileOver, setIsFileOver] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<Array<File>>([]);
  const [inputRefElement, setInputRefElement] =
    React.useState<HTMLInputElement>();
  const [selectedItem, setSelectedItem] = React.useState<File>();
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  const classes = useStyles(props);

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const items = e.dataTransfer.items;
      if (items) {
        for (const item of items) {
          if (item.type !== 'image/jpeg') {
            setIsInvalid(true);
            break;
          }
        }
      }
      if (isFileOver) return;
      setIsFileOver(true);
    },
    [isFileOver],
  );

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      setIsInvalid(false);
      setIsFileOver(false);
    },
    [],
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.persist();
      e.preventDefault();
      const _files = e.dataTransfer.files;
      let isInvalid = false;
      for (let file of _files) {
        if (file.type !== 'image/jpeg') {
          isInvalid = true;
          NotificationService.error(
            'Invalid File Format',
            () => {
              DialogService.alert({
                titleText: 'Invalid File Format',
                message: INVALID_MESSAGE,
                submitText: 'Ok',
                type: 'error',
              });
            },
            'Details',
          );
          break;
        }
      }
      isInvalid ? setIsInvalid(true) : setFiles([...files, ..._files]);
      setIsFileOver(false);
    },
    [files],
  );

  const handleClick = React.useCallback(() => {
    inputRefElement?.click();
  }, [inputRefElement]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist();
      e.preventDefault();
      if (e.target.value === '') return;

      const targetFiles = e.target.files;
      let isInvalid = false;
      if (targetFiles !== null) {
        for (let file of targetFiles) {
          if (file.type !== 'image/jpeg') {
            isInvalid = true;
            NotificationService.error(
              'Invalid File Format',
              () => {
                DialogService.alert({
                  titleText: 'Invalid File Format',
                  message: INVALID_MESSAGE,
                  submitText: 'Ok',
                  type: 'error',
                });
              },
              'Details',
            );
            break;
          }
        }
        isInvalid ? setIsInvalid(true) : setFiles([...files, ...targetFiles]);
      }
    },
    [files],
  );

  return (
    <Shell className={classes.root}>
      <Toolbar className={classes.titleToolbar}>Attachments</Toolbar>
      <div className={classes.fileDropContainer}>
        <DropTarget
          className={classnames({
            [classes.dropTargetEmpty]: files.length < 1,
            [classes.dropTargetWithFiles]: files.length > 0,
          })}
          isInvalid={isInvalid}
          isFileOver={isFileOver}
          text="Drop to upload files"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={classes.childrenContainer}>
            {hideIf(files?.length > 0)(
              <EmptyState
                size="extraLarge"
                graphicSvg={attachments}
                headline="No files have been attached yet"
              />,
            )}
            <div className={classes.dropText}>
              Drag and Drop Files Here (or)
            </div>
            <Button
              text="Click to Browse"
              appearance="contained"
              onClick={handleClick}
            >
              Click to Browse
              <Input
                style={{ display: 'none', width: 0.01, height: 0.01 }}
                type="file"
                multiple={true}
                onChange={handleChange}
                inputRef={element => setInputRefElement(element)}
              />
            </Button>
          </div>
        </DropTarget>

        {showIf(files?.length > 0)(
          <List
            className={classes.fileList}
            items={files}
            primaryTextAccessor={'name'}
            selectedItem={selectedItem}
            onSelectedItemChange={(item: unknown) => {
              setSelectedItem(item as File);
            }}
          />,
        )}
      </div>
    </Shell>
  );
}
