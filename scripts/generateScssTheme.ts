import fs from 'fs';
import path from 'path';
import startCase from 'lodash/fp/startCase';
const themeName = process.argv[2];
const theme = require(`../themes/${themeName}`).default;

const contents = `/**
  UXT ${startCase(themeName)} Theme
*/

$uxt-theme-palette-action-active: ${theme.palette.action.active};
$uxt-theme-palette-action-hover: ${theme.palette.action.hover};
$uxt-theme-palette-action-hover-opacity: ${theme.palette.action.hoverOpacity};
$uxt-theme-palette-action-selected: ${theme.palette.action.selected};
$uxt-theme-palette-action-disabled: ${theme.palette.action.disabled};
$uxt-theme-palette-action-disabled-background: ${
  theme.palette.action.disabledBackground
};
$uxt-theme-palette-background-paper: ${theme.palette.background.paper};
$uxt-theme-palette-background-default: ${theme.palette.background.default};
$uxt-theme-palette-background-sidebar: ${theme.palette.background.sidebar};
$uxt-theme-palette-background-thumb: ${theme.palette.background.thumb};
$uxt-theme-palette-background-topbar: ${theme.palette.background.topbar};
$uxt-theme-palette-divider: ${theme.palette.divider};
$uxt-theme-palette-text-primary: ${theme.palette.text.primary};
$uxt-theme-palette-text-secondary: ${theme.palette.text.secondary};
$uxt-theme-palette-text-disabled: ${theme.palette.text.disabled};
$uxt-theme-palette-text-hint: ${theme.palette.text.hint};
$uxt-theme-palette-text-link: ${theme.palette.text.link};

/**
  Base theme from this point -------
*/

// Breakpoint Values
$uxt-theme-breakpoints-values-xs: ${theme.breakpoints.values.xs}px;
$uxt-theme-breakpoints-values-sm: ${theme.breakpoints.values.sm}px;
$uxt-theme-breakpoints-values-md: ${theme.breakpoints.values.md}px;
$uxt-theme-breakpoints-values-lg: ${theme.breakpoints.values.lg}px;
$uxt-theme-breakpoints-values-xl: ${theme.breakpoints.values.xl}px;

// Common Heights
$uxt-theme-height-input: ${theme.height.input}px;
$uxt-theme-height-item: ${theme.height.item}px;
$uxt-theme-height-toolbar: ${theme.height.toolbar}px;

// Mixins
@mixin uxtThemeMixinsAbsoluteFill {
  bottom: ${theme.mixins.absoluteFill.bottom};
  left: ${theme.mixins.absoluteFill.left};
  position: ${theme.mixins.absoluteFill.position};
  right: ${theme.mixins.absoluteFill.right};
  top: ${theme.mixins.absoluteFill.top};
}

@mixin uxtThemeMixinsReadableWidth {
  max-width: ${theme.mixins.readableWidth.maxWidth}px;
  width: ${theme.mixins.readableWidth.width};
}

// Base Palette
$uxt-theme-palette-common-black: ${theme.palette.common.black};
$uxt-theme-palette-common-white: ${theme.palette.common.white};

$uxt-theme-palette-error-light: ${theme.palette.error.light};
$uxt-theme-palette-error-main: ${theme.palette.error.main};
$uxt-theme-palette-error-dark: ${theme.palette.error.dark};
$uxt-theme-palette-error-contrast-text: ${theme.palette.error.contrastText};

$uxt-theme-palette-grey-50: ${theme.palette.grey[50]};
$uxt-theme-palette-grey-100: ${theme.palette.grey[100]};
$uxt-theme-palette-grey-200: ${theme.palette.grey[200]};
$uxt-theme-palette-grey-300: ${theme.palette.grey[300]};
$uxt-theme-palette-grey-400: ${theme.palette.grey[400]};
$uxt-theme-palette-grey-500: ${theme.palette.grey[500]};
$uxt-theme-palette-grey-600: ${theme.palette.grey[600]};
$uxt-theme-palette-grey-700: ${theme.palette.grey[700]};
$uxt-theme-palette-grey-800: ${theme.palette.grey[800]};
$uxt-theme-palette-grey-900: ${theme.palette.grey[900]};
$uxt-theme-palette-grey-A100: ${theme.palette.grey['A100']};
$uxt-theme-palette-grey-A200: ${theme.palette.grey['A200']};
$uxt-theme-palette-grey-A400: ${theme.palette.grey['A400']};
$uxt-theme-palette-grey-A700: ${theme.palette.grey['A700']};

$uxt-theme-palette-primary-light: ${theme.palette.primary.light};
$uxt-theme-palette-primary-main: ${theme.palette.primary.main};
$uxt-theme-palette-primary-dark: ${theme.palette.primary.dark};
$uxt-theme-palette-primary-contrast-text: ${theme.palette.primary.contrastText};

$uxt-theme-palette-secondary-light: ${theme.palette.secondary.light};
$uxt-theme-palette-secondary-main: ${theme.palette.secondary.main};
$uxt-theme-palette-secondary-dark: ${theme.palette.secondary.dark};
$uxt-theme-palette-secondary-contrast-text: ${
  theme.palette.secondary.contrastText
};

$uxt-theme-palette-success-light: ${theme.palette.success.light};
$uxt-theme-palette-success-main: ${theme.palette.success.main};
$uxt-theme-palette-success-dark: ${theme.palette.success.dark};
$uxt-theme-palette-success-contrast-text: ${theme.palette.success.contrastText};

$uxt-theme-palette-warning-light: ${theme.palette.warning.light};
$uxt-theme-palette-warning-main: ${theme.palette.warning.main};
$uxt-theme-palette-warning-dark: ${theme.palette.warning.dark};
$uxt-theme-palette-warning-contrast-text: ${theme.palette.warning.contrastText};

// Miscellaneous Shape Values
$uxt-theme-shape-border-radius: ${theme.shape.borderRadius}px;

// Shadows
$uxt-theme-shadows-0: ${theme.shadows[0]};
$uxt-theme-shadows-1: ${theme.shadows[1]};
$uxt-theme-shadows-2: ${theme.shadows[2]};
$uxt-theme-shadows-3: ${theme.shadows[3]};
$uxt-theme-shadows-4: ${theme.shadows[4]};
$uxt-theme-shadows-5: ${theme.shadows[5]};
$uxt-theme-shadows-6: ${theme.shadows[6]};
$uxt-theme-shadows-7: ${theme.shadows[7]};
$uxt-theme-shadows-8: ${theme.shadows[8]};
$uxt-theme-shadows-9: ${theme.shadows[9]};
$uxt-theme-shadows-10: ${theme.shadows[10]};
$uxt-theme-shadows-11: ${theme.shadows[11]};
$uxt-theme-shadows-12: ${theme.shadows[12]};
$uxt-theme-shadows-13: ${theme.shadows[13]};
$uxt-theme-shadows-14: ${theme.shadows[14]};
$uxt-theme-shadows-15: ${theme.shadows[15]};
$uxt-theme-shadows-16: ${theme.shadows[16]};
$uxt-theme-shadows-17: ${theme.shadows[17]};
$uxt-theme-shadows-18: ${theme.shadows[18]};
$uxt-theme-shadows-19: ${theme.shadows[19]};
$uxt-theme-shadows-20: ${theme.shadows[20]};
$uxt-theme-shadows-21: ${theme.shadows[21]};
$uxt-theme-shadows-22: ${theme.shadows[22]};
$uxt-theme-shadows-23: ${theme.shadows[23]};
$uxt-theme-shadows-24: ${theme.shadows[24]};

// Hexagon palette
$uxt-theme-palette-hexagon-purple-0: ${theme.palette.hexagon.purple[0]};
$uxt-theme-palette-hexagon-purple-1: ${theme.palette.hexagon.purple[1]};
$uxt-theme-palette-hexagon-purple-2: ${theme.palette.hexagon.purple[2]};
$uxt-theme-palette-hexagon-purple-3: ${theme.palette.hexagon.purple[3]};

$uxt-theme-palette-hexagon-indigo-0: ${theme.palette.hexagon.indigo[0]};
$uxt-theme-palette-hexagon-indigo-1: ${theme.palette.hexagon.indigo[1]};
$uxt-theme-palette-hexagon-indigo-2: ${theme.palette.hexagon.indigo[2]};
$uxt-theme-palette-hexagon-indigo-3: ${theme.palette.hexagon.indigo[3]};

$uxt-theme-palette-hexagon-blue-0: ${theme.palette.hexagon.blue[0]};
$uxt-theme-palette-hexagon-blue-1: ${theme.palette.hexagon.blue[1]};
$uxt-theme-palette-hexagon-blue-2: ${theme.palette.hexagon.blue[2]};
$uxt-theme-palette-hexagon-blue-3: ${theme.palette.hexagon.blue[3]};

$uxt-theme-palette-hexagon-deepBlue-0: ${theme.palette.hexagon.deepBlue[0]};
$uxt-theme-palette-hexagon-deepBlue-1: ${theme.palette.hexagon.deepBlue[1]};
$uxt-theme-palette-hexagon-deepBlue-2: ${theme.palette.hexagon.deepBlue[2]};
$uxt-theme-palette-hexagon-deepBlue-3: ${theme.palette.hexagon.deepBlue[3]};

$uxt-theme-palette-hexagon-inkBlue-0: ${theme.palette.hexagon.inkBlue[0]};
$uxt-theme-palette-hexagon-inkBlue-1: ${theme.palette.hexagon.inkBlue[1]};
$uxt-theme-palette-hexagon-inkBlue-2: ${theme.palette.hexagon.inkBlue[2]};
$uxt-theme-palette-hexagon-inkBlue-3: ${theme.palette.hexagon.inkBlue[3]};

$uxt-theme-palette-hexagon-ceruleanBlue-0: ${
  theme.palette.hexagon.ceruleanBlue[0]
};
$uxt-theme-palette-hexagon-ceruleanBlue-1: ${
  theme.palette.hexagon.ceruleanBlue[1]
};
$uxt-theme-palette-hexagon-ceruleanBlue-2: ${
  theme.palette.hexagon.ceruleanBlue[2]
};
$uxt-theme-palette-hexagon-ceruleanBlue-3: ${
  theme.palette.hexagon.ceruleanBlue[3]
};

$uxt-theme-palette-hexagon-darkCeruleanBlue-0: ${
  theme.palette.hexagon.darkCeruleanBlue[0]
};
$uxt-theme-palette-hexagon-darkCeruleanBlue-1: ${
  theme.palette.hexagon.darkCeruleanBlue[1]
};
$uxt-theme-palette-hexagon-darkCeruleanBlue-2: ${
  theme.palette.hexagon.darkCeruleanBlue[2]
};
$uxt-theme-palette-hexagon-darkCeruleanBlue-3: ${
  theme.palette.hexagon.darkCeruleanBlue[3]
};

$uxt-theme-palette-hexagon-blueLagoon-0: ${theme.palette.hexagon.blueLagoon[0]};
$uxt-theme-palette-hexagon-blueLagoon-1: ${theme.palette.hexagon.blueLagoon[1]};
$uxt-theme-palette-hexagon-blueLagoon-2: ${theme.palette.hexagon.blueLagoon[2]};
$uxt-theme-palette-hexagon-blueLagoon-3: ${theme.palette.hexagon.blueLagoon[3]};

$uxt-theme-palette-hexagon-mediumCeruleanBlue-0: ${
  theme.palette.hexagon.mediumCeruleanBlue[0]
};
$uxt-theme-palette-hexagon-mediumCeruleanBlue-1: ${
  theme.palette.hexagon.mediumCeruleanBlue[1]
};
$uxt-theme-palette-hexagon-mediumCeruleanBlue-2: ${
  theme.palette.hexagon.mediumCeruleanBlue[2]
};
$uxt-theme-palette-hexagon-mediumCeruleanBlue-3: ${
  theme.palette.hexagon.mediumCeruleanBlue[3]
};

$uxt-theme-palette-hexagon-cyan-0: ${theme.palette.hexagon.cyan[0]};
$uxt-theme-palette-hexagon-cyan-1: ${theme.palette.hexagon.cyan[1]};
$uxt-theme-palette-hexagon-cyan-2: ${theme.palette.hexagon.cyan[2]};
$uxt-theme-palette-hexagon-cyan-3: ${theme.palette.hexagon.cyan[3]};

$uxt-theme-palette-hexagon-deepCyan-0: ${theme.palette.hexagon.deepCyan[0]};
$uxt-theme-palette-hexagon-deepCyan-1: ${theme.palette.hexagon.deepCyan[1]};
$uxt-theme-palette-hexagon-deepCyan-2: ${theme.palette.hexagon.deepCyan[2]};
$uxt-theme-palette-hexagon-deepCyan-3: ${theme.palette.hexagon.deepCyan[3]};

$uxt-theme-palette-hexagon-deepTeal-0: ${theme.palette.hexagon.deepTeal[0]};
$uxt-theme-palette-hexagon-deepTeal-1: ${theme.palette.hexagon.deepTeal[1]};
$uxt-theme-palette-hexagon-deepTeal-2: ${theme.palette.hexagon.deepTeal[2]};
$uxt-theme-palette-hexagon-deepTeal-3: ${theme.palette.hexagon.deepTeal[3]};

$uxt-theme-palette-hexagon-watercourse-0: ${
  theme.palette.hexagon.watercourse[0]
};
$uxt-theme-palette-hexagon-watercourse-1: ${
  theme.palette.hexagon.watercourse[1]
};
$uxt-theme-palette-hexagon-watercourse-2: ${
  theme.palette.hexagon.watercourse[2]
};
$uxt-theme-palette-hexagon-watercourse-3: ${
  theme.palette.hexagon.watercourse[3]
};

$uxt-theme-palette-hexagon-deepGreen-0: ${theme.palette.hexagon.deepGreen[0]};
$uxt-theme-palette-hexagon-deepGreen-1: ${theme.palette.hexagon.deepGreen[1]};
$uxt-theme-palette-hexagon-deepGreen-2: ${theme.palette.hexagon.deepGreen[2]};
$uxt-theme-palette-hexagon-deepGreen-3: ${theme.palette.hexagon.deepGreen[3]};

$uxt-theme-palette-hexagon-shamrockGreen-0: ${
  theme.palette.hexagon.shamrockGreen[0]
};
$uxt-theme-palette-hexagon-shamrockGreen-1: ${
  theme.palette.hexagon.shamrockGreen[1]
};
$uxt-theme-palette-hexagon-shamrockGreen-2: ${
  theme.palette.hexagon.shamrockGreen[2]
};
$uxt-theme-palette-hexagon-shamrockGreen-3: ${
  theme.palette.hexagon.shamrockGreen[3]
};

$uxt-theme-palette-hexagon-pigmentGreen-0: ${
  theme.palette.hexagon.pigmentGreen[0]
};
$uxt-theme-palette-hexagon-pigmentGreen-1: ${
  theme.palette.hexagon.pigmentGreen[1]
};
$uxt-theme-palette-hexagon-pigmentGreen-2: ${
  theme.palette.hexagon.pigmentGreen[2]
};
$uxt-theme-palette-hexagon-pigmentGreen-3: ${
  theme.palette.hexagon.pigmentGreen[3]
};

$uxt-theme-palette-hexagon-lightGreen-0: ${theme.palette.hexagon.lightGreen[0]};
$uxt-theme-palette-hexagon-lightGreen-1: ${theme.palette.hexagon.lightGreen[1]};
$uxt-theme-palette-hexagon-lightGreen-2: ${theme.palette.hexagon.lightGreen[2]};
$uxt-theme-palette-hexagon-lightGreen-3: ${theme.palette.hexagon.lightGreen[3]};

$uxt-theme-palette-hexagon-yellowGreen-0: ${
  theme.palette.hexagon.yellowGreen[0]
};
$uxt-theme-palette-hexagon-yellowGreen-1: ${
  theme.palette.hexagon.yellowGreen[1]
};
$uxt-theme-palette-hexagon-yellowGreen-2: ${
  theme.palette.hexagon.yellowGreen[2]
};
$uxt-theme-palette-hexagon-yellowGreen-3: ${
  theme.palette.hexagon.yellowGreen[3]
};

$uxt-theme-palette-hexagon-lime-0: ${theme.palette.hexagon.lime[0]};
$uxt-theme-palette-hexagon-lime-1: ${theme.palette.hexagon.lime[1]};
$uxt-theme-palette-hexagon-lime-2: ${theme.palette.hexagon.lime[2]};
$uxt-theme-palette-hexagon-lime-3: ${theme.palette.hexagon.lime[3]};

$uxt-theme-palette-hexagon-orange-0: ${theme.palette.hexagon.orange[0]};
$uxt-theme-palette-hexagon-orange-1: ${theme.palette.hexagon.orange[1]};
$uxt-theme-palette-hexagon-orange-2: ${theme.palette.hexagon.orange[2]};
$uxt-theme-palette-hexagon-orange-3: ${theme.palette.hexagon.orange[3]};

$uxt-theme-palette-hexagon-deepOrange-0: ${theme.palette.hexagon.deepOrange[0]};
$uxt-theme-palette-hexagon-deepOrange-1: ${theme.palette.hexagon.deepOrange[1]};
$uxt-theme-palette-hexagon-deepOrange-2: ${theme.palette.hexagon.deepOrange[2]};
$uxt-theme-palette-hexagon-deepOrange-3: ${theme.palette.hexagon.deepOrange[3]};

$uxt-theme-palette-hexagon-tenneOrange-0: ${
  theme.palette.hexagon.tenneOrange[0]
};
$uxt-theme-palette-hexagon-tenneOrange-1: ${
  theme.palette.hexagon.tenneOrange[1]
};
$uxt-theme-palette-hexagon-tenneOrange-2: ${
  theme.palette.hexagon.tenneOrange[2]
};
$uxt-theme-palette-hexagon-tenneOrange-3: ${
  theme.palette.hexagon.tenneOrange[3]
};

$uxt-theme-palette-hexagon-rust-0: ${theme.palette.hexagon.rust[0]};
$uxt-theme-palette-hexagon-rust-1: ${theme.palette.hexagon.rust[1]};
$uxt-theme-palette-hexagon-rust-2: ${theme.palette.hexagon.rust[2]};
$uxt-theme-palette-hexagon-rust-3: ${theme.palette.hexagon.rust[3]};

$uxt-theme-palette-hexagon-reddishBrown-0: ${
  theme.palette.hexagon.reddishBrown[0]
};
$uxt-theme-palette-hexagon-reddishBrown-1: ${
  theme.palette.hexagon.reddishBrown[1]
};
$uxt-theme-palette-hexagon-reddishBrown-2: ${
  theme.palette.hexagon.reddishBrown[2]
};
$uxt-theme-palette-hexagon-reddishBrown-3: ${
  theme.palette.hexagon.reddishBrown[3]
};

$uxt-theme-palette-hexagon-brown-0: ${theme.palette.hexagon.brown[0]};
$uxt-theme-palette-hexagon-brown-1: ${theme.palette.hexagon.brown[1]};
$uxt-theme-palette-hexagon-brown-2: ${theme.palette.hexagon.brown[2]};
$uxt-theme-palette-hexagon-brown-3: ${theme.palette.hexagon.brown[3]};

$uxt-theme-palette-hexagon-darkRed-0: ${theme.palette.hexagon.darkRed[0]};
$uxt-theme-palette-hexagon-darkRed-1: ${theme.palette.hexagon.darkRed[1]};
$uxt-theme-palette-hexagon-darkRed-2: ${theme.palette.hexagon.darkRed[2]};
$uxt-theme-palette-hexagon-darkRed-3: ${theme.palette.hexagon.darkRed[3]};

$uxt-theme-palette-hexagon-raven-0: ${theme.palette.hexagon.raven[0]};
$uxt-theme-palette-hexagon-raven-1: ${theme.palette.hexagon.raven[1]};
$uxt-theme-palette-hexagon-raven-2: ${theme.palette.hexagon.raven[2]};
$uxt-theme-palette-hexagon-raven-3: ${theme.palette.hexagon.raven[3]};

$uxt-theme-palette-hexagon-deepGray-0: ${theme.palette.hexagon.deepGray[0]};
$uxt-theme-palette-hexagon-deepGray-1: ${theme.palette.hexagon.deepGray[1]};
$uxt-theme-palette-hexagon-deepGray-2: ${theme.palette.hexagon.deepGray[2]};
$uxt-theme-palette-hexagon-deepGray-3: ${theme.palette.hexagon.deepGray[3]};

// Base Spacing Unit (Should be multiplied by whatever step is needed)
$uxt-theme-spacing: ${theme.spacing(1)}px;
// Old variables conversion for reference:
// $uxt-margin-xs -> $uxt-theme-spacing * 0.5;
// $uxt-margin-s -> $uxt-theme-spacing * 1;
// $uxt-margin-m -> $uxt-theme-spacing * 2;
// $uxt-margin-l -> $uxt-theme-spacing * 4;
// $uxt-margin-xl -> $uxt-theme-spacing * 8;

// Typography
$uxt-theme-typography-h1-font-family: ${theme.typography.h1.fontFamily};
$uxt-theme-typography-h1-font-weight: ${theme.typography.h1.fontWeight};
$uxt-theme-typography-h1-font-size: ${theme.typography.h1.fontSize};
$uxt-theme-typography-h1-line-height: ${theme.typography.h1.lineHeight};
$uxt-theme-typography-h1-letter-spacing: ${theme.typography.h1.letterSpacing};

$uxt-theme-typography-h2-font-family: ${theme.typography.h2.fontFamily};
$uxt-theme-typography-h2-font-weight: ${theme.typography.h2.fontWeight};
$uxt-theme-typography-h2-font-size: ${theme.typography.h2.fontSize};
$uxt-theme-typography-h2-line-height: ${theme.typography.h2.lineHeight};
$uxt-theme-typography-h2-letter-spacing: ${theme.typography.h2.letterSpacing};

$uxt-theme-typography-h3-font-family: ${theme.typography.h3.fontFamily};
$uxt-theme-typography-h3-font-weight: ${theme.typography.h3.fontWeight};
$uxt-theme-typography-h3-font-size: ${theme.typography.h3.fontSize};
$uxt-theme-typography-h3-line-height: ${theme.typography.h3.lineHeight};
$uxt-theme-typography-h3-letter-spacing: ${theme.typography.h3.letterSpacing};

$uxt-theme-typography-h4-font-family: ${theme.typography.h4.fontFamily};
$uxt-theme-typography-h4-font-weight: ${theme.typography.h4.fontWeight};
$uxt-theme-typography-h4-font-size: ${theme.typography.h4.fontSize};
$uxt-theme-typography-h4-line-height: ${theme.typography.h4.lineHeight};
$uxt-theme-typography-h4-letter-spacing: ${theme.typography.h4.letterSpacing};

$uxt-theme-typography-h5-font-family: ${theme.typography.h5.fontFamily};
$uxt-theme-typography-h5-font-weight: ${theme.typography.h5.fontWeight};
$uxt-theme-typography-h5-font-size: ${theme.typography.h5.fontSize};
$uxt-theme-typography-h5-line-height: ${theme.typography.h5.lineHeight};
$uxt-theme-typography-h5-letter-spacing: ${theme.typography.h5.letterSpacing};

$uxt-theme-typography-h6-font-family: ${theme.typography.h6.fontFamily};
$uxt-theme-typography-h6-font-weight: ${theme.typography.h6.fontWeight};
$uxt-theme-typography-h6-font-size: ${theme.typography.h6.fontSize};
$uxt-theme-typography-h6-line-height: ${theme.typography.h6.lineHeight};
$uxt-theme-typography-h6-letter-spacing: ${theme.typography.h6.letterSpacing};

$uxt-theme-typography-subtitle1-font-family: ${
  theme.typography.subtitle1.fontFamily
};
$uxt-theme-typography-subtitle1-font-weight: ${
  theme.typography.subtitle1.fontWeight
};
$uxt-theme-typography-subtitle1-font-size: ${
  theme.typography.subtitle1.fontSize
};
$uxt-theme-typography-subtitle1-line-height: ${
  theme.typography.subtitle1.lineHeight
};
$uxt-theme-typography-subtitle1-letter-spacing: ${
  theme.typography.subtitle1.letterSpacing
};

$uxt-theme-typography-subtitle2-font-family: ${
  theme.typography.subtitle2.fontFamily
};
$uxt-theme-typography-subtitle2-font-weight: ${
  theme.typography.subtitle2.fontWeight
};
$uxt-theme-typography-subtitle2-font-size: ${
  theme.typography.subtitle2.fontSize
};
$uxt-theme-typography-subtitle2-line-height: ${
  theme.typography.subtitle2.lineHeight
};
$uxt-theme-typography-subtitle2-letter-spacing: ${
  theme.typography.subtitle2.letterSpacing
};

$uxt-theme-typography-body1-font-family: ${theme.typography.body1.fontFamily};
$uxt-theme-typography-body1-font-weight: ${theme.typography.body1.fontWeight};
$uxt-theme-typography-body1-font-size: ${theme.typography.body1.fontSize};
$uxt-theme-typography-body1-line-height: ${theme.typography.body1.lineHeight};
$uxt-theme-typography-body1-letter-spacing: ${
  theme.typography.body1.letterSpacing
};

$uxt-theme-typography-body2-font-family: ${theme.typography.body2.fontFamily};
$uxt-theme-typography-body2-font-weight: ${theme.typography.body2.fontWeight};
$uxt-theme-typography-body2-font-size: ${theme.typography.body2.fontSize};
$uxt-theme-typography-body2-line-height: ${theme.typography.body2.lineHeight};
$uxt-theme-typography-body2-letter-spacing: ${
  theme.typography.body2.letterSpacing
};

$uxt-theme-typography-button-font-family: ${theme.typography.button.fontFamily};
$uxt-theme-typography-button-font-weight: ${theme.typography.button.fontWeight};
$uxt-theme-typography-button-font-size: ${theme.typography.button.fontSize};
$uxt-theme-typography-button-line-height: ${theme.typography.button.lineHeight};
$uxt-theme-typography-button-letter-spacing: ${
  theme.typography.button.letterSpacing
};
$uxt-theme-typography-button-text-transform: ${
  theme.typography.button.textTransform
};

$uxt-theme-typography-caption-font-family: ${
  theme.typography.caption.fontFamily
};
$uxt-theme-typography-caption-font-weight: ${
  theme.typography.caption.fontWeight
};
$uxt-theme-typography-caption-font-size: ${theme.typography.caption.fontSize};
$uxt-theme-typography-caption-line-height: ${
  theme.typography.caption.lineHeight
};
$uxt-theme-typography-caption-letter-spacing: ${
  theme.typography.caption.letterSpacing
};

$uxt-theme-typography-overline-font-family: ${
  theme.typography.overline.fontFamily
};
$uxt-theme-typography-overline-font-weight: ${
  theme.typography.overline.fontWeight
};
$uxt-theme-typography-overline-font-size: ${theme.typography.overline.fontSize};
$uxt-theme-typography-overline-line-height: ${
  theme.typography.overline.lineHeight
};
$uxt-theme-typography-overline-letter-spacing: ${
  theme.typography.overline.letterSpacing
};
$uxt-theme-typography-overline-text-transform: ${
  theme.typography.overline.textTransform
};

// Z-Indices
$uxt-theme-z-index-mobile-stepper: ${theme.zIndex.mobileStepper};
$uxt-theme-z-index-app-bar: ${theme.zIndex.appBar};
$uxt-theme-z-index-drawer: ${theme.zIndex.drawer};
$uxt-theme-z-index-modal: ${theme.zIndex.modal};
$uxt-theme-z-index-snackbar: ${theme.zIndex.snackbar};
$uxt-theme-z-index-tooltip: ${theme.zIndex.tooltip};
$uxt-theme-z-index-dropdown-list-popup: ${theme.zIndex.dropdownListPopup};
$uxt-theme-z-index-data-table-column-header: ${
  theme.zIndex.dataTableColumnHeader
};
$uxt-theme-z-index-sidebar: ${theme.zIndex.sidebar};
$uxt-theme-z-index-overlay: ${theme.zIndex.overlay};
$uxt-theme-z-index-filter-panel: ${theme.zIndex.filterPanel};
$uxt-theme-z-index-topbar: ${theme.zIndex.topbar};
$uxt-theme-z-index-details-panel: ${theme.zIndex.detailsPanel};
$uxt-theme-z-index-popup: ${theme.zIndex.popup};
$uxt-theme-z-index-dialog: ${theme.zIndex.dialog};
$uxt-theme-z-index-overflow-button-overlay: ${
  theme.zIndex.overflowButtonOverlay
};
$uxt-theme-z-index-tabs-overlay: ${theme.zIndex.tabsOverlay};
$uxt-theme-z-index-overflow-button-popup: ${theme.zIndex.overflowButtonPopup};
$uxt-theme-z-index-tabs-popup: ${theme.zIndex.tabsPopup};
$uxt-theme-z-index-notification-panel: ${theme.zIndex.notificationPanel};
`;

fs.writeFile(
  path.join(__dirname, `../themes/${themeName}.scss`),
  contents,
  'utf8',
  error => {
    if (error) {
      throw error;
    }

    console.log(`Successfully wrote themes/${themeName}.scss!`);
  },
);
