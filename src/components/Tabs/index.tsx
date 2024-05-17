import classnames from 'classnames';
import getOr from 'lodash/fp/getOr';
import isNil from 'lodash/fp/isNil';
import throttle from 'lodash/fp/throttle';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import ResizeDetector from 'react-resize-detector';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import ContentSwitcher from '../_internal/ContentSwitcher';
import TabBar from '../_internal/TabBar';
import type { IconButtonProps } from '../IconButton';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      toolbar: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flex: '0 0 auto',
        zIndex: 'inherit',
      },
      tabBar: {},
      tabBarWrapper: {
        display: 'flex',
        width: '100%',
      },
      view: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      centered: {
        '& $toolbar': {
          justifyContent: 'center',
        },
        '& $tabBarWrapper': {
          maxWidth: theme.breakpoints.values.sm - 1,
        },
      },
    }),
  { name: 'UxtTabs' },
);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTabName?: string;
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  isCentered?: boolean;
  maxChars?: number;
  onActiveTabNameChange?: (activeTabName: string) => void;
  overflowIconButtonProps?: Partial<IconButtonProps>;
  useDisplayNone?: boolean;
}

function Tabs(props: TabsProps) {
  const {
    activeTabName,
    children = [],
    className,
    classes: classesProp,
    isCentered = true,
    maxChars = 16,
    onActiveTabNameChange,
    overflowIconButtonProps,
    useDisplayNone,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [tabBarWidth, setTabBarWidth] = React.useState(0);

  const contentMap = React.useMemo(() => {
    const childArray = React.Children.toArray(children);
    if (!(childArray instanceof Array)) return {};
    return (childArray as Array<React.ReactElement<any>>).reduce(
      (
        acc: { [key: string]: React.ReactNode },
        cur: React.ReactElement<any>,
      ) => ({
        ...acc,
        [cur.props.name]: cur.props.children,
      }),
      {},
    );
  }, [children]);

  const fallbackContent = React.useMemo(
    () => getOr(null, '[0].props.children', children),
    [children],
  );

  const tabs = React.useMemo(
    () =>
      React.Children.map(children, (child: React.ReactElement<any>) => ({
        id: child.props.name,
        text: !isNil(child.props.text) ? child.props.text : child.props.name,
        isDisabled: child.props.isDisabled === true,
        iconSvg: child.props.iconSvg,
      })),
    [children],
  );

  const handleResize = React.useCallback(
    throttle(16, function handleResize(width) {
      if (width === undefined) return;

      setTabBarWidth(width);
    }),
    [],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.centered]: isCentered },
        className,
      )}
      {...rest}
    >
      <div className={classes.toolbar}>
        <div className={classes.tabBarWrapper}>
          <ResizeDetector
            handleWidth
            onResize={handleResize}
            refreshMode="throttle"
            refreshRate={50}
          />
          <TabBar
            className={classes.tabBar}
            maxChars={maxChars}
            onSelectedIdChange={onActiveTabNameChange}
            selectedId={activeTabName}
            tabs={tabs}
            width={tabBarWidth}
            overflowIconButtonProps={overflowIconButtonProps}
          />
        </div>
      </div>
      <ContentSwitcher
        className={classes.view}
        contentKey={activeTabName}
        contentMap={contentMap}
        fallbackContent={fallbackContent}
      />
    </div>
  );
}

export default React.memo(Tabs);
