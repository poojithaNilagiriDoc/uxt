import { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette';
import { transparentize } from 'polished';
import createUxtTheme from './_internal/base';

export default createUxtTheme(baseTheme => ({
  palette: {
    action: {
      selected: transparentize(
        0.8,
        (baseTheme.palette.primary as SimplePaletteColorOptions).main,
      ),
    },
    background: {
      default: '#f5f5f5', // More contrast than MUI default color
      topbar: (baseTheme.palette.primary as SimplePaletteColorOptions).main,
    },
    text: {
      link: (baseTheme.palette.primary as SimplePaletteColorOptions).main,
    },
  },
}));
