import React from 'react';
import classnames from 'classnames';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import chevronUp from 'uxt-graphics/icons/chevron-up';
import chevronLeft from 'uxt-graphics/icons/chevron-left';
import chevronRight from 'uxt-graphics/icons/chevron-right';
import createStyles from '@material-ui/core/styles/createStyles';
import IconButton from '../IconButton';
import makeStyles from '../_helpers/makeStyles';
import Orientation from '../constants/orientation';
import { UxtTheme } from '../../themes/UxtTheme';
import darkTheme from '../../themes/dark';
import useLongPress from '../../hooks/useLongPress';
import type { IconButtonProps } from '../IconButton';

export interface ScrollableContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bottomOrRightIconButtonProps?: Partial<IconButtonProps>;
  children?: React.ReactNode;
  classes?: object;
  orientation?: Orientation;
  scrollAmount?: number;
  topOrLeftIconButtonProps?: Partial<IconButtonProps>;
  enableScroll?: boolean;
  onScroll?: (e: React.UIEvent) => void;
}

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: (props: ScrollableContainerProps) => {
          return props.orientation === Orientation.Vertical ? 'column' : 'row';
        },
      },
      itemsContainer: {
        overflowX: (props: ScrollableContainerProps) => {
          return props.orientation === Orientation.Vertical ? 'hidden' : 'auto';
        },
        overflowY: (props: ScrollableContainerProps) => {
          return props.orientation === Orientation.Vertical ? 'auto' : 'hidden';
        },
        height: (props: ScrollableContainerProps) => {
          return props.orientation === Orientation.Vertical
            ? '100%'
            : 'inherit';
        },
        width: (props: ScrollableContainerProps) => {
          return props.orientation === Orientation.Vertical
            ? 'inherit'
            : '100%';
        },
        '&::-webkit-scrollbar': {
          width: (props: ScrollableContainerProps) => {
            return props.enableScroll ? '0px !important' : theme.spacing(2);
          },
          height: (props: ScrollableContainerProps) => {
            return props.enableScroll ? '0px !important' : theme.spacing(2);
          },
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&::-webkit-scrollbar-thumb': {
          '&:hover': {
            backgroundColor: darkTheme.palette.background.sidebar,
          },
        },
      },
      iconButton: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flex: '1 1 auto',
        height: 'unset',
        borderRadius: 'unset',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: theme.shadows[3],
        width: 'auto',
        '&::after': {
          backgroundColor: 'transparent',
          width: '100%',
          height: '100%',
          borderRadius: 'unset',
          content: '""',
          display: 'block',
          left: '50%',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 100ms ease',
        },
        '&:hover::after': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:active::after': {
          backgroundColor: theme.palette.action.disabled,
        },
      },
    }),
  { name: 'UxtScrollableContainer' },
);

const TOP_OR_LEFT = 'TopOrLeft';
const BOTTOM_OR_RIGHT = 'BottomOrRight';

