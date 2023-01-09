import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ProductCard from '../components/ProductCard';
import { useMachine } from '@xstate/react';
import {
  productListMachine,
  PRODUCT_LIST_EVENT,
  PRODUCT_LIST_STATE,
} from '../machines/productListMachine';
import { useEffect, useRef, useState } from 'react';
import { OVERVIEW } from '../constants/productList';
import LoadingCard from '../components/LoadingCard';
import * as R from 'ramda';
import TopButton from '../components/TopButton';
import BottomButton from '../components/BottomButton';

const DEPARTMENT_CONTAINER_HEIGHT = 36;

const ProductList = () => {
  const [state, send] = useMachine(productListMachine);
  const { products, departments, productsByDepartment } = state.context;
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>(OVERVIEW);
  const productList =
    selectedDepartment === OVERVIEW
      ? products
      : productsByDepartment[selectedDepartment];

  const departmentsRef = useRef<HTMLDivElement>(null);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);

  const handleToggleDepartments = () =>
    setShowAllDepartments(!showAllDepartments);

  const scrollTo = (direction: 'top' | 'bottom') => {
    window.scrollTo({
      top: direction === 'top' ? 0 : document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (
      !showExpandButton &&
      state.matches(PRODUCT_LIST_STATE.IDLE) &&
      departmentsRef.current &&
      departmentsRef.current.scrollHeight > DEPARTMENT_CONTAINER_HEIGHT
    ) {
      setShowExpandButton(true);
    }
  }, [showExpandButton, state]);

  return (
    <Box mx="auto" py={10} px={8} maxW="1400px">
      <Heading fontSize="5xl" fontWeight="semibold">
        Product List
      </Heading>
      <Box mt={6} p={10} bgColor="background">
        <Flex justify="space-between">
          <Collapse
            startingHeight={DEPARTMENT_CONTAINER_HEIGHT}
            in={showAllDepartments}
          >
            <Flex ref={departmentsRef} gap={6} wrap="wrap" flex="1">
              {departments.map((department) => (
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
          </Collapse>
          {showExpandButton && (
            <Tooltip label={showAllDepartments ? 'Collapse' : 'Expand'}>
              <IconButton
                size="lg"
                aria-label="expand or collapse"
                icon={
                  showAllDepartments ? <ChevronUpIcon /> : <ChevronDownIcon />
                }
                onClick={handleToggleDepartments}
              />
            </Tooltip>
          )}
        </Flex>

        <Divider mt={8} borderColor="border" />
        <SimpleGrid columns={[1, 1, 2, 3]} mt={10} spacing={8}>
          {state.matches(PRODUCT_LIST_STATE.LOADING) ? (
            <>{R.repeat(<LoadingCard />, 3)}</>
          ) : (
            productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </SimpleGrid>
        {selectedDepartment === OVERVIEW &&
          !state.matches(PRODUCT_LIST_STATE.LOADING) && (
            <Flex mt={6} justify="center">
              <Button
                size="lg"
                colorScheme="primary"
                loadingText="Loading"
                isLoading={state.matches(PRODUCT_LIST_STATE.LOADING_MORE)}
                onClick={() => send({ type: PRODUCT_LIST_EVENT.LOAD_MORE })}
              >
                Load More
              </Button>
            </Flex>
          )}
      </Box>

      <Flex direction="column" gap={2} pos="fixed" right={10} bottom={10}>
        <TopButton onClick={() => scrollTo('top')} />
        <BottomButton onClick={() => scrollTo('bottom')} />
      </Flex>
    </Box>
  );
};
export default ProductList;
