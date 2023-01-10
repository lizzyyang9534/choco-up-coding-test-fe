import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Spinner,
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
import { useCallback, useEffect, useRef, useState } from 'react';
import { OVERVIEW } from '../constants/productList';
import LoadingCard from '../components/LoadingCard';
import * as R from 'ramda';
import ScrollButton from '../components/ScrollButton';

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
  const [enabledExpand, setEnabledExpand] = useState(false);

  const handleToggleDepartments = () =>
    setShowAllDepartments(!showAllDepartments);

  const handleScrolledToBottom = useCallback(() => {
    if (
      selectedDepartment === OVERVIEW &&
      !state.matches(PRODUCT_LIST_STATE.LOADING) &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      send({ type: PRODUCT_LIST_EVENT.LOAD_MORE });
    }
  }, [selectedDepartment, send, state]);

  useEffect(() => {
    if (
      !enabledExpand &&
      state.matches(PRODUCT_LIST_STATE.IDLE) &&
      departmentsRef.current &&
      departmentsRef.current.scrollHeight > DEPARTMENT_CONTAINER_HEIGHT
    ) {
      setEnabledExpand(true);
    }
  }, [enabledExpand, state]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrolledToBottom);
    return () => window.removeEventListener('scroll', handleScrolledToBottom);
  }, [handleScrolledToBottom]);

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
                  fontSize="1.25rem"
                  borderRadius="full"
                  onClick={() => setSelectedDepartment(department)}
                >
                  {department}
                </Button>
              ))}
            </Flex>
          </Collapse>
          {
            <Tooltip label={showAllDepartments ? 'Collapse' : 'Expand'}>
              <IconButton
                size="lg"
                aria-label="expand or collapse"
                icon={
                  showAllDepartments ? <ChevronUpIcon /> : <ChevronDownIcon />
                }
                isDisabled={!enabledExpand}
                onClick={handleToggleDepartments}
              />
            </Tooltip>
          }
        </Flex>

        <Divider mt={8} borderColor="border" />
        <SimpleGrid columns={[1, 1, 2, 3]} mt={10} spacing={8}>
          {state.matches(PRODUCT_LIST_STATE.LOADING) ? (
            <>
              {R.times(
                (i) => (
                  <LoadingCard key={`loading_card${i}`} />
                ),
                3
              )}
            </>
          ) : (
            productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </SimpleGrid>
        {state.matches(PRODUCT_LIST_STATE.LOADING_MORE) && (
          <Center mt={6}>
            <Spinner size="xl" color="primary.500" />
          </Center>
        )}
      </Box>

      <Flex direction="column" gap={2} pos="fixed" right={10} bottom={10}>
        <ScrollButton direction="top" />
        <ScrollButton direction="bottom" />
      </Flex>
    </Box>
  );
};
export default ProductList;
