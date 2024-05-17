import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Graphic from '../Graphic';
import useCombinedRefs from '../../hooks/useCombinedRefs';

function getHeadLineFontSize(
  { size }: EmptyStateProps,
  theme: UxtTheme,
): React.CSSProperties['fontSize'] {
  switch (size) {
    case 'small':
      return theme.typography.subtitle1.fontSize;
    case 'large':
      return theme.typography.h5.fontSize;
    case 'regular':
    default:
      return theme.typography.h6.fontSize;
  }
}

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 480,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
      graphic: {
        marginBottom: theme.spacing(1),
      },
      headline: {
        ...theme.typography.h5,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1),
        textAlign: 'center',
        fontSize: (props: EmptyStateProps) => getHeadLineFontSize(props, theme),
      },
      subheader: {
        color: theme.palette.text.hint,
        textAlign: 'center',
        fontSize: (props: EmptyStateProps) =>
          props.size === 'small'
            ? theme.typography.subtitle2.fontSize
            : theme.typography.subtitle1.fontSize,
        maxWidth: (props: EmptyStateProps) => props.subheaderMaxWidth || 'none',
      },
      extras: {},
    }),
  { name: 'UxtEmptyState' },
);

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  graphicSvg?: string;
  headline?: string;
  subheaderMaxWidth?: React.CSSProperties['width'];
  size?: 'small' | 'regular' | 'large' | 'extraLarge';
  style?: React.CSSProperties;
  subheader?: string;
}

const EmptyState = React.forwardRef(function EmptyState(
  props: EmptyStateProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    graphicSvg,
    headline,
    subheaderMaxWidth,
    size = 'extraLarge',
    style = {},
    subheader,
    ...rest
  } = props;
  const classes = useStyles(props);
  const outerRef = React.useRef<HTMLDivElement>(undefined);
  const [widthAndHeight, setWidthAndHeight] = React.useState<{
    width: number;
    height: number;
  }>({ width: undefined, height: undefined });
  const rootRef = useCombinedRefs<HTMLDivElement>(ref, outerRef);

  const getGraphicsStyle = React.useCallback(
    (
      width: number,
    ): {
      width: number;
      height: number;
    } => {
      if (size === 'large') return { height: 120, width: 120 };
      if (size === 'regular') return { height: 96, width: 96 };
      if (size === 'small') return { height: 64, width: 64 };
      if (width <= 768) {
        return { height: 128, width: 128 };
      }
      return { height: 160, width: 160 };
    },
    [size],
  );

  React.useEffect(() => {
    const resizeObserver: ResizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          for (let entry of entries) {
            if (
              entry.target === outerRef.current &&
              widthAndHeight.width !== entry.target.clientWidth
            ) {
              setWidthAndHeight(getGraphicsStyle(entry.target.clientWidth));
              break;
            }
          }
        });
      },
    );

    resizeObserver.observe(outerRef.current);

    return () => {
      if (resizeObserver) {
        resizeObserver.unobserve(outerRef.current);
        resizeObserver.disconnect();
      }
    };
  }, [getGraphicsStyle]);

  return (
    <div
      className={classnames(classes.root, className)}
      ref={rootRef}
      style={style}
      {...rest}
    >
      <div className={classes.content}>
        {showIf(graphicSvg)(
          <Graphic
            className={classes.graphic}
            style={{
              width: widthAndHeight.width,
              height: widthAndHeight.height,
            }}
            svg={graphicSvg}
          />,
        )}
        <div className={classes.headline}>{headline}</div>
        <div className={classes.subheader}>{subheader}</div>
        <div className={classes.extras}>{children}</div>
      </div>
    </div>
  );
});

export default React.memo(EmptyState);
