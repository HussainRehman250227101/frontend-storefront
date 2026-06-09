import { Box, Skeleton, SkeletonText,} from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <>
    
      <Box border={'1px solid'} borderColor={'bg.muted'} borderRadius={'md'} height={''} objectFit={'cover'}>
        <Skeleton height={'200px'} variant="shine"/>
        <Box backgroundColor={'bg.muted'} pt={'30px'} px={'20px'}>
          <SkeletonText h={'30px'} w={'calc(100%-50%)'} noOfLines={1} mb={'20px'}/>
        <SkeletonText h={'10px'} noOfLines={4} gap={1} mb={'5px'}/>
        <SkeletonText h={'30px'} w={'100px'} my={'15px'} noOfLines={1} gap={1}/>
        <SkeletonText h={'40px'} w={'full'} noOfLines={1} gap={1} mt={'10px'} mb={'20px'}/>
        </Box>
      </Box>
    
    </>
    
  );
};

export default ProductCardSkeleton;
