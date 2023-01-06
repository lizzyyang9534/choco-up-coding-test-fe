import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useMachine } from '@xstate/react';
import {
  productListMachine,
  PRODUCT_LIST_STATE,
} from '../machines/productListMachine';
import { useState } from 'react';
import { OVERVIEW } from '../constants/productList';

const ProductList = () => {
  const [state] = useMachine(productListMachine);
  const { products, departments, productsByDepartment } = state.context;
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>(OVERVIEW);
  const productList =
    selectedDepartment === OVERVIEW
      ? products
      : productsByDepartment[selectedDepartment];

  return (
    <Box py={10} px={[8, 12, 20]}>
      <Heading fontSize="5xl" fontWeight="semibold">
        Product List
      </Heading>
      <Box mt={6} p={10} bgColor="background">
        <Flex gap={6} wrap="wrap">
          {state.matches(PRODUCT_LIST_STATE.IDLE) &&
            departments.map((department) => (
              <Button
                key={department}
                colorScheme={
                  selectedDepartment === department ? 'primary' : undefined
                }
                variant={
                  selectedDepartment === department ? 'solid' : 'outline'
                }
                size="lg"
                borderRadius="full"
                onClick={() => setSelectedDepartment(department)}
              >
                {department}
              </Button>
            ))}
        </Flex>
        <Divider mt={8} borderColor="border" />
        <SimpleGrid columns={[1, 2, 3]} mt={10} spacing={8}>
          {state.matches(PRODUCT_LIST_STATE.IDLE) &&
            productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default ProductList;
