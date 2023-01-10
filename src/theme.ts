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
      300: '#4510c1',
      400: '#3e0dae',
      500: '#3A0CA2',
      600: '#310a8b',
      700: '#27086f',
      800: '#1f0757',
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
