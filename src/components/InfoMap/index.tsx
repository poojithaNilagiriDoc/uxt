import createStyles from '@material-ui/core/styles/createStyles';
import classnames from 'classnames';
import Color from 'color';
import * as d3 from 'd3';
import uniqBy from 'lodash/fp/uniqBy';
import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import find from 'lodash/fp/find';
import { transparentize } from 'polished';
import React from 'react';
import { AutoSizer } from 'react-virtualized';
import expand from 'uxt-graphics/icons/expand';
import followMode from 'uxt-graphics/icons/follow-mode';
import showIndirect from 'uxt-graphics/icons/indirect-relationships';
import clearHistory from 'uxt-graphics/icons/pending';
import redo from 'uxt-graphics/icons/redo';
import reset from 'uxt-graphics/icons/reset';
import showNodeNames from 'uxt-graphics/icons/show-node-labels';
import undo from 'uxt-graphics/icons/undo';
import DialogService from '../../services/DialogService';
import { UxtTheme } from '../../themes/UxtTheme';
import Backdrop from '../Backdrop';
import Shape from '../constants/shape';
import IconButton from '../IconButton';
import InfoMapLink from '../InfoMapLink';
import InfoMapNode from '../InfoMapNode';
import type { MenuItem as MenuItemType } from '../MenuItem';
import RibbonBarTooltip from '../RibbonBarTooltip';
import Spinner from '../Spinner';
import ToggleIconButton from '../ToggleIconButton';
import Toolbar from '../Toolbar';
import getColor from '../_helpers/getColor';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import showIf from '../_helpers/showIf';
import withoutBy from '../_helpers/withoutBy';

const LINK_CLASS_NAME = 'link';
const LINKS_CONTAINER_ID = 'linksContainer';
const NODES_CONTAINER_ID = 'nodesContainer';
const GRAPH_ELEMENT_ID = 'svgChild';
const LINK_PATH_DATA = 'M2,2 L2,11 L10,6 L2,2';
const MARKER_ID = 'arrowHead';
const MARKER_SIZE = 13;
const MARKER_X_COORDINATE = 2;
const MARKER_Y_COORDINATE = 6.5;
const MARKER_ORIENT_TYPE = 'auto';
const MAP_TRANSITION_DURATION = 400;
const centerX = -100;
const centerY = -100;
const defaultLinkConfig = {
  linkIdAccessor: 'id',
  strokeWidth: 2,
  strokeDasharray: 10,
  strokeDashoffset: 10,
  traversePathStrokeWidth: 4,
};
const defaultNodeConfig = {
  nodeIdAccessor: 'id',
  isLoading: false,
  showNodeLabels: true,
};

const shapesArray = Object.values(Shape);
export type NodeShape = typeof shapesArray[number];

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      },
      header: {
        width: '100%',
        minHeight: theme.height.toolbar,
        display: 'flex',
        alignItems: 'center',
        padding: `0px ${theme.spacing(2)}px`,
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        ...theme.typography.body1,
      },
      footer: {
        width: '100%',
        minHeight: theme.height.toolbar,
        display: 'flex',
        alignSelf: 'flex-end',
        alignItems: 'center',
        padding: `0px ${theme.spacing(2)}px`,
        background: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: `0px -1px 2px ${transparentize(
          0.8,
          theme.palette.common.black,
        )}`,
        ...theme.typography.body1,
      },
      toolbar: {
        boxShadow: `0px 1px 2px ${transparentize(
          0.8,
          theme.palette.common.black,
        )}`,
      },
      graphContainer: {
        width: '100%',
        height: '100%',
        background: theme.palette.background.default,
      },
      nodesContainer: {},
      linksContainer: {},
      graphElement: {
        width: '100%',
        height: '100%',
      },
      linkPath: {
        fill: theme.palette.primary.main,
      },
    }),
  {
    name: 'UxtInfoMap',
  },
);

interface Item {
  [key: string]: any;
}

