import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        white: {
          800: '#FAFAFA',
          900: '#FFFFFF',
        },
        grey: {
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#757575', // For Gret Text
          600: '#525252',
          700: '#3d3d3d',
          800: '#292929',
          900: '#ECECEC', //
        },
        primary: {
          100: '#d0d1d5',
          200: '#a1a4ab',
          300: '#727681',
          400: '#1F2A40',
          500: '#141b2d',
          600: '#101624',
          700: '#0c101b',
          800: '#080b12',
          900: '#040509',
        },
        greenAccent: {
          100: '#dbf5ee',
          200: '#b7ebde',
          300: '#94e2cd',
          400: '#70d8bd',
          500: '#72B216',
          600: '#3da58a',
          700: '#2e7c67',
          800: '#1e5245',
          900: '#0f2922',
        },
        redAccent: {
          100: '#f8dcdb',
          200: '#f1b9b7',
          300: '#e99592',
          400: '#e2726e',
          500: '#db4f4a',
          600: '#af3f3b',
          700: '#832f2c',
          800: '#58201e',
          900: '#2c100f',
        },
        blueAccent: {
          100: '#e1e2fe',
          200: '#c3c6fd',
          300: '#a4a9fc',
          400: '#868dfb',
          500: '#6870fa',
          600: '#535ac8',
          700: '#3e4396',
          800: '#2a2d64',
          900: '#151632',
        },
        sideBarShadow: {
          100: '#E2ECF980',
        },
        chatColor: {
          100: '#C7EBF6',
          200: '#ECECEC',
        },
      }
    : {
        white: {
          800: '#FAFAFA',
          900: '#FFFFFF',
        },
        grey: {
          100: '#141414',
          200: '#292929',
          300: '#3d3d3d',
          400: '#525252',
          500: '#757575', // For Gret Text
          600: '#858585',
          700: '#a3a3a3',
          800: '#c2c2c2',
          900: '#ECECEC', //
        },
        primary: {
          100: '#040509',
          200: '#080b12',
          300: '#0c101b',
          400: '#f2f0f0', // manually changed
          500: '#141b2d',
          600: '#1F2A40',
          700: '#727681',
          800: '#a1a4ab',
          900: '#d0d1d5',
        },
        greenAccent: {
          100: '#65AC00', // for search button
          200: '#93CA45', // billing tab
          300: '#2e7c67',
          400: '#BDEE77', // For child card
          500: '#72B216', // For buttons
          600: '#88BF3A', // GreenPressed
          700: '#94e2cd',
          800: '#b7ebde',
          900: '#dbf5ee',
        },
        redAccent: {
          100: '#2c100f',
          200: '#58201e',
          300: '#E44A4A', //
          400: '#EA7070', // delete button
          500: '#E76A6A', // For buttons (danger, alert)
          600: '#e2726e',
          700: '#e99592',
          800: '#F3A8A8', //
          900: '#f8dcdb',
        },
        blueAccent: {
          100: '#151632',
          200: '#2a2d64',
          300: '#3e4396',
          400: '#535ac8',
          500: '#6870fa',
          600: '#868dfb',
          700: '#a4a9fc',
          800: '#c3c6fd',
          900: '#e1e2fe',
        },
        sideBarShadow: {
          100: '#E2ECF9',
        },
        solids: {
          black: '#000000',
          white: '#FFFFFF',
          purple: '#C792C8',
          purpleBright: '#C25BC5',
          orange: '#ECC283',
          orangeBright: '#D48B1D',
          green: '#BDEE77',
          mainButton: '#72B216',
          pinkBright: '#DB66A5',
        },
        extra: {
          iconBackground: '#E7F4F8',
          grey1: '#363636',
          grey2: '#757575',
          grey3: '#A7A7A7',
          grey4: '#D8D8D8',
          grey5: '#ECECEC',
        },
        likertScale: {
          left: '#EC9C83',
          right: '#BDEE77',
          thumb: '#757575',
          mark: '#757575',
        },
        verticalFiller: {
          100: '#A1D8E4',
          200: '#FC99CE',
          300: '#ECC283',
          400: '#BDEE77',
          500: '#C792C8',
        },
        personality: {
          openness: '#51B4CB',
          conscientious: '#DA78AD',
          extraversion: '#D39A45',
          agreeableness: '#8EC144',
          neuroticism: '#C775C9',
        },
        parentDashboard: {
          1: '#E9E6D1',
        },
        subjectsFocus: {
          100: '#BDEE77',
          200: '#ECC283',
          300: '#A1D8E4',
          400: '#FC99CE',
          500: '#C792C8',
        },
        chatColor: {
          100: '#C7EBF6',
          200: '#ECECEC',
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: '#fcfcfc',
            },
          }),
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
