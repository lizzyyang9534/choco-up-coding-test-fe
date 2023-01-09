import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import ProductCard from '../components/ProductCard';
import { useMachine } from '@xstate/react';
import {
  productListMachine,
  PRODUCT_LIST_STATE,
} from '../machines/productListMachine';
import { useState } from 'react';
import { OVERVIEW } from '../constants/productList';
import LoadingCard from '../components/LoadingCard';

const ProductList = () => {
  const [state] = useMachine(productListMachine);
  const { products, departments, productsByDepartment } = state.context;
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>(OVERVIEW);
  const productList =
    selectedDepartment === OVERVIEW
      ? products
      : productsByDepartment[selectedDepartment];

  const scrollTo = (direction: 'top' | 'bottom') => {
    window.scrollTo({
      top: direction === 'top' ? 0 : document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Box mx="auto" py={10} px={8} maxW="1400px">
      <Heading fontSize="5xl" fontWeight="semibold">
        Product List
      </Heading>
      <Box mt={6} p={10} bgColor="background">
        <Flex gap={6} wrap="wrap">
          {departments.map((department) => (
            <Button
              key={department}
              colorScheme={
                selectedDepartment === department ? 'primary' : undefined
              }
              variant={selectedDepartment === department ? 'solid' : 'outline'}
              size="lg"
              borderRadius="full"
              onClick={() => setSelectedDepartment(department)}
            >
              {department}
            </Button>
          ))}
        </Flex>
        <Divider mt={8} borderColor="border" />
        <SimpleGrid columns={[1, 1, 2, 3]} mt={10} spacing={8}>
          {state.matches(PRODUCT_LIST_STATE.LOADING) ? (
            <LoadingCard />
          ) : (
            productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </SimpleGrid>
      </Box>

      <Flex direction="column" gap={2} pos="fixed" right={10} bottom={10}>
        <IconButton
          size="lg"
          aria-label="go top"
          icon={<ArrowUpIcon />}
          onClick={() => scrollTo('top')}
        />
        <IconButton
          size="lg"
          aria-label="go bottom"
          icon={<ArrowDownIcon />}
          onClick={() => scrollTo('bottom')}
        />
      </Flex>
    </Box>
  );
};
export default ProductList;
