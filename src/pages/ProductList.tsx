import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  return (
    <Box p={10}>
      <Heading>Product List</Heading>
      <Box mt={6} p={10} bgColor="background">
        <Flex gap={6}>
          <Button colorScheme="primary" borderRadius="full">
            Overview
          </Button>
          <Button variant="outline" borderRadius="full">
            Industrial & Home
          </Button>
        </Flex>
        <Divider mt={8} borderColor="border" />
        <Flex mt={10}>
          <ProductCard />
        </Flex>
      </Box>
    </Box>
  );
};
export default ProductList;
