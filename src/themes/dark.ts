import { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette';
import { transparentize } from 'polished';
import createUxtTheme from './_internal/base';

export default createUxtTheme(baseTheme => ({
  palette: {
    action: {
      selected: transparentize(
        0.5,
        (baseTheme.palette.primary as SimplePaletteColorOptions).main,
      ),
    },
    background: {
      default: '#171717',
      paper: '#282828',
      topbar: (baseTheme.palette.primary as SimplePaletteColorOptions).dark,
    },
    divider: 'rgba(255, 255, 255, 0.3)',
    text: {
      link: (baseTheme.palette.primary as SimplePaletteColorOptions).light,
    },
    type: 'dark',
  },
}));
