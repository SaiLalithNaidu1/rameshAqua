export const androidTheme = {
  colors: {
    primary: '#6200EE',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
      disabled: '#BDBDBD',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: {
      small: '12px',
      medium: '14px',
      large: '16px',
      xlarge: '20px',
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  borderRadius: '4px',
};