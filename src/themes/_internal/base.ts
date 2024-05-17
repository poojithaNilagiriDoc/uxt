import deepmerge from 'deepmerge';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { HexagonColorOptions } from '../UxtTheme';

declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
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
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    height?: {
      input?: number;
      item?: number;
      toolbar?: number;
    };
  }

  interface Theme {
    height: {
      input: number;
      item: number;
      toolbar: number;
    };
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    hexagon?: HexagonColorOptions;
  }

  interface Palette {
    success: PaletteColor;
    warning: PaletteColor;
    hexagon: HexagonColorOptions;
  }

  interface TypeBackground {
    sidebar?: string;
    thumb?: string;
    topbar?: string;
  }

  interface TypeText {
    link: string;
  }
}

declare module '@material-ui/core/styles/zIndex' {
  interface ZIndex {
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
}

export default function createUxtTheme(
  getOptions: (baseThemeOptions: ThemeOptions) => ThemeOptions,
) {
  const base: ThemeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    height: {
      input: 40,
      item: 48,
      toolbar: 56,
    },
    mixins: {
      absoluteFill: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      readableWidth: {
        maxWidth: 768,
        width: '100%',
      },
    },
    palette: {
      background: {
        sidebar: '#282828',
        thumb: '#fff',
      },
      error: {
        light: '#ff6b55',
        main: '#fc381b',
        dark: '#da2615',
        contrastText: '#fff',
      },
      primary: {
        light: '#5B9AE2',
        main: '#026BE3',
        dark: '#0B5BB6',
        contrastText: '#fff',
      },
      secondary: {
        light: '#5B9AE2',
        main: '#026BE3',
        dark: '#0B5BB6',
        contrastText: '#fff',
      },
      success: {
        light: '#92d771',
        main: '#6fbf50',
        dark: '#49963c',
        contrastText: '#fff',
      },
      warning: {
        light: '#fcd747',
        main: '#febb3f',
        dark: '#fba506',
        contrastText: '#fff',
      },
      text: {
        link: '#026BE3',
      },
      hexagon: {
        purple: {
          0: '#520a76',
          1: '#62269e',
          2: '#783cbd',
          3: '#9778d3',
        },
        indigo: {
          0: '#382bb2',
          1: '#4c4ccc',
          2: '#6d6de2',
          3: '#8b8bfc',
        },
        blue: {
          0: '#1825aa',
          1: '#455cc7',
          2: '#5b87da',
          3: '#7ca3dc',
        },
        deepBlue: {
          0: '#1e428a',
          1: '#446ca9',
          2: '#7ca3dc',
          3: '#a7c5ee',
        },
        inkBlue: {
          0: '#0055b8',
          1: '#007cba',
          2: '#6dabe4',
          3: '#94c0e9',
        },
        ceruleanBlue: {
          0: '#00609c',
          1: '#0082ca',
          2: '#00a8e1',
          3: '#57c1e8',
        },
        darkCeruleanBlue: {
          0: '#004e72',
          1: '#025d88',
          2: '#0370a3',
          3: '#028ccd',
        },
        blueLagoon: {
          0: '#00607f',
          1: '#0069a6',
          2: '#0093c9',
          3: '#00add8',
        },
        mediumCeruleanBlue: {
          0: '#006e96',
          1: '#0084ad',
          2: '#0098ba',
          3: '#08c0de',
        },
        cyan: {
          0: '#007b8a',
          1: '#0096a9',
          2: '#3bb0c9',
          3: '#77c2d4',
        },
        deepCyan: {
          0: '#006068',
          1: '#008996',
          2: '#00a1af',
          3: '#26cad3',
        },
        deepTeal: {
          0: '#005c5d',
          1: '#00837b',
          2: '#009490',
          3: '#00afaa',
        },
        watercourse: {
          0: '#006450',
          1: '#009578',
          2: '#00a887',
          3: '#49c3a5',
        },
        deepGreen: {
          0: '#006241',
          1: '#007a4b',
          2: '#00ad68',
          3: '#7cdfa8',
        },
        shamrockGreen: {
          0: '#00945e',
          1: '#00bd70',
          2: '#6ecb98',
          3: '#92d5ac',
        },
        pigmentGreen: {
          0: '#00953a',
          1: '#23ae49',
          2: '#70c647',
          3: '#bad97a',
        },
        lightGreen: {
          0: '#4c8b2b',
          1: '#4e9d2d',
          2: '#77bc1f',
          3: '#95d600',
        },
        yellowGreen: {
          0: '#63a70a',
          1: '#82bc00',
          2: '#b8d600',
          3: '#cce944',
        },
        lime: {
          0: '#a8d300',
          1: '#c7de00',
          2: '#e1ea00',
          3: '#f2f338',
        },
        orange: {
          0: '#e27c00',
          1: '#f4b400',
          2: '#ffdd00',
          3: '#F9E819',
        },
        deepOrange: {
          0: '#C2642A',
          1: '#E17726',
          2: '#FFA400',
          3: '#F9C606',
        },
        tenneOrange: {
          0: '#D75F00',
          1: '#F37521',
          2: '#F7931E',
          3: '#FFA400',
        },
        rust: {
          0: '#BD4700',
          1: '#D35E13',
          2: '#EF7622',
          3: '#F19F53',
        },
        reddishBrown: {
          0: '#AD441D',
          1: '#E75300',
          2: '#FF671B',
          3: '#FFA168',
        },
        brown: {
          0: '#AB2C29',
          1: '#CC3524',
          2: '#E24301',
          3: '#FF5B35',
        },
        darkRed: {
          0: '#7A232E',
          1: '#AC162C',
          2: '#CF0A2C',
          3: '#EB0029',
        },
        raven: {
          0: '#6D6E71',
          1: '#808184',
          2: '#929497',
          3: '#D0D2D3',
        },
        deepGray: {
          0: '#424143',
          1: '#59595C',
          2: '#6D6E71',
          3: '#A7A8AB',
        },
      },
    },
    shape: {
      borderRadius: 2,
    },
    zIndex: {
      dropdownListPopup: 50,
      dataTableColumnHeader: 100,
      sidebar: 200,
      overlay: 250,
      filterPanel: 300,
      topbar: 300,
      detailsPanel: 350,
      popup: 400,
      dialog: 400,
      modal: 400,
      overflowButtonOverlay: 400,
      tabsOverlay: 400,
      overflowButtonPopup: 400,
      tabsPopup: 400,
      notificationPanel: 450,
    },
  };

  return createMuiTheme(deepmerge(base, getOptions(base)));
}
