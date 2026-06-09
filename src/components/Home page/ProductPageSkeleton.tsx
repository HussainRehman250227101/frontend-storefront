import {
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  SkeletonText,
} from "@chakra-ui/react";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductPageSkeleton = () => {
  const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Box px={4} py={4}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "240px 1fr",
        }}
        gap={4}
      ></Grid>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(5,1fr)",
        }}
        gap={2}
      >
        <GridItem colSpan={1} display={{ base: "none", lg: "block" }}>
          <Box>
            {/* sidebar  skeleton */}
            <Box
              borderRadius={"10px"}
              w="60"
              minH="100vh"
              bg="white"
              borderRightWidth="1px"
              position="sticky"
              top="0"
              overflowY="auto"
              _dark={{
                bg: "bg.muted",
              }}
              pt={"30px"}
              pr={"20px"}
              pl={"20px"}
            >
              <Flex align="center">
                <SkeletonText noOfLines={1} mb={"30px"} h={"40px"} variant={'shine'}/>
              </Flex>

              <Flex direction="column" fontSize="sm">
                <SkeletonText noOfLines={10} gap={4} h={"20px"} />
              </Flex>
            </Box>
          </Box>
          {/* sidebar  skeleton */}
        </GridItem>
        {/* product page  skeleton */}
        <GridItem colSpan={{ base: 1, md: 3, lg: 4 }}>
          <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} gap={2} px={"auto"}>
            {arr.map((_, i) => (
              <GridItem key={i} colSpan={1}>
                <ProductCardSkeleton />
              </GridItem>
            ))}
          </SimpleGrid>
        </GridItem>
        {/* product page  skeleton */}
      </Grid>
    </Box>
  );
};

export default ProductPageSkeleton;
