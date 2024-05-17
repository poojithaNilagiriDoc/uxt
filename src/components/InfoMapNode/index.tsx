import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import { transparentize } from 'polished';
import Color from 'color';
import properties from 'uxt-graphics/icons/properties';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import IconButton from '../IconButton';
import Icon from '../Icon';
import type { IconButtonProps } from '../IconButton';
import showIf from '../_helpers/showIf';
import Shape from '../constants/shape';
import OverflowButton from '../OverflowButton';
import { NodeType } from '../InfoMap';
import getColor from '../_helpers/getColor';
import type { MenuItem as MenuItemType } from '../MenuItem';

const ORIGIN_NODE_ICON_SIZE = 32;
const VISITED_NODE_ICON_SIZE = 28;
const DEFAULT_NODE_ICON_SIZE = 24;

const shapesArray = Object.values(Shape);
export type NodeShape = typeof shapesArray[number];

export interface Item {
  [key: string]: any;
}

export interface InfoMapNodeProps
  extends Omit<React.SVGAttributes<SVGElement>, 'id' | 'radius'> {
  borderColor?: React.CSSProperties['borderColor'];
  children?: React.ReactNode;
  classes?: Record<string, string>;
  className?: string;
  color?: string;
  dataId?: string;
  propertiesIconButtonProps?: Partial<IconButtonProps>;
  graphRef?: React.RefObject<SVGSVGElement>;
  iconSvg?: string;
  id?: React.ReactText;
  idAccessor?: string | ((item: Item) => string);
  item?: Item;
  isClustered?: boolean;
  isCurrent?: boolean;
  isCurrentNodeNeighbor?: boolean;
  isLoading?: boolean;
  isSelected?: boolean;
  isVisited?: boolean;
  labelContent?: React.ReactNode | ((node: NodeType) => React.ReactNode);
  name?: string;
  onClick?: (e: React.MouseEvent) => void;
  onPropertiesClick?: (
    node: NodeType,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
  overflowIconButtonProps?: Partial<IconButtonProps>;
  onOverflowClick?: (
    node: NodeType,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
  overflowItems?: Array<MenuItemType>;
  shape?: NodeShape;
  radius?: number;
  renderLabel?: boolean;
  showNodeOptions?: boolean;
  toolTip?: (n: NodeType) => string;
  type?: string;
}

const getCircleSize = (
  isCurrent: boolean,
  isVisited?: boolean,
  isSelected?: boolean,
  radius?: number,
): number => {
  if (isCurrent) return Math.ceil(radius * 2.4);

  if (isVisited || isSelected) return Math.ceil(radius * 1.72);

  return Math.ceil(radius * 1.16);
};

const getBackgroundColor = (color: string): string =>
  Color(getColor(color)).rgb().array();

const getNodeHeight = ({
  isCurrent,
  shape,
  radius,
  isSelected,
}: InfoMapNodeProps): number =>
  Math.ceil(
    isCurrent
      ? radius * 4
      : isSelected
      ? radius * 3
      : shape === Shape.Rectangle
      ? 56
      : radius * 2.6,
  );

const getNodeWidth = ({
  isCurrent,
  isVisited,
  isSelected,
  radius,
  shape,
}: InfoMapNodeProps): number =>
  Math.ceil(
    isCurrent
      ? radius * 4
      : isSelected && shape !== Shape.Rectangle
      ? radius * 3
      : isVisited
      ? radius * 2.5
      : radius * 2.5,
  );

const getInnerCircleBorderRadius = ({
  isCurrent,
  isVisited,
  isSelected,
  isCurrentNodeNeighbor,
}: InfoMapNodeProps): React.CSSProperties['borderRadius'] =>
  isCurrent || isSelected
    ? '50%'
    : isVisited
    ? 40
    : isCurrentNodeNeighbor
    ? 32
    : 40;

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        position: 'relative',
        width: (props: InfoMapNodeProps) => getNodeWidth(props),
        height: (props: InfoMapNodeProps) =>
          getNodeHeight(props) + theme.spacing(props.isSelected ? 2 : 0),
        filter: `drop-shadow(1px 1px 1px ${transparentize(
          0.8,
          theme.palette.common.black,
        )})`,
        color: (props: InfoMapNodeProps) =>
          !props.fill
            ? theme.palette.text.primary
            : theme.palette.getContrastText(props.fill),
      },
      iconButton: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: theme.spacing(2),
        backgroundColor: ({ shape }: InfoMapNodeProps) =>
          shape === Shape.Rectangle
            ? 'transparent'
            : theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelContent: {
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(0.5),
        fontSize: theme.typography.caption.fontSize,
        padding: theme.spacing(0.5),
        wordBreak: 'break-all',
        width: 100, //125,
        margin: 'auto',
        marginTop: theme.spacing(0.5),
        //TODO: Nee to revisit again
        maxHeight: theme.height.toolbar,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          background: theme.palette.background.default,
        },
      },
      rectangle: {
        borderRadius: theme.shape.borderRadius,
        border: ({ borderColor }: InfoMapNodeProps) =>
          `1px solid ${borderColor || theme.palette.divider}`,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        fontSize: theme.typography.caption.fontSize,
        display: 'flex',
        alignItems: 'center',
        height: theme.spacing(5),
        paddingRight: theme.spacing(1),
        marginTop: theme.spacing(1.5),
        cursor: 'pointer',
        '&:hover': {
          background: theme.palette.background.default,
        },
        '&:active': {
          background: theme.palette.background.default,
        },
      },
      rectangleContent: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      popperContent: {
        ...theme.mixins.absoluteFill,
        display: 'flex',
        alignItems: 'center',
        justifyContent: ({ overflowItems }: InfoMapNodeProps) =>
          overflowItems?.length > 0 ? 'space-around' : 'flex-end',
        bottom: 'auto',
        top: theme.spacing(0.5),
        zIndex: 1,
        transition: 'transform 500ms ease',
        right: ({ overflowItems }: InfoMapNodeProps) =>
          overflowItems?.length > 0 ? 0 : theme.spacing(2),
      },
      overflowButton: {
        marginLeft: theme.spacing(4),
      },
      outerCircle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: ({ radius }: InfoMapNodeProps) => Math.ceil(radius * 3.2),
        height: ({ radius }: InfoMapNodeProps) => Math.ceil(radius * 3.2),
        background: ({ color }: InfoMapNodeProps) =>
          color
            ? `rgba(${getBackgroundColor(color)},0.20)`
            : `rgba(${getBackgroundColor(
                theme.palette.background.topbar,
              )},0.2)`,
        margin: 'auto',
        cursor: 'pointer',
      },
      innerCircle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (props: InfoMapNodeProps) =>
          getInnerCircleBorderRadius(props),
        width: ({
          isCurrent,
          isVisited,
          isSelected,
          radius,
        }: InfoMapNodeProps) =>
          Math.ceil(
            isCurrent
              ? radius * 2.72
              : isVisited
              ? radius * 1.75
              : isSelected
              ? radius * 2
              : radius * 1.4,
          ),
        height: ({
          isCurrent,
          isVisited,
          isSelected,
          radius,
        }: InfoMapNodeProps) =>
          Math.ceil(
            isCurrent
              ? radius * 2.72
              : isVisited
              ? radius * 1.75
              : isSelected
              ? radius * 2
              : radius * 1.4,
          ),
        background: ({ color, isCurrent }: InfoMapNodeProps) =>
          color
            ? `rgba(${getBackgroundColor(color)},0.24)`
            : isCurrent
            ? `rgba(${getBackgroundColor(
                theme.palette.background.topbar,
              )},0.24)`
            : `rgba(${getBackgroundColor(theme.palette.common.black)},0.14)`,
        margin: 'auto',
        cursor: 'pointer',
      },
      circle: {
        marginTop: ({
          isCurrent,
          isVisited,
          isSelected,
          isCurrentNodeNeighbor,
        }: InfoMapNodeProps) =>
          isCurrent || isVisited || isSelected || isCurrentNodeNeighbor
            ? 'auto'
            : 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ({
          isCurrent,
          isVisited,
          isSelected,
        }: InfoMapNodeProps) =>
          !isCurrent && (isVisited || isSelected)
            ? theme.spacing(5)
            : isCurrent
            ? '50%'
            : theme.spacing(3) + 3,
        width: ({
          isCurrent,
          isVisited,
          isSelected,
          radius,
        }: InfoMapNodeProps) =>
          getCircleSize(isCurrent, isVisited, isSelected, radius),
        height: ({
          isCurrent,
          isVisited,
          isSelected,
          radius,
        }: InfoMapNodeProps) =>
          getCircleSize(isCurrent, isVisited, isSelected, radius),
        background: ({ color }: InfoMapNodeProps) =>
          color ? color : theme.palette.background.paper,
        fill: ({ color, isCurrent }: InfoMapNodeProps) =>
          color
            ? theme.palette.common.white
            : isCurrent
            ? theme.palette.background.topbar
            : 'inherit',
        margin: 'auto',
        border: ({
          color,
          isCurrent,
          isCurrentNodeNeighbor,
        }: InfoMapNodeProps) =>
          !(color || isCurrentNodeNeighbor)
            ? `1px solid ${
                isCurrent
                  ? theme.palette.background.topbar
                  : theme.palette.divider
              }`
            : '',
        cursor: 'pointer',
        '&:hover': {
          '& $layer': {
            display: 'flex',
          },
        },
        '&:active': {
          border: ({ color }: InfoMapNodeProps) =>
            color ? '' : `1px solid ${theme.palette.background.topbar}`,
          '& $layer': {
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.04)',
          },
        },
        '&::after': {
          position: 'absolute',
          content: "'  '",
          width: ({
            isCurrent,
            isVisited,
            isSelected,
            radius,
          }: InfoMapNodeProps) =>
            getCircleSize(isCurrent, isVisited, isSelected, radius) + 2,
          height: ({
            isCurrent,
            isVisited,
            isSelected,
            radius,
          }: InfoMapNodeProps) =>
            getCircleSize(isCurrent, isVisited, isSelected, radius) + 2,
          border: ({ isLoading, color }: InfoMapNodeProps) =>
            isLoading
              ? `3px dashed ${
                  color
                    ? theme.palette.common.white
                    : theme.palette.background.topbar
                }`
              : '',
          borderRadius: 'inherit',
          animation: '$spin 10s linear infinite',
          animationPlayState: ({ isLoading }: InfoMapNodeProps) =>
            !isLoading ? 'paused' : 'unset',
        },
      },
      '@keyframes spin': {
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      selected: {
        border: `2px solid ${theme.palette.background.topbar}`,
      },
      selectedCircle: {
        width: (props: InfoMapNodeProps) =>
          props.isCurrent ? props.radius * 2.1 : props.radius * 1.5,
        height: (props: InfoMapNodeProps) =>
          props.isCurrent ? props.radius * 2.1 : props.radius * 1.5,
        borderRadius: ({ isCurrent }: InfoMapNodeProps) =>
          isCurrent ? '50%' : 35,
        border: ({ color }: InfoMapNodeProps) =>
          `3px solid ${
            color ? theme.palette.common.white : theme.palette.background.topbar
          }`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      rectangularNodeSelected: {
        background: theme.palette.hexagon.deepBlue[3],
      },
      layer: {
        background: 'rgba(0, 0, 0, 0.24)',
        borderRadius: ({
          isCurrent,
          isVisited,
          isSelected,
        }: InfoMapNodeProps) =>
          !isCurrent && (isVisited || isSelected)
            ? theme.spacing(5)
            : isCurrent
            ? '50%'
            : theme.spacing(3) + 3,
        width: ({
          isCurrent,
          isVisited,
          isSelected,
          radius,
        }: InfoMapNodeProps) =>
          getCircleSize(isCurrent, isVisited, isSelected, radius),
        height: ({
          isCurrent,
          isVisited,
          isSelected,
          radius,
        }: InfoMapNodeProps) =>
          getCircleSize(isCurrent, isVisited, isSelected, radius),
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      },
    }),
  { name: 'UxtInfoMapNode' },
);

