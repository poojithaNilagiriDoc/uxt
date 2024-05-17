import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '../../_helpers/makeStyles';
import Button from '../../Button';
import Shell from '../../Shell';
import Modal from '../index';

const useStyles = makeStyles(
  () =>
    createStyles({
      customWindow: {
        width: 960,
        height: 768,
        maxWidth: '100%',
      },
    }),
  { name: 'UxtModalResizable' },
);

export default function ModalResizable() {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const classes = useStyles({});

  return (
    <Shell>
      <Button
        appearance="contained"
        onClick={() => setIsOpen(true)}
        style={{ margin: 'auto' }}
        text="Open Modal"
      />
      <Modal
        classes={{ window: classes.customWindow }}
        isOpen={isOpen}
        showActionButton={true}
        actionText={'click'}
        isResizable={true}
        isDraggable={false}
        onAction={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(false)}
        titleText="Title"
      >
        Some text inside a Modal
      </Modal>
    </Shell>
  );
}
