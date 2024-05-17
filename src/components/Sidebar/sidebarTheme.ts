import deepmerge from 'deepmerge';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { UxtTheme } from '../../themes/UxtTheme';
import darkTheme from '../../themes/dark';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey {
    UxtListItem?: 'root' | 'selected';
    UxtNestedListItem?: 'root' | 'selected';
    UxtNestedListChildItem?: 'root' | 'selected';
    UxtTreeItem?: 'root' | 'selected';
    UxtUserMenu?: 'header' | 'items';
    UxtUserMenuItem?: 'root';
  }
}

const stateStyles = {
  '&:hover::after': {
    backgroundColor: darkTheme.palette.action.hover,
  },
  '&:active::after': {
    backgroundColor: darkTheme.palette.action.disabled,
  },
};
const selectedStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '&::before': {
    backgroundColor: darkTheme.palette.background.topbar,
    bottom: 0,
    content: '""',
    display: 'block',
    left: 0,
    position: 'absolute',
    top: 0,
    width: 4,
  },
};

export default (themeToExtend: UxtTheme) =>
  createMuiTheme(
    deepmerge(themeToExtend, {
      overrides: {
        UxtListItem: {
          root: stateStyles,
          selected: selectedStyles,
        },
        UxtNestedListChildItem: {
          root: stateStyles,
          selected: selectedStyles,
        },
        UxtNestedListItem: {
          content: stateStyles,
          selected: {
            '& $content': selectedStyles,
          },
        },
        UxtTreeItem: {
          root: stateStyles,
          selected: selectedStyles,
        },
        UxtUserMenu: {
          header: {
            borderBottomColor: darkTheme.palette.divider,
          },
          items: {
            boxShadow: `0 -1px 0 ${darkTheme.palette.divider} inset`,
          },
        },
        UxtUserMenuItem: { root: stateStyles },
      },
    }),
  );
