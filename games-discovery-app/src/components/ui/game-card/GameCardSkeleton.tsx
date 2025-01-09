import { Stack, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";

const GameCardSkeleton = () => {
  return (
    <VStack gap="5" align="stretch" rounded="lg" bg="gray.900" width="400px">
      <Skeleton height="200px" />
      <Stack gap="5" display="flex" alignItems="center">
        <Skeleton height="25px" width="90%" />
        <Skeleton height="25px" width="90%" />
        <SkeletonCircle size="12" alignSelf="flex-start" mb="5" ms="7" />
      </Stack>
    </VStack>
  );
};

export default GameCardSkeleton;