const InfoMapNode = React.forwardRef<SVGForeignObjectElement, InfoMapNodeProps>(
  (props: InfoMapNodeProps, ref: React.Ref<SVGForeignObjectElement>) => {
    const {
      borderColor,
      children,
      className,
      dataId,
      radius,
      shape = Shape.Circle,
      item = {},
      idAccessor = 'id',
      id = safeGet('', idAccessor, item),
      name,
      onClick,
      onMouseOver,
      onMouseOut,
      overflowItems,
      x,
      y,
      graphRef,
      labelContent,
      onPropertiesClick,
      onOverflowClick,
      iconSvg,
      isCurrent = false,
      propertiesIconButtonProps,
      overflowIconButtonProps,
      renderLabel = false,
      isLoading = false,
      isCurrentNodeNeighbor = false,
      isVisited = false,
      isSelected = false,
      isClustered,
      showNodeOptions = true,
      toolTip,
      type,
      ...rest
    } = props;

    const classes = useStyles(props);
    const childContainerRef = React.useRef<HTMLDivElement>(undefined);
    const [showActionsContainer, setShowActionsContainer] =
      React.useState<boolean>(false);

    const handleClick = React.useCallback(
      (e: React.MouseEvent): void => onClick?.(e),
      [onClick],
    );

    const iconSize = React.useMemo(
      () =>
        isCurrent
          ? ORIGIN_NODE_ICON_SIZE
          : isVisited
          ? VISITED_NODE_ICON_SIZE
          : DEFAULT_NODE_ICON_SIZE,
      [isCurrent, isVisited],
    );

    const handleNodePropertiesClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        onPropertiesClick?.(item, e);
      },
      [onPropertiesClick],
    );

    return (
      <foreignObject
        id={id}
        x={x}
        y={y}
        ref={ref}
        className={classnames(classes.root, className)}
        onClick={handleClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        data-id={dataId}
        onMouseLeave={() => setShowActionsContainer(false)}
        {...rest}
      >
        {children}
        {showIf(!children && shape === Shape.Circle)(
          <>
            {showIf(
              showNodeOptions && showActionsContainer && !item.isClustered,
            )(() => (
              <div className={classes.popperContent}>
                <IconButton
                  iconSvg={properties}
                  size="small"
                  classes={{ root: classes.iconButton }}
                  onClick={handleNodePropertiesClick}
                  {...propertiesIconButtonProps}
                />
                {showIf(overflowItems?.length > 0)(
                  <OverflowButton
                    items={overflowItems}
                    className={classes.overflowButton}
                    classes={{ root: classes.iconButton }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                      onOverflowClick?.(item, e)
                    }
                    overflowIconButtonProps={overflowIconButtonProps}
                  />,
                )}
              </div>
            ))}
            <div
              data-id={`outer-element-${dataId}`}
              title={safeGet(id, toolTip, item)}
              className={classnames({
                [classes.outerCircle]: isCurrent,
              })}
              onMouseEnter={() => isCurrent && setShowActionsContainer(true)}
              ref={childContainerRef}
            >
              <div
                className={classnames({
                  [classes.innerCircle]: isCurrent || isCurrentNodeNeighbor,
                })}
                onMouseEnter={() => !isCurrent && setShowActionsContainer(true)}
              >
                <div
                  className={classes.circle}
                  onMouseEnter={() =>
                    !(isCurrent && isCurrentNodeNeighbor) &&
                    setShowActionsContainer(true)
                  }
                >
                  <div className={classes.layer}></div>
                  <div
                    className={classnames({
                      [classes.selectedCircle]: !isLoading && isSelected,
                    })}
                  >
                    {showIf(iconSvg)(<Icon svg={iconSvg} size={iconSize} />)}
                  </div>
                </div>
              </div>
            </div>
            {showIf(renderLabel && labelContent)(
              <div
                className={classnames(
                  { [classes.selected]: isSelected },
                  classes.labelContent,
                )}
                onMouseLeave={() =>
                  showActionsContainer && setShowActionsContainer(false)
                }
                onMouseEnter={() =>
                  !showActionsContainer && setShowActionsContainer(true)
                }
              >
                {labelContent}
              </div>,
            )}
          </>,
        )}
        {showIf(!children && shape === Shape.Rectangle)(
          <div
            data-id={`outer-element-${dataId}`}
            className={classnames(
              { [classes.rectangularNodeSelected]: isSelected },
              classes.rectangle,
              className,
            )}
            title={safeGet(id, toolTip, item)}
          >
            {showIf(iconSvg)(
              <Icon
                size={24}
                svg={iconSvg}
                classes={{ root: classes.iconButton }}
              />,
            )}
            <span className={classes.rectangleContent}>{labelContent}</span>
          </div>,
        )}
      </foreignObject>
    );
  },
);

export default React.memo(InfoMapNode);
