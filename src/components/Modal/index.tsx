import classnames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import throttle from 'lodash/fp/throttle';
import arrowLeft from 'uxt-graphics/icons/arrow-left';
import closeSvg from 'uxt-graphics/icons/close';
import clamp from 'lodash/fp/clamp';
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import hideIf from '../_helpers/hideIf';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import Button from '../Button';
import IconButton from '../IconButton';
import Toolbar from '../Toolbar';
import SplitButton, { SplitButtonItemProps } from '../SplitButton';
import Resizer from '../../components/_internal/Resizer';
import theme from '../../themes/light';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: theme.zIndex.modal,
        '&:not($open)': {
          pointerEvents: 'none',
        },
      },
      overlay: {
        backgroundColor: theme.palette.common.black,
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      window: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        [theme.breakpoints.only('xs')]: {
          boxShadow: 'unset',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          maxWidth: 'none',
          position: 'absolute',
          width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
          borderRadius: theme.shape.borderRadius,
          flex: '0 1 auto',
          maxWidth: theme.breakpoints.values.sm,
          maxHeight: '90vh',
          minWidth: 420,
          minHeight: 171, //Header (64) + Footer (56) + Paddings - Top and Bottom (16+16) + LineHeight of 1 line of text (19)
          zIndex: theme.zIndex.modal + 1,
        },
      },
      draggableHeader: {
        cursor: 'move',
      },
      header: {
        alignItems: 'center',
        display: 'flex',
        height: theme.spacing(8),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        [theme.breakpoints.only('xs')]: {
          borderBottom: 'none',
          boxShadow: theme.shadows[1],
        },
        [theme.breakpoints.up('sm')]: {
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(1),
        },
      },
      title: {
        ...theme.typography.h6,
        marginBottom: -1,
        [theme.breakpoints.only('xs')]: {
          flex: '1 1 auto',
          marginLeft: theme.spacing(1),
        },
      },
      subtitle: {
        fontSize: theme.typography.subtitle2.fontSize,
        color: theme.palette.text.secondary,
        [theme.breakpoints.only('xs')]: {
          flex: '1 1 auto',
          marginLeft: theme.spacing(1),
        },
      },
      headerBackButton: {
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      headerCancelButton: {
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      headerSubmitButton: {
        color: theme.palette.text.link,
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      content: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        width: '100%',
        [theme.breakpoints.only('xs')]: {
          minHeight: 'initial',
        },
        [theme.breakpoints.up('sm')]: {
          minHeight: 'min-content',
          overflowY: 'inherit',
        },
      },
      actions: {
        [theme.breakpoints.up('sm')]: {
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
        },
      },
      actionsItems: {
        justifyContent: 'flex-end',
      },
      hideCancelButton: {
        [theme.breakpoints.only('xs')]: {
          display: 'none',
        },
      },
      cancelButton: {},
      submitButton: {
        color: theme.palette.text.link,
        fill: theme.palette.text.link,
      },
      actionButton: {},
      contentPadded: {
        '& $content': {
          [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(2),
          },
          [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(2) + theme.spacing(1),
            paddingRight: theme.spacing(2) + theme.spacing(1),
            paddingTop: theme.spacing(2),
          },
        },
      },
      open: {},
      positionAbsolute: {
        position: 'absolute',
      },
      resizer: {},
    }),
  { name: 'UxtModal' },
);

interface Position {
  left?: React.CSSProperties['left'];
  top?: React.CSSProperties['top'];
}
interface MaxSizeBounds {
  maxWidth?: React.CSSProperties['maxWidth'];
  maxHeight?: React.CSSProperties['maxHeight'];
}

const overlayVariants = {
  open: { opacity: 0.5 },
  closed: { opacity: 0 },
};

const windowVariants = {
  open: { y: 0 },
  closed: { y: '100vh' },
};

type DivAttributesWithoutOnSubmit = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'onSubmit'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

export interface ModalProps<T extends HTMLElement = HTMLElement>
  extends DivAttributesWithoutOnSubmit {
  actionText?: string;
  submitButtonType?: 'Button' | 'SplitButton';
  cancelText?: string;
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  isCancelDisabled?: boolean;
  isActionDisabled?: boolean;
  isContentPadded?: boolean;
  isDraggable?: boolean | (() => boolean);
  isOpen?: boolean;
  isResizable?: boolean | (() => boolean);
  isSubmitDisabled?: boolean;
  onCancel?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
  ) => void;
  onAction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickOutside?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onSubmit?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
  ) => void;
  portalContainer?: T;
  showActions?: boolean;
  showActionButton?: boolean;
  showCancelButton?: boolean;
  showHeader?: boolean;
  submitButtonItems?: Array<SplitButtonItemProps>;
  submitText?: string;
  subtitleText?: string;
  titleText?: string;
  usePortal?: boolean;
}

