import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import type { Collection } from "../../features/Products/ProductInterfaces";
import { fetchCollections } from "../../features/Products/ProductRequests";
import { useColorMode } from "../ui/color-mode";

const SidebarContent = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [collectionsError, setCollectionsError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCollection = searchParams.get("collection");

  const {colorMode}=useColorMode()

  useEffect(() => {
    let mounted = true;

    const loadCollections = async () => {
      setLoadingCollections(true);
      setCollectionsError(null);

      try {
        const response = await fetchCollections();
        if (mounted) {
          setCollections(response);
        }
      } catch {
        if (mounted) {
          setCollectionsError("Unable to load collections");
        }
      } finally {
        if (mounted) {
          setLoadingCollections(false);
        }
      }
    };

    loadCollections();

    return () => {
      mounted = false;
    };
  }, []);

  const setCollection = (collectionId?: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("page");

    if (typeof collectionId === "number") {
      nextParams.set("collection", String(collectionId));
    } else {
      nextParams.delete("collection");
    }

    setSearchParams(nextParams);
  };

  return (
    <Box
      borderRadius="10px"
      w="60"
      minH="100vh"
      bg={colorMode === 'light'? "gray.100":"white"}
      borderRightWidth="1px"
      position="sticky"
      top="0"
      overflowY="auto"
      _dark={{
        bg: "gray.800",
      }}
    >
      <Flex px="4" py="5" align="center">
        <Text fontSize="2xl" fontWeight="bold" color="orange.500">
          Collections
        </Text>
      </Flex>

      <Flex direction="column" fontSize="sm">
        

        <Box px="4" py="3">
      

          <VStack align="stretch" gap={1}>
            <Button
              variant={!selectedCollection ? "solid" : "ghost"}
              colorPalette={!selectedCollection ? "orange" : "gray"}
              justifyContent="space-between"
              width="full"
              borderRadius="lg"
              onClick={() => setCollection()}
              aria-pressed={!selectedCollection}
            >
              <HStack justify="space-between" width="full">
                <Text>All Products</Text>
                <Text fontSize="xs" color="fg.muted">
                  {loadingCollections ? "..." : collections.reduce((sum, item) => sum + item.products_count, 0)}
                </Text>
              </HStack>
            </Button>

            {collections.map((collection) => {
              const isSelected = selectedCollection === String(collection.id);

              return (
                <Button
                  key={collection.id}
                  variant={isSelected ? "solid" : "ghost"}
                  colorPalette={isSelected ? "orange" : "gray"}
                  justifyContent="space-between"
                  width="full"
                  borderRadius="lg"
                  onClick={() => setCollection(collection.id)}
                  aria-pressed={isSelected}
                  disabled={loadingCollections}
                >
                  <HStack justify="space-between" width="full">
                    <Text textTransform="capitalize">{collection.title}</Text>
                    <Text fontSize="xs" color="fg.muted">
                      {collection.products_count}
                    </Text>
                  </HStack>
                </Button>
              );
            })}
          </VStack>

          {collectionsError ? (
            <Text mt={2} fontSize="xs" color="fg.error">
              {collectionsError}
            </Text>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
