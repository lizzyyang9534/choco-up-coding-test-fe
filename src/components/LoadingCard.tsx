import { Box, Skeleton, Stack } from '@chakra-ui/react';

const LoadingCard = () => {
  return (
    <Box p="8" height="200px" bgColor="white" borderRadius="lg">
      <Skeleton width="90%" height="26px" />
      <Stack mt="8">
        <Skeleton width="60%" height="12px" />
        <Skeleton width="70%" height="12px" />
        <Skeleton width="50%" height="12px" />
        <Skeleton width="60%" height="12px" />
      </Stack>
    </Box>
  );
};
export default LoadingCard;
