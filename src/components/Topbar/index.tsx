import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import closeSvg from 'uxt-graphics/icons/close';
import hamburger from 'uxt-graphics/icons/hamburger';
import search from 'uxt-graphics/icons/search';
import hideIf from '../_helpers/hideIf';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import SearchCore from '../_internal/SearchCore';
import IconButton from '../IconButton';
import type { IconButtonProps } from '../IconButton';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        boxShadow: theme.shadows[1],
        color: theme.palette.getContrastText(theme.palette.background.topbar),
        display: 'flex',
        fill: theme.palette.getContrastText(theme.palette.background.topbar),
        flex: '0 0 auto',
        minHeight: theme.height.toolbar,
        overflow: 'hidden',
        zIndex: theme.zIndex.topbar,
      },
      // TODO Necessary? Might only be for search
      wrapper: {
        alignItems: 'flex-start',
        backgroundColor: theme.palette.background.topbar,
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      items: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'row',
        height: theme.height.toolbar,
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%',
      },
      menuButton: {
        marginLeft: theme.spacing(-1),
        marginRight: theme.spacing(1),
      },
      pageTitle: {
        flex: '1 1 auto',
        fontSize: '1.25rem',
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      searchButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(-1),
      },
      searchCore: {
        backgroundColor: 'inherit',
        color: 'inherit',
        flex: '1 0 auto',
        overflow: 'hidden',
        paddingLeft: 0,
      },
      searchCoreInput: {
        backgroundColor: 'inherit',
        borderStyle: 'none !important',
        color: 'inherit',
        paddingLeft: '0 !important',
        width: '100%',
      },
      extras: {
        alignItems: 'center',
        display: 'flex',
        overflow: 'hidden',
      },
      searching: {
        '& $wrapper': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fill: theme.palette.action.active,
        },
      },
    }),
  { name: 'UxtTopbar' },
);

export interface TopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  isSearching?: boolean;
  menuIconProps?: Partial<IconButtonProps>;
  onMenuPress?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSearch?: (query: string) => void;
  onSearchPress?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSearchQueryValueChange?: (query: string) => void;
  pageTitle?: React.ReactNode;
  searchIconButtonProps?: Partial<IconButtonProps>;
  searchPlaceholderText?: string;
  searchQueryValue?: string;
  showMenuButton?: boolean;
  showSearchButton?: boolean;
}

const Topbar = React.forwardRef(function Topbar(
  props: TopbarProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const searchInputRef: React.MutableRefObject<HTMLInputElement> =
    React.useRef();
  const {
    children,
    className,
    classes: classesProp,
    isSearching = false,
    menuIconProps,
    onMenuPress,
    onSearch,
    onSearchPress,
    onSearchQueryValueChange,
    pageTitle,
    searchIconButtonProps,
    searchPlaceholderText,
    searchQueryValue,
    showMenuButton,
    showSearchButton,
    ...rest
  } = props;
  const classes = useStyles(props);

  React.useEffect(() => {
    if (isSearching) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.searching]: isSearching },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <div className={classes.wrapper}>
        <div className={classes.items}>
          {showIf(props.showMenuButton && !props.isSearching)(
            <IconButton
              className={classes.menuButton}
              iconSvg={hamburger}
              onClick={props.onMenuPress}
              iconProps={menuIconProps}
            />,
          )}
          {hideIf(isSearching)(
            <h1 className={classes.pageTitle}>{pageTitle}</h1>,
          )}
          {showIf(isSearching)(
            <SearchCore
              className={classes.searchCore}
              classes={{ input: classes.searchCoreInput }}
              inputRef={searchInputRef}
              onSearch={onSearch}
              onValueChange={onSearchQueryValueChange}
              placeholder={searchPlaceholderText}
              value={searchQueryValue}
            />,
          )}
          {hideIf(isSearching)(
            <div className={classes.extras}>{children}</div>,
          )}
          {showIf(showSearchButton)(
            <IconButton
              className={classes.searchButton}
              iconSvg={isSearching ? closeSvg : search}
              onClick={props.onSearchPress}
              {...searchIconButtonProps}
            />,
          )}
        </div>
      </div>
    </div>
  );
});

export default React.memo(Topbar);
