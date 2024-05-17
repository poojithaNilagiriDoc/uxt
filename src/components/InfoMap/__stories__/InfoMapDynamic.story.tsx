import createStyles from '@material-ui/core/styles/createStyles';
import deepmerge from 'deepmerge';
import groupBy from 'lodash/fp/groupBy';
import startCase from 'lodash/fp/startCase';
import React from 'react';
import close from 'uxt-graphics/icons/close';
import nodeMap from 'uxt-graphics/icons/nodemap';
import {
  boqData,
  boqIndirectRelationshipsData,
  costIndirectRelationshipsData,
  initialData,
  issuesData,
  issuesIndirectRelationshipsData,
  slab01,
  slab02,
  slab03,
  workPackageData,
} from '../../../../sample-data/infoMapData';
import NotificationService from '../../../services/NotificationService';
import { UxtTheme } from '../../../themes/UxtTheme';
import Shape from '../../constants/shape';
import IconButton from '../../IconButton';
import List from '../../List';
import ListItem, { ListItemProps } from '../../ListItem';
import type { MenuItem as MenuItemType } from '../../MenuItem';
import ProgressBar from '../../ProgressBar';
import PropertySection from '../../PropertySection';
import PushPanelDock from '../../PushPanelDock';
import { PushPanelDockItemProps } from '../../PushPanelDockItem';
import Shell from '../../Shell';
import ShellContent from '../../ShellContent';
import ShellMain from '../../ShellMain';
import SimpleProperty from '../../SimpleProperty';
import ToggleIconButton from '../../ToggleIconButton';
import Toolbar from '../../Toolbar';
import Topbar from '../../Topbar';
import makeStyles from '../../_helpers/makeStyles';
import showIf from '../../_helpers/showIf';
import useTheme from '../../_helpers/useTheme';
import InfoMap, { Data, InfoMapMethods, LinkType, NodeType } from '../index';
import InfoMapModalDemo from './InfoMapModalDemo';

interface InfoMapWithDynamicStoryProps {
  classes?: Record<string, string>;
}

interface DynamicPushPanelDockItem extends Omit<PushPanelDockItemProps, 'id'> {
  id?: React.ReactText;
  title?: string;
  item?: NodeType;
}

interface SelectedItem {
  source?: string;
  value?: string;
}

interface Item {
  [key: string]: any;
}

