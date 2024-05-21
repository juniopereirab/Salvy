'use client';
import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#F6995C'
    },
    secondary: {
      main: '#EADFB4'
    },
    grey: {
      100: '#F4F4F8',
      200: '#D2D4DA',
      300: '#B4B5BC',
      400: '#9396A0',
      500: '#777A86',
      600: '#5B5E6A',
      700: '#404252',
      800: '#282A39',
      900: '#111224',
    }
  }
});

export default theme;