function Modal<T extends HTMLElement>(props: ModalProps<T>) {
  const {
    actionText,
    submitButtonType = 'Button',
    cancelText = 'Cancel',
    children,
    className,
    classes: classesProp,
    isCancelDisabled,
    isActionDisabled,
    isContentPadded = true,
    isDraggable: isDraggableProp = false,
    isOpen,
    isResizable: isResizableProp = false,
    isSubmitDisabled,
    onAction,
    onCancel,
    onClickOutside = () => {},
    onSubmit,
    portalContainer = document.body,
    showActions = true,
    showActionButton = false,
    showCancelButton = true,
    showHeader = true,
    submitText = 'Ok',
    submitButtonItems = [],
    subtitleText,
    titleText,
    usePortal = true,
    ...rest
  } = props;
  const classes = useStyles(props);

  const backdropRef = React.useRef<HTMLDivElement>();
  const [modalRef, setModalRef] = React.useState<HTMLDivElement>(undefined);
  const [isScreenWide, setIsScreenWide] = React.useState<boolean>(true);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [isPositionAbsolute, setIsPositionAbsolute] =
    React.useState<boolean>(false);
  const [isDraggable, setIsDraggable] =
    React.useState<boolean>(isDraggableProp);
  const [isResizable, setIsResizable] =
    React.useState<boolean>(isResizableProp);
  const [width, setWidth] =
    React.useState<React.CSSProperties['width']>(undefined);
  const [height, setHeight] =
    React.useState<React.CSSProperties['height']>(undefined);
  const [position, setPosition] = React.useState<Position>({ left: 0, top: 0 });
  const [maxSizeBounds, setMaxSizeBounds] = React.useState<MaxSizeBounds>({
    maxWidth: undefined,
    maxHeight: undefined,
  });

  React.useEffect(() => {
    if (!isOpen) {
      setIsPositionAbsolute(false);
      setPosition({ left: 'initial', top: 'initial' });
      setWidth(undefined);
      setHeight(undefined);
    } else {
      if (modalRef && isResizable) {
        const modalClientRect: DOMRect =
          modalRef.getBoundingClientRect() as DOMRect;

        setHeight(modalClientRect.height);
        setWidth(modalClientRect.width);
      }
    }
  }, [isOpen, isResizable, modalRef]);

  React.useEffect(() => {
    setIsDraggable(isDraggableProp);
    setIsResizable(isResizableProp);
  }, [isDraggableProp, isResizableProp]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsScreenWide(
        !window.matchMedia(`max-width:${theme.breakpoints.values.sm}px)`)
          .matches,
      );
    }
  }, []);

  React.useEffect(() => {
    setIsMounted(true);
    return () => {
      if (isMounted) setIsMounted(false);
    };
  }, [isMounted, setIsMounted]);

  const handleStartResize = React.useCallback((): void => {
    if (isResizable && modalRef && backdropRef.current) {
      const modalClientRect: DOMRect =
        modalRef.getBoundingClientRect() as DOMRect;
      const backdropClientRect: DOMRect =
        backdropRef.current.getBoundingClientRect() as DOMRect;

      setWidth(modalClientRect.width);
      setHeight(modalClientRect.height);
      setIsPositionAbsolute(true);
      setPosition({
        left: modalClientRect.left,
        top: modalClientRect.top,
      });
      setMaxSizeBounds({
        maxWidth: backdropClientRect.width - modalClientRect.left,
        maxHeight: backdropClientRect.height - modalClientRect.top,
      });
    }
  }, [isResizable, modalRef]);

  const handleStartDrag = React.useCallback((): void => {
    if (isDraggable && modalRef && backdropRef.current) {
      const modalClientRect: DOMRect =
        modalRef.getBoundingClientRect() as DOMRect;

      setIsPositionAbsolute(true);
      setPosition({
        left: modalClientRect.left,
        top: modalClientRect.top,
      });
    }
  }, [isDraggable, modalRef]);

  const handleDrag = React.useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      const modalClientRect: DOMRect =
        modalRef && (modalRef.getBoundingClientRect() as DOMRect);
      const backdropClientRect: DOMRect =
        backdropRef.current.getBoundingClientRect() as DOMRect;
      const newLeft: number = clamp(
        backdropClientRect.x,
        backdropClientRect.x + backdropClientRect.width - modalClientRect.width,
        modalClientRect.x + data.deltaX,
      );
      const newTop: number = clamp(
        backdropClientRect.y,
        backdropClientRect.y +
          backdropClientRect.height -
          modalClientRect.height,
        modalClientRect.y + data.deltaY,
      );

      setPosition({ left: newLeft, top: newTop });
    },
    [modalRef],
  );

  const handleScreenSizeChange = React.useCallback(
    throttle(
      500,
      function handleScreenSizeChange(
        isScreenWide: React.SetStateAction<boolean>,
      ) {
        setIsScreenWide(isScreenWide);
      },
    ),
    [],
  );

  const getStyle = React.useMemo((): any => {
    if (isResizable || isDraggable) {
      return {
        left: isScreenWide ? position.left : 0,
        top: isScreenWide ? position.top : 0,
        width: isScreenWide ? width : '100%',
        height: isScreenWide ? height : '100%',
        maxWidth: isScreenWide ? maxSizeBounds.maxWidth : '100%',
      };
    }
    return undefined;
  }, [
    height,
    isDraggable,
    isResizable,
    isScreenWide,
    maxSizeBounds.maxWidth,
    position.left,
    position.top,
    width,
  ]);

  const handleModalRefChange = React.useCallback(
    (ref: HTMLDivElement): void => {
      setModalRef(ref);
    },
    [],
  );

  const modal = (
    <MediaQuery
      minWidth={theme.breakpoints.values.sm}
      onChange={handleScreenSizeChange}
    >
      {() => (
        <div
          className={classnames(
            classes.root,
            {
              [classes.open]: isOpen,
              [classes.contentPadded]: isContentPadded,
            },
            className,
          )}
          ref={backdropRef}
          {...rest}
        >
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            className={classes.overlay}
            initial={false}
            onClick={onClickOutside}
            transition={{ duration: 0.25, easing: 'easeInOutQuad' }}
            variants={overlayVariants}
          />
          <AnimatePresence>
            {showIf(isOpen)(() => (
              <motion.div
                ref={handleModalRefChange}
                animate="open"
                initial={isMounted ? 'closed' : 'open'}
                className={classnames(classes.window, {
                  [classes.positionAbsolute]:
                    isPositionAbsolute && isScreenWide,
                })}
                exit="closed"
                style={getStyle}
                key={0}
                transition={{ duration: 0.25, easing: 'easeInOutQuad' }}
                variants={windowVariants}
              >
                {showIf(showHeader)(
                  <DraggableCore
                    disabled={!(isDraggable && isScreenWide)}
                    onStart={handleStartDrag}
                    onDrag={handleDrag}
                    offsetParent={document.body}
                  >
                    <Toolbar
                      className={classnames(classes.header, {
                        [classes.draggableHeader]: isDraggable && isScreenWide,
                      })}
                      position="top"
                    >
                      {hideIf(showCancelButton)(
                        <IconButton
                          className={classes.headerBackButton}
                          iconSvg={arrowLeft}
                          isDisabled={isCancelDisabled}
                          onClick={onSubmit}
                        />,
                      )}
                      {showIf(showCancelButton && showActionButton)(
                        <IconButton
                          className={classes.headerCancelButton}
                          iconSvg={closeSvg}
                          isDisabled={isCancelDisabled}
                          onClick={onCancel}
                        />,
                      )}
                      <div>
                        <div className={classes.title}>{titleText}</div>
                        <div className={classes.subtitle}>{subtitleText}</div>
                      </div>
                    </Toolbar>
                  </DraggableCore>,
                )}
                <div className={classes.content}>{children}</div>
                {showIf(showActions)(
                  <Toolbar
                    className={classes.actions}
                    classes={{ items: classes.actionsItems }}
                  >
                    {showIf(showCancelButton && showActionButton)(
                      <Button
                        appearance="text"
                        className={classes.hideCancelButton}
                        disabled={isCancelDisabled}
                        onClick={onCancel}
                        text={cancelText}
                      />,
                    )}
                    {showIf(showCancelButton && !showActionButton)(
                      <Button
                        appearance="text"
                        className={classes.cancelButton}
                        disabled={isCancelDisabled}
                        onClick={onCancel}
                        text={cancelText}
                      />,
                    )}

                    {showIf(showActionButton)(
                      <Button
                        appearance="text"
                        className={classes.actionButton}
                        disabled={isActionDisabled}
                        onClick={onAction}
                        text={actionText}
                      />,
                    )}

                    {submitButtonType === 'SplitButton' && submitButtonItems ? (
                      <SplitButton
                        appearance="text"
                        className={classes.submitButton}
                        disabled={isSubmitDisabled}
                        onClick={onSubmit}
                        text={submitText}
                        items={submitButtonItems}
                      />
                    ) : (
                      <Button
                        appearance="text"
                        className={classes.submitButton}
                        disabled={isSubmitDisabled}
                        onClick={onSubmit}
                        text={submitText}
                      />
                    )}
                  </Toolbar>,
                )}
                {showIf(isResizable && isScreenWide)(
                  <Resizer
                    className={classes.resizer}
                    onStart={handleStartResize}
                    enabledDragHandles={['b', 'r', 'br']}
                    width={Number(width)}
                    height={Number(height)}
                    onHeightChange={setHeight}
                    onWidthChange={setWidth}
                    maxWidth={Number(maxSizeBounds.maxWidth)}
                    maxHeight={Number(maxSizeBounds.maxHeight)}
                  />,
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </MediaQuery>
  );

  return usePortal ? ReactDOM.createPortal(modal, portalContainer) : modal;
}

export default React.memo(Modal);
