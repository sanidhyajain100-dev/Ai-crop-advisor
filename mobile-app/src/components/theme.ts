import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    accent: '#8BC34A',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#263238',
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#FFA000',
    info: '#1976D2',
  },
  roundness: 10,
  fonts: {
    ...DefaultTheme.fonts,
  },
};