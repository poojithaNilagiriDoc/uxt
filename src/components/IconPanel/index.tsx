import classnames from 'classnames';
import { motion, MotionProps } from 'framer-motion';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        width: 256,
      },
    }),
  { name: 'UxtIconPanel' },
);

type HTMLAttributesWithoutMotionProps<
  Attributes extends React.HTMLAttributes<Element>,
  Element extends HTMLElement,
> = {
  [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};

export interface IconPanelProps
  extends HTMLAttributesWithoutMotionProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  isOpen?: boolean;
  width?: number;
}

const IconPanel = React.forwardRef(function IconPanel(
  props: IconPanelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    isOpen,
    width = 256,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <motion.div
      animate={{ width: isOpen ? width : 56 }}
      className={classnames(classes.root, className)}
      initial={false}
      ref={ref}
      transition={{ duration: 0.25 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export default React.memo(IconPanel);
