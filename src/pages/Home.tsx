import { useSelector } from "react-redux";
import ProductCard from "../components/Home page/ProductCard";
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { selectProducts } from "../features/Products/ProductSlice";
import type { product } from "../features/Products/ProductInterfaces";
import type { RootState } from "../app/store";
import ProductPageSkeleton from "../components/Home page/ProductPageSkeleton";
import SidebarContent from "../components/Home page/SidebarContent";

const Home = () => {
  const products: product[] = useSelector(selectProducts);
  const status: string = useSelector(
    (state: RootState) => state.products.status,
  );

  return (
    <>
      {status === "loading" ? (
        <ProductPageSkeleton />
      ) : (
        //   <Container py={"10px"} >
        //   <Grid
        //     templateColumns={{
        //       base: "1fr",
        //       md: "repeat(3,1fr)",
        //       lg: "repeat(5,1fr)",
        //     }}
        //     gap={2}
        //   >
        //     <GridItem colSpan={1} display={{ base: "none", lg: "block" }}>
        //       <SidebarContent/>
        //     </GridItem>

        //     <GridItem colSpan={{ base: 1, md: 3, lg: 4 }}>
        //       <SimpleGrid columns={{sm:1,md:3,lg:4}} gap={2} px={'auto'}>
        //         {products.map((product, i) => (
        //           <GridItem key={i} colSpan={1}>
        //             <ProductCard product={product} />
        //           </GridItem>
        //         ))}
        //       </SimpleGrid>
        //     </GridItem>
        //   </Grid>
        // </Container>

        <Box px={4} py={4}>
          <Grid
            templateColumns={{
              base: "1fr",
              lg: "240px 1fr",
            }}
            gap={4}
          >
            <GridItem display={{ base: "none", lg: "block" }}>
              <SidebarContent />
            </GridItem>

            <GridItem>
              <SimpleGrid
                columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  xl: 4,
                }}
                gap={4}
              >
                {products.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </SimpleGrid>
            </GridItem>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Home;
