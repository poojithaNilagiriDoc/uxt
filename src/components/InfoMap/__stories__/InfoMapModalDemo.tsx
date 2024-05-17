import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import capitalize from 'lodash/fp/capitalize';
import { NodeType } from '..';
import Modal from '../../Modal';
import makeStyles from '../../_helpers/makeStyles';
import Icon from '../../Icon';
import showIf from '../../_helpers/showIf';

export interface InfoMapModalDemoProps {
  classes?: Record<string, string>;
  closeModal: () => void;
  isOpen: boolean;
  node: NodeType;
}

export default function InfoMapModalDemo(props: InfoMapModalDemoProps) {
  const useStyles = makeStyles(
    () =>
      createStyles({
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        },
        icon: {
          width: 128,
          height: 128,
        },
      }),
    {
      name: 'InfoMapStoryDemo',
    },
  );
  const { isOpen, closeModal, node } = props;
  const classes = useStyles(props);

  return (
    <Modal
      isOpen={isOpen}
      onCancel={closeModal}
      onSubmit={closeModal}
      titleText={capitalize(node.id.toString())}
      isDraggable={true}
    >
      <div className={classes.root}>
        {typeof node.labelContent === 'string' && <h1>{node.labelContent}</h1>}
        {typeof node.labelContent !== 'string' && node.labelContent}
        {showIf(node.iconSvg)(
          <Icon
            classes={{ root: classes.icon }}
            svg={node.iconSvg}
            size={128}
          />,
        )}
      </div>
    </Modal>
  );
}
