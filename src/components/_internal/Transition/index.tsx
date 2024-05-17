import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      },
      currentPage: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        minHeight: '100%',
      },
      nextPage: {
        ...theme.mixins.absoluteFill,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'none',
      },
      nextPageMouseBlocker: {
        ...theme.mixins.absoluteFill,
        pointerEvents: 'all',
      },
    }),
  { name: 'UxtTransition' },
);

export interface TransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  duration?: number;
  getPage?: (options: {
    goBack?: (payload: any) => void;
    goForward?: (payload: any) => void;
    reset?: () => void;
    payload: { [key: string]: any };
  }) => React.ReactNode;
  getStyle?: (options: {
    payload: { [key: string]: any };
  }) => React.CSSProperties;
  initialPayload: { [key: string]: any };
}

export interface TransitionMethods {
  goBack: (nextPayload: { [key: string]: any }) => void;
  goForward: (nextPayload: { [key: string]: any }) => void;
  reset: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps,
  ref: React.Ref<TransitionMethods>,
) {
  const {
    className,
    classes: classesProp,
    duration,
    getPage = () => null,
    getStyle = () => ({}),
    initialPayload,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [payload, setPayload] = React.useState(initialPayload);

  const handlePageTransition = React.useCallback(function handlePageTransition(
    type,
    nextPayload,
  ) {
    setPayload(nextPayload);

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);
  },
  []);

  const page = React.useMemo(
    () =>
      getPage({
        goBack: (nextPayload = {}) => {
          handlePageTransition('back', nextPayload);
        },
        goForward: (nextPayload = {}) => {
          handlePageTransition('forward', nextPayload);
        },
        reset: () => {
          setPayload(initialPayload);
        },
        payload,
      }),
    [getPage, handlePageTransition, initialPayload, payload],
  );

  const style = React.useMemo(() => getStyle({ payload }), [getStyle, payload]);

  React.useImperativeHandle(
    ref,
    () => ({
      goBack: nextPayload => {
        handlePageTransition('back', nextPayload);
      },
      goForward: nextPayload => {
        handlePageTransition('forward', nextPayload);
      },
      reset: () => {
        setPayload(initialPayload);
      },
    }),
    [handlePageTransition, initialPayload],
  );

  return (
    <div
      className={classnames(classes.root, className)}
      style={style}
      {...rest}
    >
      <div className={classes.currentPage}>{page}</div>
    </div>
  );
});

export default React.memo(Transition);
