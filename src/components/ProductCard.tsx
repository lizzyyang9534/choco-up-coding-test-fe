import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const {
    product_name,
    department,
    color,
    material,
    price_string,
    promo_code,
  } = product;
  return (
    <Box p="8" w="full" bgColor="white" borderRadius="lg">
      <Flex justify="space-between" align="flex-start" gap={2}>
        <Heading fontWeight="500">{product_name}</Heading>
        <Link fontSize="2xl" color="rgb(229, 104, 36)">
          View
        </Link>
      </Flex>
      <Text mt={4} mb={6}>
        {department}
      </Text>
      <Flex direction="column" gap={2}>
        <Flex justify="space-between">
          <Text>Color</Text>
          <Text>{color}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Material</Text>
          <Text>{material}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Price</Text>
          <Text>{price_string}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Promotion Code</Text>
          <Text>{promo_code}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
export default ProductCard;
