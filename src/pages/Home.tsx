import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ProductCard from "../components/Products Home/ProductCard";
import type { AppDispatch, RootState } from "../app/store";
import ProductPageSkeleton from "../components/skeleton/ProductPageSkeleton";
import SidebarContent from "../components/Home page/SidebarContent";
import { fetchProducts } from "../features/Products/productThunk";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {products,status,error,productsCount,next,previous} = useSelector((state: RootState) => state.products);


  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const parsedPage = pageParam ? Number(pageParam) : 1;
      
    if (!Number.isFinite(parsedPage) || parsedPage < 1) {
      return 1;
    }

    return Math.floor(parsedPage);
  }, [searchParams]);

  const selectedCollection = useMemo(() => {
    const collectionParam = searchParams.get("collection");
    if (!collectionParam) {
      return undefined;
    }

    const parsedCollection = Number(collectionParam);
    if (!Number.isFinite(parsedCollection) || parsedCollection < 1) {
      return undefined;
    }

    return Math.floor(parsedCollection);
  }, [searchParams]);

    const searchQuery = useMemo(() => {
    const query = searchParams.get("search");
    if (!query) {
      return undefined;
    }
    return query;
  }, [searchParams]);


  const pageSize = useMemo(() => {
    return products.length > 0 ? products.length : 1;
  }, [products.length]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(productsCount / pageSize));
  }, [productsCount, pageSize]);

  useEffect(() => {
    if (currentPage === 1 && searchParams.has("page") && !searchParams.has("collection")) {
      setSearchParams({}, { replace: true });
      return;
    }
    dispatch(
      fetchProducts({
        page: currentPage,
        collection: selectedCollection,
        search : searchQuery
      }),
    );
  }, [currentPage, , searchParams, selectedCollection]);

  const updatePage = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);

    if (page <= 1) {
      nextParams.delete("page");
      setSearchParams(nextParams);
      return;
    }

    nextParams.set("page", String(page));
    setSearchParams(nextParams);
  };

  return (
    <>
      {status === "loading" ? (
        <ProductPageSkeleton />
      ) : (
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
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </SimpleGrid>

              <Box mt={8}>
                {error ? (
                  <Box
                    borderWidth="1px"
                    borderRadius="xl"
                    px={4}
                    py={3}
                    bg="bg.subtle"
                    color="fg.error"
                  >
                    <Text fontWeight="medium">{error}</Text>
                  </Box>
                ) : null}

                <HStack
                  mt={error ? 4 : 0}
                  justify="space-between"
                  flexWrap="wrap"
                  gap={3}
                  borderWidth="1px"
                  borderRadius="xl"
                  px={4}
                  py={3}
                  bg="bg.subtle"
                >
                  <Text fontSize="sm" color="fg.muted">
                    Page {currentPage} of {totalPages}
                  </Text>

                  <HStack gap={3}>
                    <Button
                      variant="outline"
                      onClick={() => updatePage(currentPage - 1)}
                      disabled={!previous}
                    >
                      Previous
                    </Button>
                    <Button
                      colorPalette="orange"
                      onClick={() => updatePage(currentPage + 1)}
                      disabled={!next || currentPage >= totalPages}
                    >
                      {status === "loading" ? <Spinner size="sm" /> : "Next"}
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            </GridItem>
          </Grid>

          {!products.length && status !== "loading" && !error ? (
            <Center py={12}>
              <Text color="fg.muted">No products found.</Text>
            </Center>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default Home;
