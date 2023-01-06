import ProductList from './pages/ProductList';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ProductList />
    </ChakraProvider>
  );
}

export default App;
