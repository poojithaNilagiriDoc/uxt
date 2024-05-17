import { Mixins } from '@material-ui/core/styles/createMixins';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {
  Palette,
  PaletteColor,
  TypeBackground,
  TypeText,
} from '@material-ui/core/styles/createPalette';
import { ZIndex } from '@material-ui/core/styles/zIndex';
import React from 'react';

export interface UxtMixins extends Mixins {
  absoluteFill: {
    bottom: React.CSSProperties['bottom'];
    left: React.CSSProperties['left'];
    position: React.CSSProperties['position'];
    right: React.CSSProperties['right'];
    top: React.CSSProperties['top'];
  };
  readableWidth: {
    maxWidth: React.CSSProperties['maxWidth'];
    width: React.CSSProperties['width'];
  };
}

export interface UxtTypeBackground extends TypeBackground {
  sidebar?: string;
  thumb?: string;
  topbar?: string;
}

export interface UxtHeight {
  input: number;
  item: number;
  toolbar: number;
}

export interface UxtTypeText extends TypeText {
  link: string;
}

export interface HexagonColor {
  0?: string;
  1?: string;
  2?: string;
  3?: string;
}

export interface HexagonColorOptions {
  purple: HexagonColor;
  indigo: HexagonColor;
  blue: HexagonColor;
  deepBlue: HexagonColor;
  inkBlue: HexagonColor;
  ceruleanBlue: HexagonColor;
  darkCeruleanBlue: HexagonColor;
  blueLagoon: HexagonColor;
  mediumCeruleanBlue: HexagonColor;
  cyan: HexagonColor;
  deepCyan: HexagonColor;
  deepTeal: HexagonColor;
  watercourse: HexagonColor;
  deepGreen: HexagonColor;
  shamrockGreen: HexagonColor;
  pigmentGreen: HexagonColor;
  lightGreen: HexagonColor;
  yellowGreen: HexagonColor;
  lime: HexagonColor;
  orange: HexagonColor;
  deepOrange: HexagonColor;
  tenneOrange: HexagonColor;
  rust: HexagonColor;
  reddishBrown: HexagonColor;
  brown: HexagonColor;
  darkRed: HexagonColor;
  raven: HexagonColor;
  deepGray: HexagonColor;
}

export interface UxtPalette extends Palette {
  background: UxtTypeBackground;
  success: PaletteColor;
  text: UxtTypeText;
  warning: PaletteColor;
  hexagon: HexagonColorOptions;
}

export interface UxtZIndex extends ZIndex {
  dropdownListPopup: number;
  dataTableColumnHeader: number;
  sidebar: number;
  overlay: number;
  filterPanel: number;
  topbar: number;
  detailsPanel: number;
  popup: number;
  dialog: number;
  modal: number;
  overflowButtonOverlay: number;
  tabsOverlay: number;
  overflowButtonPopup: number;
  tabsPopup: number;
  notificationPanel: number;
}

export interface UxtTheme extends Theme {
  height: UxtHeight;
  mixins: UxtMixins;
  palette: UxtPalette;
  zIndex: UxtZIndex;
}
