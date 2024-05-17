import classnames from 'classnames';
import { motion, MotionProps } from 'framer-motion';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Resizer from '../_internal/Resizer';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        display: (props: PushPanelProps) => (props.isOpen ? 'flex' : 'none'),
        flex: '0 0 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      },
      resizerHandleLeft: {
        bottom: 0,
        cursor: 'ew-resize',
        left: 0,
        pointerEvents: 'auto',
        position: 'absolute',
        top: 0,
        width: 16,
      },
      resizerHandleRight: {
        bottom: 0,
        cursor: 'ew-resize',
        pointerEvents: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 4,
      },
    }),
  { name: 'UxtPushPanel' },
);

type HTMLAttributesWithoutMotionProps<
  Attributes extends React.HTMLAttributes<Element>,
  Element extends HTMLElement,
> = {
  [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};

export interface PushPanelProps
  extends HTMLAttributesWithoutMotionProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  isOnRight?: boolean;
  isOpen?: boolean;
  maxWidth?: number | string;
  minWidth?: number;
  onWidthChange?: (width: number) => void;
  style?: React.CSSProperties;
  width?: number;
}

const PushPanel = React.forwardRef(function PushPanel(
  props: PushPanelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    isOnRight,
    isOpen,
    maxWidth: maxWidthProp,
    minWidth = 0,
    onWidthChange,
    style,
    width = 256,
    ...rest
  } = props;
  const classes = useStyles(props);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [isManuallyResized, setIsManuallyResized] =
    React.useState<boolean>(false);
  const widthBeforeResize = React.useRef<number>(width);

  React.useLayoutEffect(() => {
    widthBeforeResize.current = width;
  }, [width]);

  const getMaxWidth = React.useCallback((): number => {
    if (typeof maxWidthProp === 'string') {
      if (maxWidthProp.includes('%') && maxWidthProp.endsWith('%')) {
        if (ref && ref['current']) {
          return (
            (parseInt(maxWidthProp) / 100) *
            ref['current'].parentElement.offsetWidth
          );
        }
        if (innerRef['current']) {
          return (
            (parseInt(maxWidthProp) / 100) *
            innerRef['current'].parentElement.offsetWidth
          );
        }
      }
      if (maxWidthProp.includes('px') && maxWidthProp.endsWith('px')) {
        return parseInt(maxWidthProp);
      } else return parseInt(maxWidthProp);
    } else {
      return maxWidthProp;
    }
  }, [maxWidthProp, ref]);

  const handleResize = React.useCallback((): void => {
    const maxWidth: number = getMaxWidth();

    if (onWidthChange)
      onWidthChange(
        widthBeforeResize.current >= maxWidth
          ? maxWidth
          : widthBeforeResize.current,
      );
  }, [onWidthChange, getMaxWidth, widthBeforeResize]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const animation = React.useMemo(() => {
    if (isOnRight) {
      return { marginRight: isOpen ? 0 : -width };
    }

    return { marginLeft: isOpen ? 0 : -width };
  }, [isOnRight, isOpen, width]);

  const getRef = React.useCallback(
    (ref: React.Ref<HTMLDivElement>): React.Ref<HTMLDivElement> => {
      if (ref) {
        return ref;
      } else {
        return innerRef;
      }
    },
    [],
  );

  const handleWidthChange = React.useCallback(
    (newWidth: number): void => {
      if (onWidthChange) {
        onWidthChange(newWidth);
      }
      if (isManuallyResized) {
        widthBeforeResize.current = newWidth;
      }
    },
    [isManuallyResized, onWidthChange],
  );

  const handleStartResize = React.useCallback((): void => {
    setIsManuallyResized(true);
  }, []);

  const handleStopResize = React.useCallback((): void => {
    setIsManuallyResized(false);
  }, []);

  return (
    <motion.div
      animate={animation}
      className={classnames(classes.root, className)}
      initial={false}
      ref={getRef(ref)}
      style={{ width, ...style }}
      transition={{ duration: 0.25 }}
      {...rest}
    >
      {children}
      {showIf(onWidthChange)(
        <Resizer
          enabledDragHandles={[isOnRight ? 'l' : 'r']}
          maxWidth={getMaxWidth()}
          minWidth={minWidth}
          onWidthChange={handleWidthChange}
          width={width}
          onStart={handleStartResize}
          onStop={handleStopResize}
          classes={{
            handleLeft: classes.resizerHandleLeft,
            handleRight: classes.resizerHandleRight,
          }}
        />,
      )}
    </motion.div>
  );
});

export default React.memo(PushPanel);