export default function InfoMapDynamic(props: InfoMapWithDynamicStoryProps) {
  const useStyles = makeStyles(
    (theme: UxtTheme) =>
      createStyles({
        root: {
          flexDirection: 'row',
        },
        container: {
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
        },
        pushPanelDock: {
          display: 'flex',
          flexDirection: 'row-reverse',
        },
        panelContainer: {
          height: '100%',
          display: 'flex',
          flex: '0 0 auto',
        },
        iconButton: {
          position: 'absolute',
          top: theme.spacing(1),
          right: theme.spacing(1),
          zIndex: 1,
        },
        content: {
          flexDirection: 'row',
        },
      }),
    {
      name: 'InfoMapStoryDynamic',
    },
  );

  const [data, setData] =
    React.useState<Data<NodeType, LinkType<NodeType>>>(initialData);
  const [fetchingNodeData, setFetchingNodeData] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const timeout: React.MutableRefObject<ReturnType<typeof setTimeout>> =
    React.useRef();
  const [node, setNode] = React.useState<NodeType>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [width, setWidth] = React.useState<number>(256);
  const [selectedItem, setSelectedItem] = React.useState<Item>();
  const [dockItems, setDockItems] = React.useState<
    Array<DynamicPushPanelDockItem>
  >([]);
  const [activeDockItem, setActiveDockItem] =
    React.useState<DynamicPushPanelDockItem>();
  const [nameColumnWidth, setNameColumnWidth] = React.useState<number>(120);
  const [toggledItems, setToggledItems] = React.useState<SelectedItem[]>([]);
  const [listItems, setListItems] = React.useState<Array<Item>>([]);
  const [clusteredNodes, setClusteredNodes] = React.useState<
    Set<DynamicPushPanelDockItem>
  >(new Set<NodeType>());
  const openedNodes: React.MutableRefObject<Set<NodeType>> = React.useRef(
    new Set<NodeType>([]),
  );
  const [selectedClusterNode, setSelectedClusterNode] =
    React.useState<NodeType>();
  const theme: UxtTheme = useTheme();
  const ref = React.useRef<InfoMapMethods>();
  const classes = useStyles(props);

  React.useEffect(() => {
    // Adding this timeout for loader because we are fetching data from local and it'll load very fast
    const loadingTimeOut: ReturnType<typeof setTimeout> = setTimeout(
      () => setIsLoading(false),
      0,
    );

    return () => {
      if (loadingTimeOut) clearTimeout(loadingTimeOut);
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const onIsActiveChange = React.useCallback(
    (props: ListItemProps): void => {
      const activeNode: NodeType = props.item;
      const id = props.item.id;

      if (toggledItems?.find(item => item.value === props.item.id)) {
        ref.current.removeNodeFromHistory(activeNode);

        setToggledItems(
          toggledItems.filter(item => item.value !== props.item.id),
        );
      } else {
        let newData: Data<NodeType, LinkType<NodeType>>;

        if (openedNodes.current.has(props.item)) newData = data;
        else {
          if (id === 'slab_01') newData = slab01;
          else newData = id === 'slab_02' ? slab02 : slab03;

          setData(deepmerge(data, newData));
        }

        ref.current.addNodeToHistory(activeNode);

        setToggledItems([
          ...toggledItems,
          {
            source: String(
              data.links.filter(
                (link: LinkType<NodeType>) => link.target === id,
              )[0].source,
            ),
            value: id,
          },
        ]);
      }
      openedNodes.current.add(props.item);

      setSelectedItem(props.item);
    },
    [data.nodes, data.links, toggledItems],
  );

  const getItemComponent = React.useCallback(
    (props: ListItemProps): JSX.Element => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            fill: toggledItems?.find(
              (item: SelectedItem) => item.value === props.item.id,
            )
              ? theme.palette.background.topbar
              : 'inherit',
          }}
        >
          <ListItem
            {...props}
            iconSvgAccessor="iconSvg"
            primaryTextAccessor="id"
          />
          <ToggleIconButton
            iconSvg={nodeMap}
            style={{ marginTop: 6 }}
            isActive={Boolean(
              toggledItems?.find(
                (item: SelectedItem) => item.value === props.item.id,
              ),
            )}
            onClick={() => onIsActiveChange(props)}
          />
        </div>
      );
    },
    [onIsActiveChange, toggledItems],
  );

  const handleClusteredPanel = React.useCallback(
    (node: NodeType): void => {
      const index: number = dockItems.findIndex(
        (item: DynamicPushPanelDockItem) => item.id === node.id,
      );
      dockItems.splice(index, 1);

      const lastItem: DynamicPushPanelDockItem =
        dockItems[dockItems.length - 1];

      if (lastItem) {
        ref.current.removeSelectedNode(node);
        ref.current.addSelectedNode(lastItem.item);

        setActiveDockItem(lastItem);
      } else {
        ref.current.removeSelectedNode(node);

        if (dockItems.length === 0) {
          clusteredNodes.clear();

          setDockItems([]);
          setActiveDockItem(null);
          setSelectedClusterNode(null);
        }
      }
    },
    [dockItems],
  );

  const getClusteredNodeContent = React.useCallback(
    (node: NodeType): JSX.Element => {
      return (
        <>
          <Toolbar position="top">
            <SimpleProperty
              id={node.id.toString()}
              name={node && startCase(node.id)}
              value="Description"
            />
            <IconButton
              iconSvg={close}
              onClick={() => handleClusteredPanel(node)}
              style={{ marginLeft: 'auto' }}
            />
          </Toolbar>
          <List
            items={listItems}
            iconSvgAccessor="iconSvg"
            primaryTextAccessor="id"
            selectedItem={selectedItem}
            onSelectedItemChange={item => setSelectedItem(item)}
            idAccessor="id"
            itemComponent={getItemComponent}
          />
        </>
      );
    },
    [getItemComponent, selectedItem, listItems, handleClusteredPanel],
  );

  const handleNodeClick = React.useCallback(
    (node: NodeType): void | JSX.Element => {
      setFetchingNodeData(true);

      switch (node.id) {
        case 'boq':
          setData(deepmerge(data, boqData));
          break;
        case 'issues':
          setData(deepmerge(data, issuesData));
          break;
        case 'workPackage':
          setData(deepmerge(data, workPackageData));
          break;
        default:
          break;
      }

      if (node.isClustered) {
        const items: Set<NodeType> = new Set();

        initialData.links.forEach((link: LinkType<NodeType>) => {
          if (link.source === node.id) {
            initialData.nodes.forEach((node: NodeType) => {
              if (link.target === node.id) items.add(node);
              return node;
            });
          }
          return link;
        });

        setSelectedClusterNode(node);
        setListItems(Array.from(items));
      }
      // Adding this timeout for loader because we are fetching data from local and it'll load very fast.
      timeout.current = setTimeout(() => setFetchingNodeData(false), 1000);
      if (node.shape === Shape.Rectangle) {
        setNode(node);
        setIsOpen(true);
      }
    },
    [data],
  );

  const handleIndirectRelationships = React.useCallback(
    (
      isActive: boolean,
      currentNodeId: React.ReactText,
    ): Data<NodeType, LinkType<NodeType>> => {
      if (isActive) {
        switch (currentNodeId) {
          case 'cost':
            return costIndirectRelationshipsData;
          case 'issues':
            return issuesIndirectRelationshipsData;
          case 'boq':
            return boqIndirectRelationshipsData;
          default:
            return {};
        }
      }
    },
    [],
  );

  const getOverflowItems = React.useCallback(
    (node: NodeType): Array<MenuItemType> => {
      return [
        {
          text: node.id === 'cost' ? 'Delete' : 'Cancel',
          action: () =>
            NotificationService.info(
              node.id === 'cost' ? 'Deleted' : 'Canceled',
            ),
        },
        {
          text: node.id === 'cost' ? 'Save' : 'SaveAs',
          action: () =>
            NotificationService.info(node.id === 'cost' ? 'Saved' : 'SaveAs'),
        },
      ];
    },
    [],
  );

  const getLabelContent = React.useCallback(
    (node: NodeType): React.ReactNode => {
      const title: string = String(node.id);

      if (node.id === 'cost') return <ProgressBar value={50} title={title} />;
      else if (node.id === 'schedule')
        return (
          <div
            style={{
              fontSize: theme.typography.caption.fontSize,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <p style={{ paddingBottom: 2 }} title={title}>
              General 00141
            </p>
            <span
              style={{
                padding: 2,
                marginRight: 2,
                background: theme.palette.warning.light,
                border: `1px solid ${theme.palette.warning.main}`,
                borderRadius: theme.shape.borderRadius,
                width: 'fit-content',
              }}
            >
              In progress state
            </span>
            <span>Medium article </span>
          </div>
        );

      return (
        <p
          title={title}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {startCase(node.id)}
        </p>
      );
    },
    [],
  );

  const getPanelContent = React.useCallback(
    (node: NodeType): React.ReactNode => {
      return (
        <>
          <Toolbar position="top">
            <SimpleProperty
              id="some-id"
              name={node && startCase(node.id)}
              value="Description"
            />
            <IconButton
              iconSvg={close}
              onClick={() => handleClusteredPanel(node)}
              style={{ marginLeft: 'auto' }}
            />
          </Toolbar>
          <PropertySection
            data={{
              'First Name': 'Chuck',
              'Last Name': 'Testa',
              Location: 'Texas',
            }}
            isCollapsible={true}
            name={node && startCase(node.id)}
            nameColumnWidth={nameColumnWidth}
            onNameColumnWidthChange={setNameColumnWidth}
          />
          <PropertySection
            data={{
              'First Name': 'Ben',
              'Last Name': 'Dover',
              Occupation: 'Taxidermist',
              'Skill Level': 'Expert',
            }}
            isCollapsible={true}
            name={node && startCase(node.id)}
            nameColumnWidth={nameColumnWidth}
            onNameColumnWidthChange={setNameColumnWidth}
          />
        </>
      );
    },
    [nameColumnWidth, handleClusteredPanel],
  );

  const handleNodePropertiesClick = React.useCallback(
    (node: NodeType): void => {
      const dockItem: DynamicPushPanelDockItem = {
        id: String(node.id),
        title: startCase(node.id),
        iconSvg: node.iconSvg,
        panelContent: getPanelContent(node),
        item: node,
      };

      if (
        !dockItems.some(
          (value: DynamicPushPanelDockItem) => dockItem.id === value.id,
        )
      ) {
        dockItems.push(dockItem);

        setActiveDockItem(dockItem);
      }
    },
    [getPanelContent, dockItems],
  );

  const handleOnIsOpenChange = React.useCallback((node: NodeType): void => {
    ref.current.removeSelectedNode(node);

    setIsOpen(false);
  }, []);

  const handleClearHistory = React.useCallback(
    (data: Data<NodeType, LinkType<NodeType>>): void => {
      const newDockItems: Array<DynamicPushPanelDockItem> = [];

      dockItems.forEach((item: DynamicPushPanelDockItem) => {
        data.nodes.forEach((node: NodeType) => {
          if (item && item.id === node.id) newDockItems.push(item);

          return node;
        });
      });

      setDockItems(newDockItems);
      setActiveDockItem(newDockItems[0]);
      setData(data);
    },
    [dockItems],
  );

  const getNodeDataId = React.useCallback(
    (node: NodeType): string => `test-${node.id}`,
    [],
  );

  const getLinkDataId = React.useCallback(
    (link: LinkType<NodeType>): string => `${link.source}-${link.target}`,
    [],
  );

  const handleActiveDockItem = React.useCallback(
    (item: DynamicPushPanelDockItem): void => {
      ref.current.addSelectedNode(item);

      setActiveDockItem(item);
    },
    [],
  );

  React.useEffect(() => {
    if (selectedClusterNode) {
      const item: DynamicPushPanelDockItem = {
        id: String(selectedClusterNode.id),
        iconSvg: selectedClusterNode.iconSvg,
        title: startCase(selectedClusterNode.id),
        panelContent: getClusteredNodeContent(selectedClusterNode),
        item: selectedClusterNode,
      };

      clusteredNodes?.add(item);
      clusteredNodes?.forEach((item: DynamicPushPanelDockItem) => {
        !dockItems.some(
          (value: DynamicPushPanelDockItem) => item.id === value.id,
        ) && dockItems.push(item);
      });

      clusteredNodes &&
        setActiveDockItem([...clusteredNodes][clusteredNodes.size - 1]);
    }
  }, [
    selectedClusterNode,
    clusteredNodes,
    dockItems,
    getClusteredNodeContent,
    toggledItems,
  ]);

  const handleDockItems = React.useCallback((): void => {
    ref.current.removeSelectedNode(undefined);

    setClusteredNodes(null);
    setDockItems([]);
    setActiveDockItem(null);
  }, []);

  const handleHistoryUpdate = React.useCallback(
    (history: NodeType[]): void => {
      history.forEach(({ id }: NodeType) =>
        toggledItems.filter(item => item.value !== id),
      );
    },
    [toggledItems],
  );

  const handleUndo = React.useCallback(
    (node: NodeType): void => {
      const items: SelectedItem[] = toggledItems.filter(
        item => item.value !== node.id,
      );
      const activeChildren: SelectedItem[] = groupBy(
        (item: SelectedItem) => item.source,
        items,
      );
      let clusterNode: NodeType;

      data.links.forEach((link: LinkType<NodeType>) => {
        data.nodes.forEach(_node => {
          if (
            _node.isClustered &&
            node.id === link.target &&
            link.source === _node.id
          ) {
            clusterNode = _node;
            if (!activeChildren[_node.id]) {
              ref.current.removeSelectedNode(_node);
              handleClusteredPanel(clusterNode);
            }
          }
        });
      });

      if (dockItems.length === 0 && items.length > 0) {
        setSelectedClusterNode(clusterNode);
      }

      setToggledItems(items);
    },
    [toggledItems, data.links, data.nodes, dockItems, handleClusteredPanel],
  );

  const handleRedo = React.useCallback(
    (node: NodeType): void => {
      const id: any = node.id;

      data.links.forEach((link: LinkType<NodeType>) => {
        data.nodes.forEach(_node => {
          if (
            _node.isClustered &&
            node.id === link.target &&
            link.source === _node.id
          ) {
            ref.current.addSelectedNode(_node);

            setSelectedClusterNode(_node);
          }
        });
      });

      setToggledItems([
        ...toggledItems,
        {
          source: String(
            data.links.filter(
              (link: LinkType<NodeType>) => link?.target === id,
            )[0].source,
          ),
          value: id,
        },
      ]);

      setSelectedItem(node);
    },
    [toggledItems, data.links, data.nodes],
  );

  return (
    <Shell className={classes.root}>
      <div className={classes.container}>
        <Topbar pageTitle="InfoMap Dynamic" />
        <ShellMain>
          <ShellContent className={classes.content}>
            {showIf(node && node.shape === Shape.Rectangle)(
              <InfoMapModalDemo
                node={node}
                isOpen={isOpen}
                closeModal={() => handleOnIsOpenChange(node)}
              />,
            )}
            <InfoMap
              ref={ref}
              fetchingNodeData={fetchingNodeData}
              data={data}
              onNodeClick={handleNodeClick}
              onClearHistory={handleClearHistory}
              onIndirectRelationships={handleIndirectRelationships}
              isLoading={isLoading}
              nodeConfig={{
                labelContent: getLabelContent,
                overflowItems: getOverflowItems,
                onNodePropertiesClick: handleNodePropertiesClick,
                nodeToolTip: ({ id }: NodeType) => `Uxt-${id}`,
                dataId: getNodeDataId,
              }}
              linkConfig={
                {
                  dataId: getLinkDataId,
                } as LinkType<NodeType>
              }
              onUndoClick={handleUndo}
              onHistoryChange={handleHistoryUpdate}
              onRedoClick={handleRedo}
            />
            <div className={classes.pushPanelDock}>
              {showIf(dockItems.length > 0)(
                <PushPanelDock
                  activeDockItem={activeDockItem}
                  dockItems={dockItems}
                  onActiveDockItemChange={handleActiveDockItem}
                  isOnRight={true}
                  isDockVisible={dockItems.length > 1}
                  panelWidth={width}
                  onPanelWidthChange={setWidth}
                  onClose={handleDockItems}
                />,
              )}
            </div>
          </ShellContent>
        </ShellMain>
      </div>
    </Shell>
  );
}
