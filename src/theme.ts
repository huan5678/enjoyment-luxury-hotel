'use client';
import { Noto_Serif_TC } from 'next/font/google';
import { Theme, TypographyVariants, createTheme } from '@mui/material/styles';

const noto_Serif_TC = Noto_Serif_TC({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  preload: true,
});

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
  interface TypographyVariants {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;
    subtitle1: true;
    subtitle2: true;
    body1: true;
    body2: true;
    caption: true;
    button: true;
    overline: true;
    srOnly: true;
    inherit: true;
    display: true;
    tiny: true;
    title: true;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides extends TypographyVariants {}
}

const theme: Theme = createTheme({
  breakpoints: {
    values: {
      sm: 0,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: '#BF9D7D',
      light: '#D0B79F',
      dark: '#7B6651',
    },
    error: {
      main: '#DA3E51',
      light: '#F5CCD1',
      dark: '#C22538',
    },
    info: {
      main: '#3BADEF',
      light: '#B1EFFD',
      dark: '#1D66AC',
    },
    success: {
      main: '#52DD7E',
      light: '#BCFBBD',
      dark: '#299F65',
    },
  },
  typography: {
    fontFamily: ['Noto Serif TC', noto_Serif_TC.style.fontFamily, 'serif'].join(','),
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: '0.02rem',
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid',
            borderColor: '#BF9D7D',
            color: '#BF9D7D',
            backgroundColor: '#fff',
            '&:hover': {
              borderColor: '#7b6651',
              backgroundColor: '#F7F2EE',
              color: '#7B6651',
            },
            '&:disabled': {
              borderColor: '#909090',
              backgroundColor: '#fff',
              color: '#909090',
            },
            '&:active': {
              borderColor: '#895B3E',
              backgroundColor: '#F7F2EE',
              color: '#895B3E',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#BF9D7D',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#7b6651',
              color: '#fff',
            },
            '&:disabled': {
              backgroundColor: '#ececec',
              color: '#909090',
            },
            '&:active': {
              backgroundColor: '#895B3E',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: '#BF9D7D',
            '&:hover': {
              color: '#7B6651',
            },
            '&:disabled': {
              color: '#909090',
            },
            '&:active': {
              color: '#895B3E',
            },
          },
        },
      ],
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: ['Noto Serif TC', noto_Serif_TC.style.fontFamily, 'serif'].join(','),
      },
      variants: [
        {
          props: { variant: 'display' },
          style: {
            fontSize: '6.25rem',
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'tiny' },
          style: {
            fontSize: '0.75rem',
          },
        },
        {
          props: { variant: 'title' },
          style: {
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.5,
            letterSpacing: '0.02rem',
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#140F0A',
          backdropFilter: 'blur(0.625rem)',
        },
      },
      variants: [
        {
          props: { color: 'transparent' },
          style: {
            backgroundColor: 'transparent',
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        alternativeLabel: {
          top: '50%',
        },
        line: {
          backgroundColor: '#909090',
          height: '0.125rem',
          border: 0,
          borderRadius: '0.625rem',
        },
        root: {
          '&.Mui-active': {
            '&.MuiStepConnector-line': {
              backgroundColor: 'white',
            },
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          stroke: '#909090',
          '&.Mui-active': {
            stroke: 'transparent',
            text: {
              fill: 'white',
            },
          },
          '&.Mui-completed': {
            stroke: 'transparent',
            backgroundColor: 'white',
            borderRadius: '50%',
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: '#909090',
          '&.Mui-active': {
            color: 'white',
          },
          '&.Mui-completed': {
            color: 'white',
          },
        },
      },
    },
  },
});

export default theme;
