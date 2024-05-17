import classnames from 'classnames';
import { motion, MotionProps } from 'framer-motion';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import useTheme from '../_helpers/useTheme';
import Resizer from '../_internal/Resizer';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        bottom: 0,
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        height: '100%',
      },
      onRight: {
        left: 'auto',
        right: 0,
      },
    }),
  { name: 'UxtCoverPanel' },
);

type HTMLAttributesWithoutMotionProps<
  Attributes extends React.HTMLAttributes<Element>,
  Element extends HTMLElement,
> = {
  [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};

export interface CoverPanelProps
  extends HTMLAttributesWithoutMotionProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  isOnRight?: boolean;
  isOpen?: boolean;
  maxWidth?: number;
  minWidth?: number;
  onWidthChange?: (width: number) => void;
  style?: React.CSSProperties;
  width?: number;
}

const CoverPanel = React.forwardRef(function CoverPanel(
  props: CoverPanelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    isOnRight,
    isOpen,
    maxWidth,
    minWidth,
    onWidthChange,
    style,
    width = 256,
    ...rest
  } = props;
  const classes = useStyles(props);
  const theme = useTheme();

  const animation = React.useMemo(() => {
    // Added to prevent content from being erroneously rendered onscreen
    // when focusable children are focused while panel is closed.
    const visibilityStyles = isOpen
      ? { display: 'flex' }
      : { transitionEnd: { display: 'none' } };

    if (isOnRight) {
      return { marginRight: isOpen ? 0 : -width, ...visibilityStyles };
    }

    return { marginLeft: isOpen ? 0 : -width, ...visibilityStyles };
  }, [isOnRight, isOpen, width]);

  return (
    <motion.div
      animate={animation}
      className={classnames(
        classes.root,
        { [classes.onRight]: isOnRight },
        className,
      )}
      initial={false}
      ref={ref}
      style={{
        boxShadow: isOpen ? theme.shadows[1] : theme.shadows[0],
        width,
        ...style,
      }}
      transition={{ duration: 0.25 }}
      {...rest}
    >
      {children}
      {showIf(onWidthChange)(() => (
        <Resizer
          enabledDragHandles={[isOnRight ? 'l' : 'r']}
          maxWidth={maxWidth}
          minWidth={minWidth}
          onWidthChange={onWidthChange}
          width={width}
        />
      ))}
    </motion.div>
  );
});

export default React.memo(CoverPanel);
