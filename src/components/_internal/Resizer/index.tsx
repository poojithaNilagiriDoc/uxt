import clamp from 'lodash/fp/clamp';
import includes from 'lodash/fp/includes';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.mixins.absoluteFill,
        pointerEvents: 'none',
      },
      handleBottom: {
        bottom: 0,
        cursor: 'ns-resize',
        height: 16,
        left: 0,
        pointerEvents: 'auto',
        position: 'absolute',
        right: 0,
      },
      handleBottomLeft: {
        bottom: 0,
        cursor: 'nesw-resize',
        height: 16,
        left: 0,
        pointerEvents: 'auto',
        position: 'absolute',
        width: 16,
      },
      handleBottomRight: {
        bottom: 0,
        cursor: 'nwse-resize',
        height: 16,
        pointerEvents: 'auto',
        position: 'absolute',
        right: 0,
        width: 16,
      },
      handleLeft: {
        bottom: 0,
        cursor: 'ew-resize',
        left: 0,
        pointerEvents: 'auto',
        position: 'absolute',
        top: 0,
        width: 16,
      },
      handleRight: {
        bottom: 0,
        cursor: 'ew-resize',
        pointerEvents: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 16,
      },
      handleTop: {
        cursor: 'ns-resize',
        height: 16,
        left: 0,
        pointerEvents: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
      },
      handleTopLeft: {
        cursor: 'nwse-resize',
        height: 16,
        left: 0,
        pointerEvents: 'auto',
        position: 'absolute',
        top: 0,
        width: 16,
      },
      handleTopRight: {
        cursor: 'nesw-resize',
        height: 16,
        pointerEvents: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 16,
      },
    }),
  { name: 'UxtResizer' },
);

type ResizerDragHandlePosition =
  | 'b'
  | 'bl'
  | 'br'
  | 'l'
  | 'r'
  | 't'
  | 'tl'
  | 'tr';

export interface ResizerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  enabledDragHandles?: Array<ResizerDragHandlePosition>;
  height?: number;
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
  onHeightChange?: (height: number) => void;
  onStart?: (handle: ResizerDragHandlePosition, data: DraggableData) => void;
  onStop?: (handle: ResizerDragHandlePosition, data: DraggableData) => void;
  onWidthChange?: (width: number) => void;
  width?: number;
}

function Resizer(props: ResizerProps) {
  const activeDragHandle: React.MutableRefObject<ResizerDragHandlePosition> =
    React.useRef();
  const heightBeforeDragging = React.useRef(0);
  const widthBeforeDragging = React.useRef(0);
  const xBeforeDragging = React.useRef(0);
  const yBeforeDragging = React.useRef(0);
  const {
    className,
    classes: classesProp,
    enabledDragHandles,
    height,
    maxHeight = Infinity,
    maxWidth = Infinity,
    minHeight = 16,
    minWidth = 16,
    onHeightChange,
    onStart,
    onStop,
    onWidthChange,
    width,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleDrag = React.useCallback(
    function handleDrag(e: DraggableEvent, data: DraggableData) {
      const xAxisSign: number = includes('l', activeDragHandle.current)
        ? -1
        : 1;
      const yAxisSign: number = includes('t', activeDragHandle.current)
        ? -1
        : 1;
      const newHeight = clamp(
        minHeight,
        maxHeight,
        heightBeforeDragging.current +
          yAxisSign * (data.y - yBeforeDragging.current),
      );

      const newWidth = clamp(
        minWidth,
        maxWidth,
        widthBeforeDragging.current +
          xAxisSign * (data.x - xBeforeDragging.current),
      );

      if (includes('t', activeDragHandle.current)) {
        if (newHeight !== height) {
          onHeightChange(newHeight);
        }
      }

      if (includes('r', activeDragHandle.current)) {
        if (newWidth !== width) {
          onWidthChange(newWidth);
        }
      }

      if (includes('b', activeDragHandle.current)) {
        if (newHeight !== height) {
          onHeightChange(newHeight);
        }
      }

      if (includes('l', activeDragHandle.current)) {
        if (newWidth !== width) {
          onWidthChange(newWidth);
        }
      }
    },
    [
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      onHeightChange,
      onWidthChange,
      width,
    ],
  );

  const handleStart = React.useCallback(
    function handleStart(
      handle: ResizerDragHandlePosition,
      data: DraggableData,
    ) {
      activeDragHandle.current = handle;
      heightBeforeDragging.current = Number(height);
      widthBeforeDragging.current = Number(width);
      xBeforeDragging.current = data.x;
      yBeforeDragging.current = data.y;
      if (onStart) onStart(handle, data);
    },
    [height, width, onStart],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      {showIf(includes('b', enabledDragHandles))(
        <DraggableCore
          offsetParent={document.body}
          onDrag={handleDrag}
          onStart={(e, data) => handleStart('b', data)}
          onStop={(e, data) => {
            if (onStop) onStop('b', data);
          }}
        >
          <div className={classes.handleBottom} />
        </DraggableCore>,
      )}
      {showIf(includes('l', enabledDragHandles))(
        <DraggableCore
          offsetParent={document.body}
          onDrag={handleDrag}
          onStart={(e, data) => handleStart('l', data)}
          onStop={(e, data) => {
            if (onStop) onStop('l', data);
          }}
        >
          <div className={classes.handleLeft} />
        </DraggableCore>,
      )}
      {showIf(includes('r', enabledDragHandles))(
        <DraggableCore
          offsetParent={document.body}
          onDrag={handleDrag}
          onStart={(e, data) => handleStart('r', data)}
          onStop={(e, data) => {
            if (onStop) onStop('r', data);
          }}
        >
          <div className={classes.handleRight} />
        </DraggableCore>,
      )}
      {showIf(includes('t', enabledDragHandles))(
        <DraggableCore
          offsetParent={document.body}
          onDrag={handleDrag}
          onStart={(e, data) => handleStart('t', data)}
          onStop={(e, data) => {
            if (onStop) onStop('t', data);
          }}
        >
          <div className={classes.handleTop} />
        </DraggableCore>,
      )}
      {showIf(includes('tl', enabledDragHandles))(
        <DraggableCore
          offsetParent={document.body}
          onDrag={handleDrag}
          onStart={(e, data) => handleStart('tl', data)}
          onStop={(e, data) => {
            if (onStop) onStop('tl', data);
          }}
        >
          <div className={classes.handleTopLeft} />
        </DraggableCore>,
      )}
      {showIf(includes('tr', enabledDragHandles))(
        <DraggableCore
          offsetParent={document.body}
          onDrag={handleDrag}
          onStart={(e, data) => handleStart('tr', data)}
          onStop={(e, data) => {
            if (onStop) onStop('tr', data);
          }}
        >
          <div className={classes.handleTopRight} />
        </DraggableCore>,
      )}
      {showIf(includes('bl', enabledDragHandles))(
        <DraggableCore
          offsetParent={document.body}
          onDrag={handleDrag}
          onStart={(e, data) => handleStart('bl', data)}
          onStop={(e, data) => {
            if (onStop) onStop('bl', data);
          }}
        >
          <div className={classes.handleBottomLeft} />
        </DraggableCore>,
      )}
      {showIf(includes('br', enabledDragHandles))(
        <DraggableCore
          offsetParent={document.body}
          onDrag={handleDrag}
          onStart={(e, data) => handleStart('br', data)}
          onStop={(e, data) => {
            if (onStop) onStop('br', data);
          }}
        >
          <div className={classes.handleBottomRight} />
        </DraggableCore>,
      )}
    </div>
  );
}

export default React.memo(Resizer);