export interface NodeType extends SimulationNodeDatum {
  borderColor?: React.CSSProperties['borderColor'];
  className?: string;
  classes?: Record<string, string>;
  color?: string;
  dataId?: string | ((node: NodeType) => string);
  getShowNodeOptions?: (node: NodeType) => boolean;
  iconSvg?: string;
  id?: React.ReactText;
  isClustered?: boolean;
  isCurrent?: boolean;
  isCurrentNodeNeighbor?: boolean;
  isLoading?: boolean;
  isSelected?: boolean;
  isVisited?: boolean;
  labelContent?: (node: NodeType) => React.ReactNode;
  name?: string;
  nodeChildren?: (node: NodeType) => React.ReactNode;
  nodeIdAccessor?: string | ((node: NodeType) => string);
  nodeToolTip?: (node: NodeType) => string;
  onNodePropertiesClick?: (
    node: NodeType,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
  onNodeMouseOver?: (
    node: NodeType,
    e: React.MouseEvent<SVGForeignObjectElement>,
  ) => void;
  onNodeMouseOut?: (
    node: NodeType,
    e: React.MouseEvent<SVGForeignObjectElement>,
  ) => void;
  onNodeOverflowClick?: (
    node: NodeType,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
  overflowItems?: (node: NodeType) => Array<MenuItemType>;
  radius?: number;
  shape?: NodeShape;
  showNodeLabels?: boolean;
  type?: string;
}

export interface LinkType<N extends NodeType> extends SimulationLinkDatum<N> {
  dataId?: string | ((link: LinkType<NodeType>) => string);
  id?: React.ReactText;
  isIndirectLink?: boolean;
  isVisitedLink?: boolean;
  linkIdAccessor?: string | (() => string);
  onLinkClick?: (event: React.MouseEvent<SVGPathElement>) => {};
  showArrowHead?: boolean;
  stroke?: React.CSSProperties['stroke'];
  strokeDasharray?: React.CSSProperties['strokeDasharray'];
  strokeDashoffset?: React.CSSProperties['strokeDashoffset'];
  strokeHighlight?: React.CSSProperties['stroke'];
  strokeLinecap?: React.CSSProperties['strokeLinecap'];
  strokeWidth?: React.CSSProperties['strokeWidth'];
  traversePathStrokeWidth?: React.CSSProperties['strokeWidth'];
  traversePath?: boolean;
}

export interface Data<N extends NodeType, L extends LinkType<N>> {
  nodes?: Array<N>;
  links?: Array<L>;
}

interface InfoMapProps<N extends NodeType, L extends LinkType<N>>
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: Record<string, string>;
  clearHistoryConfirmDialogCancelText?: string;
  clearHistoryConfirmDialogMessage?: string;
  clearHistoryConfirmDialogSubmitText?: string;
  clearHistoryConfirmDialogTitleText?: string;
  clearHistoryTooltipText?: string;
  header?: React.ReactNode;
  hideNodeLabelsTooltipText?: string;
  fetchingNodeData?: boolean;
  fitToViewTooltipText?: string;
  followModeTooltipText?: string;
  footer?: React.ReactNode;
  data?: Data<N, L>;
  indirectRelationshipsTooltipText?: string;
  clusteredAccessor?: string | ((node: NodeType) => string);
  isLoading?: boolean;
  linkConfig?: LinkType<NodeType>;
  loadingMessage?: React.ReactNode;
  minZoom?: number;
  maxZoom?: number;
  onClearHistory?: (data: Data<N, L>) => void;
  onFitToView?: () => void;
  onGraphClick?: () => void;
  onHistoryChange?: (history: N[]) => void;
  onIndirectRelationships?: (
    isActive: boolean,
    currentNodeId: React.ReactText,
  ) => Data<N, L>;
  onRedoClick?: (node: N) => void;
  onResetNodePositions?: () => void;
  onToggleFollowMode?: () => void;
  onToggleNodeNames?: (renderLabel?: boolean) => void;
  onUndoClick?: (node: N) => void;
  nodeComponent?: React.ForwardRefRenderFunction<SVGForeignObjectElement, Item>;
  nodeConfig?: NodeType;
  linkComponent?: React.ForwardRefRenderFunction<SVGPathElement, Item>;
  onNodeClick?: (
    item: Item,
    e: React.MouseEvent<SVGForeignObjectElement>,
  ) => void | JSX.Element;
  redoTooltipText?: string;
  resetNodePositionsTooltipText?: string;
  showToolbar?: boolean;
  toolbarContent?: React.ReactNode | (() => React.ReactNode);
  undoTooltipText?: string;
}

export interface InfoMapMethods {
  addNodeToHistory?: (node: NodeType) => void;
  addSelectedNode?: (node: NodeType) => void;
  getGraphHistory?: () => Array<NodeType>;
  removeNodeFromHistory?: (node: NodeType) => void;
  removeSelectedNode?: (node: NodeType) => void;
  rootElement?: () => React.MutableRefObject<HTMLDivElement>;
}

const InfoMap = React.forwardRef(
  <N extends NodeType, L extends LinkType<N>>(
    props: InfoMapProps<N, L>,
    ref: React.Ref<InfoMapMethods>,
  ) => {
    const {
      className,
      clearHistoryConfirmDialogCancelText = 'Cancel',
      clearHistoryConfirmDialogMessage = 'Are you sure want to delete history?',
      clearHistoryConfirmDialogSubmitText = 'Ok',
      clearHistoryConfirmDialogTitleText = 'Delete history',
      clearHistoryTooltipText = 'Clear history',
      header,
      fetchingNodeData = false,
      fitToViewTooltipText = 'Fit to view',
      followModeTooltipText = 'Toggle follow mode',
      footer,
      hideNodeLabelsTooltipText = 'Toggle node labels',
      indirectRelationshipsTooltipText = 'Show indirect relationship',
      clusteredAccessor = 'isClustered',
      isLoading = false,
      loadingMessage = 'Loading',
      nodeComponent: NodeComponent = InfoMapNode,
      linkComponent: LinkComponent = InfoMapLink,
      onClearHistory,
      onFitToView,
      onGraphClick,
      onHistoryChange,
      onToggleNodeNames,
      onIndirectRelationships,
      onRedoClick,
      onUndoClick,
      onResetNodePositions,
      onNodeClick,
      onToggleFollowMode,
      data = { nodes: [], links: [] },
      redoTooltipText = 'Redo',
      resetNodePositionsTooltipText = 'Reset node position',
      showToolbar = true,
      toolbarContent,
      undoTooltipText = 'Undo',
      nodeConfig = {},
      linkConfig = {} as LinkType<NodeType>,
      minZoom = 0.1,
      maxZoom = 8,
      ...rest
    } = props;

    const classes = useStyles(props);
    const graphRef = React.useRef<SVGSVGElement>(undefined);
    const currentClickedNode = React.useRef<N>(undefined);
    const [isIndirectRelationshipsActive, setIsIndirectRelationshipsActive] =
      React.useState<boolean>(false);
    const [isFollowModeActive, setIsFollowModeActive] =
      React.useState<boolean>(true);
    const [history, setHistory] = React.useState<Array<N>>([]);
    const [currentNodeIndex, setCurrentNodeIndex] = React.useState<number>(-1);
    const [renderLabel, setRenderLabel] = React.useState<boolean>(
      {
        ...defaultNodeConfig,
        ...nodeConfig,
      }.showNodeLabels,
    );
    const [graphData, setGraphData] = React.useState<Data<N, L>>(data);
    const [simulation, setSimulation] =
      React.useState<d3.Simulation<d3.SimulationNodeDatum, undefined>>();
    const visibleClusteredChildren = React.useRef<Map<string, L[]>>(
      new Map<string, L[]>(),
    );
    const clusterNodePaths = React.useRef<Set<L>>(new Set<L>());
    const rootElement: React.MutableRefObject<HTMLDivElement> =
      React.useRef(null);
    const zoom: React.MutableRefObject<d3.ZoomBehavior<Element, unknown>> =
      React.useRef(null);
    const linkConfigRef: React.MutableRefObject<LinkType<NodeType>> =
      React.useRef(null);
    const nodeConfigRef: React.MutableRefObject<NodeType> = React.useRef(null);

    const groupedLinks = React.useMemo(
      (): Object =>
        graphData?.links?.reduce((r: {}, o: L) => {
          ['source']
            .reduce(
              (group: {}, key: React.ReactText, i: number, { length }) =>
                (group[o[key]] = group[o[key]] || (i + 1 === length ? [] : {})),
              r,
            )
            .push(o);

          return r;
        }, {}),
      [graphData.links],
    );

    const getNodeDataId = React.useCallback(
      (node: N): string =>
        safeGet(`uxt-${node.id}`, nodeConfigRef?.current.dataId, node)
          .toString()
          .replace(/[^\w\s]/gi, '')
          .replace(/ +/g, ''),
      [],
    );

    const getLinkDataId = React.useCallback(
      (link: LinkType<N>): string =>
        safeGet(`uxt-${link.id}`, linkConfigRef?.current.dataId, link)
          .toString()
          .replace(/[^\w\s]/gi, '')
          .replace(/ +/g, ''),
      [],
    );

    const toggleNode = React.useCallback(
      (node: N, display: React.CSSProperties['display'] = 'block'): void => {
        d3.select(`foreignObject[data-id=${getNodeDataId(node)}]`).style(
          'display',
          display,
        );
      },
      [getNodeDataId],
    );

    const toggleLink = React.useCallback(
      (
        link: LinkType<N>,
        display: React.CSSProperties['display'] = 'block',
      ): void => {
        d3.select(`path.link[data-id=${getLinkDataId(link)}]`).style(
          'display',
          display,
        );
      },
      [getLinkDataId],
    );

    const getClusteredAccessor = React.useCallback(
      (node: N): boolean => safeGet(false, clusteredAccessor, node),
      [clusteredAccessor],
    );

    React.useEffect(() => {
      linkConfigRef.current = { ...defaultLinkConfig, ...linkConfig };
      nodeConfigRef.current = { ...defaultNodeConfig, ...nodeConfig };
    }, [linkConfig, nodeConfig]);

    const updateLinkStrokeWidth = React.useCallback(
      (link: L, isFromTraversePath: boolean = false): void => {
        d3.select(`path.link[data-id=${getLinkDataId(link)}]`).style(
          'stroke-width',
          isFromTraversePath
            ? linkConfigRef?.current.traversePathStrokeWidth
            : linkConfigRef?.current.strokeWidth,
        );
      },
      [getLinkDataId],
    );

    const updateNodesAndLinks = React.useCallback(() => {
      const links = new Set<L>();
      const nodes = new Set<N>();
      let nodesToBeRemoved: N[] = [];
      let linksToBeRemoved: L[] = [];
      const clusteredNodes = new Set<N>();
      const currentNodeId: React.ReactText = history[currentNodeIndex]?.id;
      let activeNodeId: React.ReactText = currentNodeId;
      const { stroke, strokeDasharray, strokeDashoffset, strokeHighlight } =
        linkConfigRef?.current;

      for (let i = 0; i <= currentNodeIndex; i++) {
        const element = history[i]?.id;
        // eslint-disable-next-line no-loop-func
        graphData?.links?.forEach((link: L) => {
          link.id = safeGet(
            `${link.source}-${link.target}`,
            linkConfigRef.current.linkIdAccessor,
            link,
          );
          if (!isIndirectRelationshipsActive) link.isIndirectLink = false;

          link.strokeDasharray = link.isIndirectLink ? strokeDasharray : 0;
          link.strokeDashoffset = link.isIndirectLink ? strokeDashoffset : 0;
          find((node: N) => {
            const id: React.ReactText = isFollowModeActive
              ? element
              : currentNodeId;

            if (!link.stroke && link.source === node.id)
              link.stroke = stroke || getColor(node.color);
            if (!link.strokeHighlight)
              link.strokeHighlight =
                strokeHighlight || Color(link.stroke).lighten(0.5).hex();

            if (
              link.source === id ||
              link.target === id ||
              link.isIndirectLink
            ) {
              updateLinkStrokeWidth(link);
              link.isVisitedLink =
                isFollowModeActive && element === link.target;

              if (
                !node.borderColor &&
                node.shape === Shape.Rectangle &&
                link.source === currentNodeId
              )
                node.borderColor = link.stroke;

              if (element === node.id)
                node.isVisited = node.id !== currentNodeId;

              if (
                element === link.source &&
                (node.id === link.target || element === node.id)
              ) {
                if (getClusteredAccessor(node) && node?.id === currentNodeId) {
                  activeNodeId = history[currentNodeIndex - 1].id;
                }

                node.isCurrentNodeNeighbor =
                  link.source === activeNodeId && node.id === link.target;

                node.isCurrent =
                  !getClusteredAccessor(node) && node.id === activeNodeId;
              }

              node.id === link.source || link.target === node.id
                ? nodes.add(node)
                : toggleNode(node, 'none');
              links.add(link);
            } else toggleLink(link, 'none');

            if (getClusteredAccessor(node)) {
              clusteredNodes.add(node);
              if (!visibleClusteredChildren.current.has(String(node?.id)))
                visibleClusteredChildren.current.set(String(node?.id), []);
            }

            if (link.isVisitedLink) updateLinkStrokeWidth(link, true);
          }, graphData.nodes);
        });
      }

      let visibleClusterChildrenLinks: L[];
      let visibleClusterLinks = new Set<L>();
      let newLinks: L[];
      clusteredNodes?.forEach((clusteredNode: N) => {
        visibleClusterChildrenLinks = visibleClusteredChildren.current.get(
          String(clusteredNode?.id),
        );
        newLinks = Object.values(groupedLinks[clusteredNode?.id] || []);

        const allClusteredLinks: L[] = graphData.links.reduce(
          (acc: Array<L>, cur: L) => {
            if (newLinks?.find((l: L) => l.source === cur.source)) {
              acc = [...acc, cur];

              if (
                visibleClusterChildrenLinks.some(
                  (_link: L) => cur.target === _link.target,
                )
              )
                visibleClusterLinks.add(cur);
            }
            return acc;
          },
          [],
        );

        linksToBeRemoved = [
          ...linksToBeRemoved,
          ...withoutBy([...visibleClusterLinks], allClusteredLinks),
        ];

        linksToBeRemoved.forEach((_link: L) => {
          toggleLink(_link, 'none');
        });

        nodesToBeRemoved = [
          ...nodesToBeRemoved,
          ...linksToBeRemoved.map((_link: L) => {
            return graphData.nodes.find((_node: N) => {
              let result = false;

              for (let i = 0; i < history.length; i++) {
                const _historyNode = history[i];
                const links: L[] = Object.values(
                  groupedLinks[_historyNode.id] || [],
                );

                if (!getClusteredAccessor(_historyNode)) {
                  for (let j = 0; j < links.length; j++) {
                    const _groupedLink = links[j] as L;

                    if (_groupedLink.id === _link.id) {
                      result = true;
                    }
                  }
                  // eslint-disable-next-line no-loop-func
                }
              }

              if (result) return false;
              /**
               * _link.target should not be one of the children of nodes in history.
               */

              for (let i = 0; i <= currentNodeIndex; i++) {
                const _historyNode = history[i];

                if (!getClusteredAccessor(_historyNode)) {
                  const links = Object.values(
                    groupedLinks[_historyNode.id] || [],
                  );

                  for (let j = 0; j < links.length; j++) {
                    const _groupedLink = links[j] as L;

                    if (_node.id === _groupedLink.target) return false;
                  }
                }
              }
              return _link.target === _node.id;
            });
          }),
        ];
      });

      return {
        links: withoutBy(linksToBeRemoved, [...links]),
        nodes: withoutBy(nodesToBeRemoved, [...nodes]),
      };
    }, [
      history,
      currentNodeIndex,
      graphData.links,
      graphData.nodes,
      isIndirectRelationshipsActive,
      getClusteredAccessor,
      groupedLinks,
      toggleLink,
      toggleNode,
      isFollowModeActive,
      updateLinkStrokeWidth,
    ]);

    React.useEffect((): void => {
      if (graphData?.nodes?.length > 1) {
        const { links, nodes } = updateNodesAndLinks();

        [...links].forEach((link: L) => toggleLink(link));
        [...nodes].forEach((node: N) => toggleNode(node));
      }
    }, [updateNodesAndLinks, toggleNode, toggleLink, graphData?.nodes]);

    React.useEffect(() => {
      const currentNodeId: React.ReactText = history[currentNodeIndex]?.id;
      const nodes: N[] = uniqBy(
        nodeConfigRef.current.nodeIdAccessor,
        data.nodes,
      );
      const links: L[] = uniqBy(
        (link: L) =>
          safeGet(
            `${link.source}-${link.target}`,
            linkConfigRef?.current.linkIdAccessor,
            link,
          ),
        data.links,
      );

      links?.length === 0 &&
        nodes.some(
          (node: N) =>
            (node.isCurrent =
              !getClusteredAccessor(node) && currentNodeId === node.id),
        );

      setGraphData({
        links,
        nodes,
      });
    }, [
      data.nodes,
      data.links,
      currentNodeIndex,
      history,
      getClusteredAccessor,
    ]);

    const handleNodeAnimation = React.useCallback(
      (node: N): void => {
        const nodeElement: d3.Selection<
          d3.BaseType,
          unknown,
          HTMLElement,
          any
        > = d3.select(`foreignObject[data-id=${getNodeDataId(node)}]`);

        nodeElement.on('click', (event: any, d: any) => {
          d3.select(graphRef.current)
            .transition()
            .ease(d3.easeBounceInOut)
            .duration(MAP_TRANSITION_DURATION) // milliseconds
            .call(
              zoom?.current.transform,
              d3.zoomIdentity.translate(-d.x / 2, -d.y / 2).scale(1),
            );
        });

        nodeElement.dispatch('click');
      },
      [getNodeDataId],
    );

    const handleNodeClick = React.useCallback(
      (node: N, e: React.MouseEvent<SVGForeignObjectElement>): void => {
        let newHistory: N[] = [...history];
        const isClusterNode: boolean = getClusteredAccessor(node);

        currentClickedNode.current = node as N;

        if (node.shape !== Shape.Rectangle) {
          setIsIndirectRelationshipsActive(false);

          if (history[history.length - 1]?.id !== node.id) {
            if (currentNodeIndex === 0) newHistory = [history[0]];

            if (currentNodeIndex !== newHistory.length - 1)
              newHistory = newHistory.slice(0, currentNodeIndex + 1);

            newHistory.push(node);
          }
        }

        clusterNodePaths.current.delete(
          [...clusterNodePaths.current].find(
            (link: L) => link.target === node.id,
          ),
        );

        isClusterNode &&
          graphData.nodes.forEach((_node: N) => {
            if (_node.isSelected) _node.isSelected = false;
            return _node;
          });

        node.shape === Shape.Rectangle || isClusterNode
          ? (node.isSelected = true)
          : handleNodeAnimation(node);
        currentNodeIndex === 0 && onHistoryChange?.(newHistory);

        setHistory(newHistory);
        setCurrentNodeIndex(newHistory.length - 1);

        onNodeClick?.(node, e);
      },
      [
        graphData.nodes,
        getClusteredAccessor,
        history,
        onNodeClick,
        currentNodeIndex,
        onHistoryChange,
        handleNodeAnimation,
      ],
    );

    const handleNodePropertiesClick = React.useCallback(
      (node: N, event: React.MouseEvent<HTMLDivElement>): void => {
        graphData.nodes.forEach((n: N) => {
          n.isSelected = n.isSelected ? false : node.id === n.id;
        });

        setGraphData({ nodes: graphData.nodes, links: graphData?.links });

        nodeConfigRef?.current.onNodePropertiesClick?.(node, event);
      },
      [graphData.nodes, graphData.links],
    );

    const nodes = React.useCallback((): Array<React.ReactNode> => {
      const {
        labelContent,
        nodeChildren,
        nodeIdAccessor,
        overflowItems,
        onNodeOverflowClick,
        nodeToolTip,
        getShowNodeOptions,
        onNodeMouseOver,
        onNodeMouseOut,
      } = nodeConfigRef?.current;

      return graphData.nodes.map((node: N, index: number) => (
        <NodeComponent
          key={index}
          graphRef={graphRef}
          idAccessor={nodeIdAccessor}
          radius={50}
          item={node}
          onClick={(e: React.MouseEvent<SVGForeignObjectElement>) =>
            handleNodeClick(node, e)
          }
          labelContent={labelContent?.(node)}
          color={node.color}
          isCurrent={node.isCurrent}
          iconSvg={node.iconSvg}
          renderLabel={renderLabel}
          shape={node.shape}
          isLoading={
            currentClickedNode?.current?.id === node.id
              ? fetchingNodeData
              : false
          }
          overflowItems={overflowItems?.(node)}
          borderColor={node.borderColor}
          isCurrentNodeNeighbor={node.isCurrentNodeNeighbor}
          isVisited={node.isVisited}
          isSelected={node.isSelected}
          onPropertiesClick={handleNodePropertiesClick}
          onOverflowClick={onNodeOverflowClick}
          onMouseOver={(e: React.MouseEvent<SVGForeignObjectElement>) =>
            onNodeMouseOver?.(node, e)
          }
          onMouseOut={(e: React.MouseEvent<SVGForeignObjectElement>) =>
            onNodeMouseOut?.(node, e)
          }
          toolTip={nodeToolTip}
          dataId={getNodeDataId?.(node)}
          isClustered={node.isClustered}
          className={node.className}
          classes={node.classes}
          showNodeOptions={getShowNodeOptions?.(node)}
          name={node.name}
          type={node.type}
        >
          {showIf(nodeChildren)(() => nodeChildren(node))}
        </NodeComponent>
      ));
    }, [
      graphData.nodes,
      renderLabel,
      fetchingNodeData,
      handleNodeClick,
      getNodeDataId,
    ]);

    const links = React.useCallback((): Array<React.ReactNode> => {
      const { onLinkClick, linkIdAccessor, showArrowHead, strokeWidth } =
        linkConfigRef?.current;

      return graphData?.links?.map((link: L, index: number) => {
        return (
          <LinkComponent
            className={LINK_CLASS_NAME}
            key={index}
            stroke={link.stroke}
            strokeHighlight={link.strokeHighlight}
            item={link}
            idAccessor={linkIdAccessor}
            graphRef={graphRef}
            markerId={MARKER_ID}
            showArrowHead={showArrowHead}
            strokeWidth={strokeWidth}
            strokeDasharray={link.strokeDasharray}
            strokeDashoffset={link.strokeDashoffset}
            onClick={onLinkClick}
            dataId={getLinkDataId(link)}
          />
        );
      });
    }, [graphData.links, getLinkDataId]);

    const dragAndDrop = React.useCallback(
      (
        simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>,
      ): d3.DragBehavior<Element, unknown, unknown> =>
        d3
          .drag()
          .on('drag', (event: any, d: any) => {
            if (d) {
              d.fx = event.x;
              d.fy = event.y;
            }
          })
          .on('end', (event: any, d: any) => {
            if (d) {
              d.fx = event.x;
              d.fy = event.y;
              simulation.alpha(1).restart();
            }
          }),
      [],
    );

    const updateSimulation = React.useCallback((): void => {
      const svg: d3.Selection<SVGSVGElement, unknown, null, undefined> =
        d3.select(graphRef.current);
      const svgChild: d3.Selection<d3.BaseType, unknown, null, undefined> =
        svg.select(`#${GRAPH_ELEMENT_ID}`);
      const allNodes: d3.Selection<d3.BaseType, unknown, d3.BaseType, unknown> =
        svg.selectAll('foreignObject');
      const allLinks: d3.Selection<d3.BaseType, unknown, d3.BaseType, unknown> =
        svgChild.selectAll('path.link');

      const linkData: (L & {
        source: N;
        target: N;
      })[] = graphData?.links?.map((link: L) => ({
        ...link,
        source: graphData.nodes.find((node: N) => node.id === link.source),
        target: graphData.nodes.find((node: N) => node.id === link.target),
      }));

      allNodes?.on('dblclick.zoom', d => d.stopPropagation());

      const forceSimulation: d3.Simulation<d3.SimulationNodeDatum, undefined> =
        linkData &&
        d3
          .forceSimulation()
          .nodes(graphData.nodes)
          .restart()
          .force(
            'link',
            d3
              .forceLink()
              .links(linkData)
              .distance(
                (
                  d: L & {
                    source: N;
                    target: N;
                  },
                ) => (d.target.isCurrent ? 300 : 250),
              ),
          )
          .force(
            'charge',
            d3.forceManyBody().strength((d: N) => {
              if (d.isCurrent) return -1800;

              if (d.isCurrentNodeNeighbor) return -1000;

              if (d.isVisited) return -1500;

              return -500;
            }),
          )
          .force('center', d3.forceCenter(centerX, centerY))
          .force(
            'collide',
            d3.forceCollide((d: N) => (d.isCurrent ? 200 : 125)).strength(0.75),
          )
          .force(
            'x',
            d3.forceX((n: N) => {
              if (n.isCurrent) return centerX;

              const links: N[] = linkData?.map(
                (
                  link: L & {
                    source: N;
                    target: N;
                  },
                ) => (link.target.id === n.id ? link.source : undefined),
              );

              const nodes: N[] = links?.filter(v => v !== undefined);

              if (
                nodes &&
                nodes.find(t => history.find((item: N) => item.id === t.id))
              )
                return nodes.find(t =>
                  history.find((item: N) => item.id === t.id),
                ).x;

              return centerX;
            }),
          )
          .force(
            'y',

            d3.forceY((n: N) => {
              if (n.isCurrent) return centerY;

              const links: N[] = linkData?.map(
                (
                  link: L & {
                    source: N;
                    target: N;
                  },
                ) => (link.target.id === n.id ? link.source : undefined),
              );

              const nodes: N[] = links?.filter(v => v !== undefined);

              if (
                nodes &&
                nodes.find(t => history.find((item: N) => item.id === t.id))
              )
                return nodes.find(t =>
                  history.find((item: N) => item.id === t.id),
                ).y;

              return centerY;
            }),
          );

      setSimulation(forceSimulation);

      allNodes.call(dragAndDrop(forceSimulation));

      forceSimulation?.on('tick', () => {
        const u: d3.Selection<d3.BaseType, N, d3.BaseType, unknown> =
          allNodes?.data(graphData.nodes);

        u.enter();
        allNodes?.attr('transform', (d: N) =>
          d ? 'translate(' + d.x + ',' + d.y + ')' : '',
        );
        u.exit().remove();

        const v: d3.Selection<
          d3.BaseType,
          L & {
            source: N;
            target: N;
          },
          d3.BaseType,
          unknown
        > = allLinks?.data(linkData);
        v.enter();

        allLinks?.attr('d', (l: L) => {
          if (l && l.source && l.target) {
            // Total difference in x and y from source to target

            // TODO: Added || 0 to ensure that the computations don't fail. When user pressed undo, the target node computation is failing causing LineTo to be NaN. Need to investigate further if we can stop simulation and restart after hiding the nodes and links on Undo
            const sourceNodeOuterElement: HTMLDivElement = (
              d3.select<HTMLDivElement, N>(
                `div[data-id='outer-element-${getNodeDataId(l.source as N)}']`,
              ) as unknown as { _groups: Array<any>; _parents: Array<any> }
            )._groups[0][0];

            const moveToSourceXCentre: number = sourceNodeOuterElement
              ? Number(
                  window
                    .getComputedStyle(sourceNodeOuterElement)
                    ?.width.split('px')[0] || 0,
                ) /
                  2 +
                Number(
                  window
                    .getComputedStyle(sourceNodeOuterElement)
                    ?.marginLeft.split('px')[0] || 0,
                )
              : 0;
            const moveToSourceYCentre: number = sourceNodeOuterElement
              ? Number(
                  window
                    .getComputedStyle(sourceNodeOuterElement)
                    ?.height.split('px')[0] || 0,
                ) / 2
              : 0;

            const targetNodeOuterElement: HTMLDivElement = (
              d3.select<HTMLDivElement, N>(
                `div[data-id='outer-element-${getNodeDataId(l.target as N)}']`,
              ) as unknown as { _groups: Array<any>; _parents: Array<any> }
            )._groups[0][0];

            const moveToTargetXCentre: number = targetNodeOuterElement
              ? Number(
                  window
                    .getComputedStyle(targetNodeOuterElement)
                    ?.width.split('px')[0] || 0,
                ) /
                  2 +
                Number(
                  window
                    .getComputedStyle(targetNodeOuterElement)
                    ?.marginLeft.split('px')[0] || 0,
                )
              : 0;
            const moveToTargetYCentre: number = targetNodeOuterElement
              ? Number(
                  window
                    .getComputedStyle(targetNodeOuterElement)
                    ?.height.split('px')[0] || 0,
                ) / 2
              : 0;

            const diffX: number = (l.target as N).x - (l.source as N).x;
            const diffY: number = (l.target as N).y - (l.source as N).y;

            // Length of path from center of source node to center of target node
            const pathLength: number = Math.sqrt(diffX * diffX + diffY * diffY);
            // x and y distances from center to outside edge of target node
            const offsetX: number =
              (diffX * (l.target as N).radius || 50) / pathLength;
            const offsetY: number =
              diffY * (l.target as N).radius || 50 / pathLength;

            return `M${(l.source as N)?.x + moveToSourceXCentre || 0},${
              (l.source as N)?.y + moveToSourceYCentre || 0
            }L${(l.target as N)?.x - offsetX + moveToTargetXCentre || 0},${
              (l.target as N)?.y - offsetY + moveToTargetYCentre || 0
            }`;
          }
        });

        v.exit().remove();
      });
    }, [dragAndDrop, graphData.links, graphData.nodes, history, getNodeDataId]);

    React.useEffect(() => {
      zoom.current = d3
        .zoom()
        .on('zoom', (e: any) =>
          d3.select(`#${GRAPH_ELEMENT_ID}`).attr('transform', e.transform),
        )
        .scaleExtent([minZoom, maxZoom]);
      d3.select(graphRef.current).call(zoom?.current);
    }, [data, minZoom, maxZoom]);

    React.useLayoutEffect(() => {
      if (graphRef.current) updateSimulation();
    }, [updateSimulation, data]);

    const addClusterNodeChild = React.useCallback(
      (node: N): void => {
        let clusteredNodeId: string;
        let link: L;

        graphData?.links.forEach((l: L) => {
          if (l.target === node.id) {
            graphData.nodes.forEach((_node: N) => {
              if (node.id === l.target) link = l;
              if (_node.id === l.source) clusteredNodeId = String(l.source);
            });
          }
        });

        const availableLink: L[] =
          clusteredNodeId &&
          visibleClusteredChildren.current.has(clusteredNodeId)
            ? visibleClusteredChildren.current.get(clusteredNodeId)
            : [];

        clusteredNodeId &&
          visibleClusteredChildren.current.set(clusteredNodeId, [
            ...availableLink,
            link,
          ]);
      },
      [graphData?.links, graphData.nodes],
    );

    const removeClusterNodeChild = React.useCallback(
      (node: N): void => {
        let clusteredNodeId: string;
        let link: L;

        graphData?.links.forEach((l: L) => {
          if (l.target === node.id) {
            link = l;
            graphData.nodes.forEach((_node: N) => {
              if (_node.id === l.source) clusteredNodeId = String(_node?.id);
            });
          }
        });

        clusteredNodeId &&
          visibleClusteredChildren.current.set(
            clusteredNodeId,
            withoutBy(
              [link],
              visibleClusteredChildren.current.get(clusteredNodeId),
            ),
          );
      },
      [graphData?.links, graphData.nodes],
    );

    const handleUndo = React.useCallback((): void => {
      let index: number = currentNodeIndex - 1;
      const prevNode: N = history[currentNodeIndex];
      let numberOfTimesNodeRepeated: number = 0;

      // In case of cluster node is available in the history.
      while (getClusteredAccessor(history[index])) index = index - 1;

      // Removing the cluster child's if they added more than one time in the history.
      for (let i = 0; i <= currentNodeIndex; i++) {
        if (history[i].id === prevNode.id) numberOfTimesNodeRepeated++;
      }

      if (numberOfTimesNodeRepeated === 1) removeClusterNodeChild(prevNode);

      setIsIndirectRelationshipsActive(false);
      setCurrentNodeIndex(index);

      handleNodeAnimation(history[index]);
      onUndoClick?.(prevNode);
    }, [
      currentNodeIndex,
      onUndoClick,
      history,
      handleNodeAnimation,
      removeClusterNodeChild,
      getClusteredAccessor,
    ]);

    const handleRedo = React.useCallback((): void => {
      let index: number = currentNodeIndex + 1;

      while (getClusteredAccessor(history[index])) index = index + 1;

      addClusterNodeChild(history[index]);

      setIsIndirectRelationshipsActive(false);
      setCurrentNodeIndex(index);

      handleNodeAnimation(history[index]);
      onRedoClick?.(history[index]);
    }, [
      currentNodeIndex,
      onRedoClick,
      history,
      handleNodeAnimation,
      addClusterNodeChild,
      getClusteredAccessor,
    ]);

    React.useEffect(() => {
      if (history.length === 0 && data.nodes && data.nodes.length > 0)
        setHistory([data.nodes[0]]);

      if (history.length === 1) {
        setCurrentNodeIndex(0);
      }
    }, [history, data.nodes]);

    const handleReset = React.useCallback((): void => {
      const svg: d3.Selection<SVGSVGElement, unknown, null, undefined> =
        d3.select(graphRef.current);
      const nodes: d3.Selection<d3.BaseType, unknown, HTMLElement, any> =
        d3.selectAll('foreignObject');

      nodes.on('resetStickyNodesPosition', (event: any, d: any) => {
        delete d.fx;
        delete d.fy;

        simulation.alpha(1).restart();
      });

      nodes.dispatch('resetStickyNodesPosition');

      svg
        .transition()
        .duration(MAP_TRANSITION_DURATION)
        .call(zoom?.current.transform, d3.zoomIdentity);

      onResetNodePositions?.();
    }, [simulation, onResetNodePositions]);

    const handleClearHistory = React.useCallback((): void => {
      if (onClearHistory) {
        DialogService.confirm({
          titleText: clearHistoryConfirmDialogTitleText,
          message: clearHistoryConfirmDialogMessage,
          submitText: clearHistoryConfirmDialogSubmitText,
          cancelText: clearHistoryConfirmDialogCancelText,
        }).then((response: boolean) => {
          if (response) {
            setIsIndirectRelationshipsActive(false);

            const links = new Set<L>();
            const nodes = new Set<N>();
            const currentNode: N = history[currentNodeIndex];
            const currentNodeId: React.ReactText =
              history[currentNodeIndex]?.id;

            find((link: L) => {
              if (currentNodeId === link.source) {
                find((node: N) => {
                  if (node.id === link.source || node.id === link.target) {
                    node.isCurrent =
                      !getClusteredAccessor(node) && currentNodeId === node.id;
                    if (currentNodeId === node.id)
                      currentClickedNode.current = node;
                    node.isVisited = false;

                    nodes.add(node);
                  }
                }, data.nodes);
                links.add(link);
              }
            }, data.links);

            handleReset();

            const newData: Data<N, L> = {
              links: [...links],
              nodes: [...nodes],
            };

            onClearHistory(newData);

            setHistory([currentNode]);
            setCurrentNodeIndex(0);
          }
        });
      }
    }, [
      clearHistoryConfirmDialogCancelText,
      clearHistoryConfirmDialogMessage,
      clearHistoryConfirmDialogSubmitText,
      clearHistoryConfirmDialogTitleText,
      currentNodeIndex,
      history,
      data.links,
      data.nodes,
      onClearHistory,
      handleReset,
      getClusteredAccessor,
    ]);

    const toggleIndirectRelationships = React.useCallback((): void => {
      setIsIndirectRelationshipsActive(!isIndirectRelationshipsActive);

      if (isIndirectRelationshipsActive) {
        const data: {
          links: L[];
          nodes: N[];
        } = updateNodesAndLinks();

        setGraphData({
          links: data.links,
          nodes: data.nodes,
        });
      } else {
        const data: Data<N, L> = onIndirectRelationships?.(
          !isIndirectRelationshipsActive,
          history[currentNodeIndex]?.id,
        );

        if (data?.links && data?.nodes) {
          data?.links?.map((link: L) => (link.isIndirectLink = true));

          setGraphData({
            links: uniqBy(
              (link: L) =>
                safeGet(
                  `${link.source}-${link.target}`,
                  linkConfigRef?.current.linkIdAccessor,
                  link,
                ),
              [...graphData.links, ...data.links],
            ),

            nodes: uniqBy(nodeConfigRef.current.nodeIdAccessor, [
              ...graphData.nodes,
              ...data.nodes,
            ]),
          });
        }
      }
    }, [
      currentNodeIndex,
      graphData,
      history,
      isIndirectRelationshipsActive,
      onIndirectRelationships,
      updateNodesAndLinks,
    ]);

    const handleToggleFollowMode = React.useCallback((): void => {
      setIsFollowModeActive(!isFollowModeActive);
      setIsIndirectRelationshipsActive(false);

      onToggleFollowMode?.();
    }, [isFollowModeActive, onToggleFollowMode]);

    const handleFitToView = React.useCallback((): void => {
      const svg: d3.Selection<SVGSVGElement, unknown, null, undefined> =
        d3.select(graphRef.current);
      const svgChild: d3.Selection<SVGGElement, unknown, null, undefined> =
        svg.select(`#${GRAPH_ELEMENT_ID}`);

      const bounds: DOMRect = svgChild.node().getBBox();
      const width: number = bounds.width,
        height: number = bounds.height;
      const fullWidth: number = graphRef.current.clientWidth;
      const fullHeight: number = graphRef.current.clientHeight;

      if (width === 0 || height === 0) return; // nothing to fit

      const scaleX: number = 0.95 / (width / fullWidth);
      const scaleY: number = 0.95 / (height / fullHeight);
      const scale: number = Math.min(scaleX, scaleY);
      const midX: number = bounds.x + width / 2,
        midY: number = bounds.y + height / 2;
      const translate: number[] = [
        graphRef.current.viewBox.baseVal.x + fullWidth / 2 - scale * midX,
        graphRef.current.viewBox.baseVal.y + fullHeight / 2 - scale * midY,
      ];
      const transform: d3.ZoomTransform = d3.zoomIdentity
        .translate(translate[0], translate[1])
        .scale(scale);

      svg
        .transition()
        .duration(MAP_TRANSITION_DURATION) // milliseconds
        .call(zoom?.current.transform, transform);

      onFitToView?.();
    }, [onFitToView]);

    const toggleNodeNames = React.useCallback((): void => {
      setRenderLabel(!renderLabel);

      onToggleNodeNames?.(!renderLabel);
    }, [onToggleNodeNames, renderLabel]);

    const addNodeToHistory = React.useCallback(
      (node: N): void => {
        handleNodeAnimation(node);

        let newHistory: N[] = [...history];

        currentClickedNode.current = node;

        if (currentNodeIndex === 0) newHistory = [history[0]];
        if (currentNodeIndex !== newHistory.length - 1)
          newHistory = newHistory.slice(0, currentNodeIndex + 1);

        newHistory.push(node);

        if (currentNodeIndex === 0) onHistoryChange?.(newHistory);

        addClusterNodeChild(node);

        setHistory(newHistory);
        setCurrentNodeIndex(newHistory.length - 1);
      },
      [
        history,
        addClusterNodeChild,
        currentNodeIndex,
        onHistoryChange,
        handleNodeAnimation,
      ],
    );

    const removeNodeFromHistory = React.useCallback(
      (node: N): void => {
        const index: number = history.findIndex((v: N) => v.id === node.id);

        removeClusterNodeChild(node);
        history.splice(index, 1);

        setCurrentNodeIndex(history.length - 1);
      },
      [history, removeClusterNodeChild],
    );

    const handleSelectedNode = React.useCallback(
      (selectedNode: N): void => {
        if (selectedNode) {
          setGraphData({
            links: graphData?.links,
            nodes: graphData.nodes.map((node: N) => {
              node.isSelected = node.id === selectedNode.id;
              return node;
            }),
          });
        }
      },
      [graphData.nodes, graphData?.links],
    );

    const handleSelectionRemovedNode = React.useCallback(
      (n: N): void => {
        if (n) {
          history.find((item: N) => item.id === n.id) &&
            graphData.links.forEach((link: L) => {
              if (link.target === n.id) {
                clusterNodePaths.current.add(link);
              }
            });

          setGraphData({
            links: graphData?.links,
            nodes: graphData.nodes.map((node: N) => {
              if (n.id === node.id) node.isSelected = false;
              return node;
            }),
          });
        } else
          setGraphData({
            links: graphData?.links,
            nodes: graphData.nodes.map((node: N) => {
              node.isSelected = false;
              return node;
            }),
          });
      },
      [graphData.nodes, history, graphData.links],
    );

    React.useImperativeHandle(
      ref,
      () => ({
        addNodeToHistory: addNodeToHistory,
        removeNodeFromHistory: removeNodeFromHistory,
        addSelectedNode: handleSelectedNode,
        removeSelectedNode: handleSelectionRemovedNode,
        getGraphHistory: () => history,
        rootElement: () => rootElement,
      }),
      [
        addNodeToHistory,
        removeNodeFromHistory,
        handleSelectedNode,
        handleSelectionRemovedNode,
        history,
      ],
    );

    return (
      <div
        className={classnames(classes.root, className)}
        ref={rootElement}
        {...rest}
      >
        {showIf(isLoading)(
          <Backdrop isOpen={true}>
            <Spinner />
            {loadingMessage}
          </Backdrop>,
        )}
        {showIf(header)(<div className={classes.header}>{header}</div>)}
        {showIf(showToolbar)(
          <Toolbar className={classes.toolbar} position="top">
            <RibbonBarTooltip
              title={undoTooltipText}
              isDisabled={currentNodeIndex === 0}
            >
              <IconButton
                iconSvg={undo}
                onClick={handleUndo}
                isDisabled={currentNodeIndex === 0}
              />
            </RibbonBarTooltip>
            <RibbonBarTooltip
              title={redoTooltipText}
              isDisabled={history.length - 1 === currentNodeIndex}
            >
              <IconButton
                iconSvg={redo}
                onClick={handleRedo}
                isDisabled={history.length - 1 === currentNodeIndex}
              />
            </RibbonBarTooltip>
            <RibbonBarTooltip title={indirectRelationshipsTooltipText}>
              <ToggleIconButton
                iconSvg={showIndirect}
                onClick={toggleIndirectRelationships}
                isActive={isIndirectRelationshipsActive}
              />
            </RibbonBarTooltip>
            <RibbonBarTooltip title={followModeTooltipText}>
              <ToggleIconButton
                iconSvg={followMode}
                onClick={handleToggleFollowMode}
                isActive={isFollowModeActive}
              />
            </RibbonBarTooltip>
            <RibbonBarTooltip
              title={clearHistoryTooltipText}
              isDisabled={history.length === 1}
            >
              <IconButton
                iconSvg={clearHistory}
                onClick={handleClearHistory}
                isDisabled={history.length === 1}
              />
            </RibbonBarTooltip>
            <RibbonBarTooltip title={resetNodePositionsTooltipText}>
              <IconButton iconSvg={reset} onClick={handleReset} />
            </RibbonBarTooltip>
            <RibbonBarTooltip title={hideNodeLabelsTooltipText}>
              <ToggleIconButton
                iconSvg={showNodeNames}
                onClick={toggleNodeNames}
                isActive={renderLabel}
              />
            </RibbonBarTooltip>
            <RibbonBarTooltip title={fitToViewTooltipText}>
              <IconButton iconSvg={expand} onClick={handleFitToView} />
            </RibbonBarTooltip>
            {toolbarContent}
          </Toolbar>,
        )}
        <div className={classes.graphContainer} onClick={onGraphClick}>
          <AutoSizer>
            {({ height, width }) => {
              return (
                <svg
                  ref={graphRef}
                  width={width}
                  height={height}
                  viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
                >
                  <defs>
                    <marker
                      id={MARKER_ID}
                      markerWidth={MARKER_SIZE}
                      markerHeight={MARKER_SIZE}
                      refX={MARKER_X_COORDINATE}
                      refY={MARKER_Y_COORDINATE}
                      orient={MARKER_ORIENT_TYPE}
                    >
                      <path className={classes.linkPath} d={LINK_PATH_DATA} />
                    </marker>
                  </defs>
                  <g id={GRAPH_ELEMENT_ID} className={classes.groupElement}>
                    {showIf(linkConfigRef?.current && links()?.length > 0)(
                      () => (
                        <g
                          id={LINKS_CONTAINER_ID}
                          className={classes.linksContainer}
                        >
                          {[...links()]}
                        </g>
                      ),
                    )}
                    {showIf(nodeConfigRef?.current)(() => (
                      <g
                        id={NODES_CONTAINER_ID}
                        className={classes.nodesContainer}
                      >
                        {[...nodes()]}
                      </g>
                    ))}
                  </g>
                </svg>
              );
            }}
          </AutoSizer>
        </div>
        {showIf(footer)(<div className={classes.footer}>{footer}</div>)}
      </div>
    );
  },
);

export default React.memo(InfoMap);
