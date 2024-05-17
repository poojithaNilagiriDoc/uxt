import classnames from 'classnames';
import isNumber from 'lodash/fp/isNumber';
import { motion, MotionProps } from 'framer-motion';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import Measure from 'react-measure';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Button from '../Button';
import Icon from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        flex: '0 0 auto',
        overflow: 'hidden',
      },
      icon: {
        marginLeft: theme.spacing(2),
      },
      content: {
        display: 'flex',
        paddingTop: theme.spacing(3),
        paddingRight: theme.spacing(3),
        width: '100%',
      },
      message: {
        ...theme.typography.body2,
        display: 'flex',
        marginLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1.5),
      },

      actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      actionButton1: {
        color: theme.palette.text.link,
      },
      actionButton2: {
        color: theme.palette.text.link,
      },
    }),
  { name: 'UxtBanner' },
);

type HTMLAttributesWithoutMotionProps<
  Attributes extends React.HTMLAttributes<Element>,
  Element extends HTMLElement,
> = {
  [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};

export interface BannerProps
  extends HTMLAttributesWithoutMotionProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  actionButton1Text?: string;
  actionButton2Text?: string;
  className?: string;
  classes?: object;
  iconSvg?: string;
  isOpen?: boolean;
  message?: React.ReactNode;
  onActionButton1Click?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onActionButton2Click?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

function Banner(props: BannerProps) {
  const {
    actionButton1Text,
    actionButton2Text,
    classes: classesProp,
    className,
    iconSvg,
    isOpen,
    message,
    onActionButton1Click,
    onActionButton2Click,
    ...rest
  } = props;
  const classes = useStyles(props);

  const [height, setHeight] = React.useState(0);

  const content = (
    <>
      <div className={classes.content}>
        {showIf(iconSvg)(
          <Icon className={classes.icon} size="large" svg={iconSvg} />,
        )}
        <div className={classes.message}> {message}</div>
      </div>
      <div className={classes.actions}>
        <Button
          className={classes.actionButton1}
          appearance="text"
          onClick={onActionButton1Click}
          text={actionButton1Text}
        />
        {showIf(!!onActionButton2Click)(() => (
          <Button
            className={classes.actionButton2}
            appearance="text"
            onClick={onActionButton2Click}
            text={actionButton2Text}
          />
        ))}
      </div>
    </>
  );

  return (
    <Measure
      bounds={true}
      onResize={contentRect => {
        setHeight(contentRect.bounds.height);
      }}
    >
      {({ contentRect, measureRef }) => {
        if (!isNumber(contentRect.bounds.height)) {
          return (
            <div
              className={classnames(classes.root, className)}
              ref={measureRef}
              style={{ opacity: 0, position: 'absolute' }}
              {...rest}
            >
              {content}
            </div>
          );
        }

        return (
          <motion.div
            className={classnames(classes.root, className)}
            animate={{ marginTop: isOpen ? 0 : -height }}
            initial={false}
            ref={measureRef}
            transition={{ duration: 0.2 }}
            {...rest}
          >
            {content}
          </motion.div>
        );
      }}
    </Measure>
  );
}

export default React.memo(Banner);
