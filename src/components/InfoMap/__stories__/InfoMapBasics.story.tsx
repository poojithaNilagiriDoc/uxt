import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import cost from 'uxt-graphics/icons/cost-estimation';
import workPackage from 'uxt-graphics/icons/work-package';
import boq from 'uxt-graphics/icons/bill-of-quantities';
import Shell from '../../Shell';
import Topbar from '../../Topbar';
import ShellMain from '../../ShellMain';
import ShellContent from '../../ShellContent';
import InfoMap, { NodeType, Data, LinkType } from '../index';
import showIf from '../../_helpers/showIf';
import Shape from '../../constants/shape';
import ProgressBar from '../../ProgressBar';
import NotificationService from '../../../services/NotificationService';
import DetailsPanel from '../../DetailsPanel';
import PropertySection from '../../PropertySection';
import makeStyles from '../../_helpers/makeStyles';
import { UxtTheme } from '../../../themes/UxtTheme';
import type { MenuItem as MenuItemType } from '../../MenuItem';
import InfoMapModalDemo from './InfoMapModalDemo';

const initialData: Data<NodeType, LinkType<NodeType>> = {
  links: [
    {
      source: 'cost',
      target: 'boq',
    },
    {
      source: 'cost',
      target: 'schedule',
    },
    {
      source: 'cost',
      target: 'model',
    },
    {
      source: 'cost',
      target: 'workPackage',
    },
  ],
  nodes: [
    {
      id: 'cost',
      iconSvg: cost,
    },
    {
      id: 'boq',
      iconSvg: boq,
    },
    {
      id: 'workPackage',
      iconSvg: boq,
    },
    {
      id: 'schedule',
      iconSvg: workPackage,
    },
    {
      id: 'model',
      iconSvg: workPackage,
    },
  ],
};
export interface InfoMapBasicsStoryProps {
  classes?: Record<string, string>;
}

export default function InfoMapBasics(props: InfoMapBasicsStoryProps) {
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
        panel: {
          borderRight: `1px solid ${theme.palette.divider}`,
          flex: '1 1 auto',
        },
      }),
    {
      name: 'InfoMapStoryBasics',
    },
  );

  const [data, setData] =
    React.useState<Data<NodeType, LinkType<NodeType>>>(initialData);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [node, setNode] = React.useState<NodeType>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
  const [nameColumnWidth, setNameColumnWidth] = React.useState<number>(120);

  const classes = useStyles(props);

  React.useEffect(() => {
    // Adding this timeout for loader because we are fetching data from local and it'll load very fast
    const loadingTimeOut: ReturnType<typeof setTimeout> = setTimeout(
      () => setIsLoading(false),
      1500,
    );

    return () => {
      if (loadingTimeOut) clearTimeout(loadingTimeOut);
    };
  }, []);

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
      const title: string = node.id.toString();

      if (node.id === 'cost') return <ProgressBar value={50} title={title} />;

      return (
        <p title={title} style={{ textAlign: 'center' }}>
          {node.id}
        </p>
      );
    },
    [],
  );

  const handleNodePropertiesClick = React.useCallback(
    (node: NodeType): void => {
      setNode(node);
      if (!isPanelOpen) setIsPanelOpen(true);
    },
    [isPanelOpen],
  );

  const handleOnIsOpenChange = React.useCallback((): void => {
    setIsPanelOpen(false);
    setData({
      links: data.links,
      nodes: data.nodes.map((n: NodeType) => {
        n.isSelected = false;
        return n;
      }),
    });
  }, [data.links, data.nodes]);

  return (
    <Shell className={classes.root}>
      <div className={classes.container}>
        <Topbar pageTitle="InfoMap Basics" />
        <ShellMain>
          <ShellContent>
            {showIf(node && node.shape === Shape.Rectangle)(
              <InfoMapModalDemo
                node={node}
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
              />,
            )}
            <InfoMap
              header="Header Text"
              footer="Footer Text"
              data={data}
              isLoading={isLoading}
              nodeConfig={{
                labelContent: getLabelContent,
                overflowItems: getOverflowItems,
                onNodePropertiesClick: handleNodePropertiesClick,
                nodeToolTip: (node: NodeType) => `Uxt-${node.id}`,
              }}
            />
          </ShellContent>
        </ShellMain>
      </div>
      <DetailsPanel isOpen={isPanelOpen} onIsOpenChange={handleOnIsOpenChange}>
        <div className={classes.panel}>
          <PropertySection
            data={{
              'First Name': 'Chuck',
              'Last Name': 'Testa',
              Location: 'Texas',
            }}
            isCollapsible={true}
            name={node && node.id.toString().toUpperCase()}
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
            name={node && node.id.toString().toUpperCase()}
            nameColumnWidth={nameColumnWidth}
            onNameColumnWidthChange={setNameColumnWidth}
          />
        </div>
      </DetailsPanel>
    </Shell>
  );
}
