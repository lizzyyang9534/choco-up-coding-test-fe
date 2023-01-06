import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: '12px',
      },
    },
  },
  colors: {
    primary: {
      400: '#3A0CA2',
      500: '#3A0CA2',
      600: '#3A0CA2',
      700: '#3A0CA2',
      800: '#3A0CA2',
    },
    background: '#F8F8F8',
    border: '#C9C9C9',
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: '1rem',
      },
    },
    Button: {
      variants: {
        outline: {
          borderColor: 'border',
          background: 'white',
        },
      },
      baseStyle: {
        fontWeight: 'normal',
      },
    },
  },
});

export default theme;