const ScrollableContainer = React.forwardRef(function ScrollableContainer(
  props: ScrollableContainerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    bottomOrRightIconButtonProps,
    children,
    className,
    classes: classesProp,
    orientation = Orientation.Vertical,
    scrollAmount = 48,
    topOrLeftIconButtonProps,
    enableScroll = false,
    onScroll,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [enableTopOrLeftScroll, setEnableTopOrLeftScroll] =
    React.useState(false);
  const [enableBottomOrRightScroll, setEnableBottomOrRightScroll] =
    React.useState(false);
  const scrollableContent = React.useRef<HTMLDivElement>(null);
  const isTicking = React.useRef<boolean>(false);

  const containerRef = React.useRef();

  const getIconSvg = React.useCallback(
    function getIconSvg(position) {
      return orientation === Orientation.Vertical
        ? position === BOTTOM_OR_RIGHT
          ? chevronDown
          : chevronUp
        : position === BOTTOM_OR_RIGHT
        ? chevronRight
        : chevronLeft;
    },
    [orientation],
  );

  const getReachedBottomOrRight = React.useCallback(
    function getReachedBottomOrRight() {
      const itemsContainer: HTMLDivElement = scrollableContent.current;

      return orientation === Orientation.Vertical
        ? itemsContainer.scrollHeight - Math.round(itemsContainer.scrollTop) ===
            itemsContainer.offsetHeight
        : itemsContainer.scrollWidth - Math.round(itemsContainer.scrollLeft) ===
            itemsContainer.clientWidth;
    },
    [scrollableContent, orientation],
  );

  React.useEffect(() => {
    const itemsContainer = scrollableContent.current;
    const reachedBottomOrRight = getReachedBottomOrRight();

    orientation === Orientation.Vertical
      ? itemsContainer.scrollHeight > itemsContainer.clientHeight &&
        !reachedBottomOrRight
        ? setEnableBottomOrRightScroll(true)
        : setEnableBottomOrRightScroll(false)
      : itemsContainer.scrollWidth > itemsContainer.clientWidth &&
        !reachedBottomOrRight
      ? setEnableBottomOrRightScroll(true)
      : setEnableBottomOrRightScroll(false);
  }, [orientation, scrollableContent, getReachedBottomOrRight]);

  const handleClick = React.useCallback(
    (scrollDirection): void => {
      const itemsContainer: HTMLDivElement = scrollableContent.current;

      if (itemsContainer != null) {
        orientation === Orientation.Vertical
          ? scrollDirection === TOP_OR_LEFT
            ? itemsContainer.scrollBy({
                behavior: 'smooth',
                top: -scrollAmount,
              })
            : itemsContainer.scrollBy({
                behavior: 'smooth',
                top: +scrollAmount,
              })
          : scrollDirection === TOP_OR_LEFT
          ? itemsContainer.scrollBy({ behavior: 'smooth', left: -scrollAmount })
          : itemsContainer.scrollBy({
              behavior: 'smooth',
              left: +scrollAmount,
            });
      }
    },
    [scrollableContent, orientation, scrollAmount],
  );

  const handleRepaint = React.useCallback((): void => {
    const itemsContainer: HTMLDivElement = scrollableContent.current;
    const reachedBottomOrRight: boolean = getReachedBottomOrRight();
    orientation === Orientation.Vertical
      ? (() => {
          if (itemsContainer.scrollTop > 0 && !reachedBottomOrRight) {
            setEnableTopOrLeftScroll(true);
            setEnableBottomOrRightScroll(true);
          } else if (itemsContainer.scrollTop === 0) {
            setEnableTopOrLeftScroll(false);
          } else if (itemsContainer.scrollTop > 0 && reachedBottomOrRight) {
            setEnableTopOrLeftScroll(true);
            setEnableBottomOrRightScroll(false);
          }
        })()
      : (() => {
          if (itemsContainer.scrollLeft > 0 && !reachedBottomOrRight) {
            setEnableTopOrLeftScroll(true);
            setEnableBottomOrRightScroll(true);
          } else if (itemsContainer.scrollLeft === 0)
            setEnableTopOrLeftScroll(false);
          else if (itemsContainer.scrollLeft > 0 && reachedBottomOrRight) {
            setEnableTopOrLeftScroll(true);
            setEnableBottomOrRightScroll(false);
          }
        })();
  }, [scrollableContent, orientation, getReachedBottomOrRight]);

  const handleScroll = React.useCallback(
    (e: React.UIEvent): void => {
      // Needed to optimize scrolling. Based on MDN Docs, it is not good to perform DOM manipulation
      // or any other computations in the scroll event handler directly and wait for the next repaint.
      if (!isTicking.current) {
        window.requestAnimationFrame(() => {
          handleRepaint();
          isTicking.current = false;
        });
      }
      isTicking.current = true;
      if (onScroll) onScroll(e);
    },
    [onScroll, handleRepaint],
  );

  // const scrollToElement = React.useCallback((element: Element) => {
  //   rootRef.current.scrollIntoView(element);
  // }, []);

  const handleLongPress = React.useCallback(
    (scrollDirection): void => {
      const itemsContainer: HTMLElement = scrollableContent.current;
      const longPressScrollAmount: number = scrollAmount * 4;

      orientation === Orientation.Vertical
        ? (() => {
            const availableBottomScrollAmount: number =
              itemsContainer.scrollHeight -
              itemsContainer.scrollTop -
              itemsContainer.clientHeight;

            scrollDirection === TOP_OR_LEFT
              ? itemsContainer.scrollBy({
                  top:
                    itemsContainer.scrollTop - longPressScrollAmount > 40
                      ? -longPressScrollAmount
                      : -(itemsContainer.scrollTop - 40),
                  behavior: 'smooth',
                })
              : itemsContainer.scrollBy({
                  top:
                    availableBottomScrollAmount > 40
                      ? longPressScrollAmount
                      : availableBottomScrollAmount - 40,
                  behavior: 'smooth',
                });
          })()
        : (() => {
            const availableRightScrollAmount: number =
              itemsContainer.scrollWidth -
              itemsContainer.scrollLeft -
              itemsContainer.clientWidth;

            scrollDirection === TOP_OR_LEFT
              ? itemsContainer.scrollBy({
                  left:
                    itemsContainer.scrollLeft - longPressScrollAmount > 40
                      ? -longPressScrollAmount
                      : -(itemsContainer.scrollLeft - 40),
                  behavior: 'smooth',
                })
              : itemsContainer.scrollBy({
                  left:
                    availableRightScrollAmount > 40
                      ? longPressScrollAmount
                      : availableRightScrollAmount - 40,
                  behavior: 'smooth',
                });
          })();
    },
    [scrollableContent, orientation, scrollAmount],
  );

  const handleTopOrLeftEvents = useLongPress(
    () => handleClick(TOP_OR_LEFT),
    () => handleLongPress(TOP_OR_LEFT),
    200,
    300,
  );
  const handleBottomOrRightEvents = useLongPress(
    () => handleClick(BOTTOM_OR_RIGHT),
    () => handleLongPress(BOTTOM_OR_RIGHT),
    200,
    300,
  );

  return (
    <div className={classnames(classes.root, className)} ref={containerRef}>
      {enableTopOrLeftScroll && enableScroll && (
        <IconButton
          iconSvg={getIconSvg(TOP_OR_LEFT)}
          className={classes.iconButton}
          {...handleTopOrLeftEvents}
          {...topOrLeftIconButtonProps}
        />
      )}
      <div
        ref={scrollableContent}
        className={classes.itemsContainer}
        onScroll={handleScroll}
        {...rest}
      >
        {children}
      </div>
      {enableBottomOrRightScroll && enableScroll && (
        <IconButton
          iconSvg={getIconSvg(BOTTOM_OR_RIGHT)}
          className={classes.iconButton}
          {...handleBottomOrRightEvents}
          {...bottomOrRightIconButtonProps}
        />
      )}
    </div>
  );
});

export default React.memo(ScrollableContainer);
