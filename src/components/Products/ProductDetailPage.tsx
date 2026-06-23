import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Separator,
  Stack,
  Text,
  Badge,
  NumberInput,
} from "@chakra-ui/react";
import { Star } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router";
import type { product } from "../../features/Products/ProductInterfaces";
import {
  deleteItemFromCart,
  getCart,
  postItemToCart,
} from "../../features/Cart/CartThunk";
import type { itemType, postToCart } from "../../features/Cart/CartInterfaces";
import { selectCartItems } from "../../features/Cart/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

export default function ProductDetailPage() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector<RootState, itemType[] | undefined>(
    selectCartItems,
  );

  const product: product = location.state?.product;
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.image);

  const [quantity, setQuantity] = useState(1);
  const cartItem = useMemo(
    () =>
      Array.isArray(cartItems)
        ? cartItems.find((item) => item.product.id === product.id)
        : undefined,
    [cartItems, product.id],
  );

  const addToCart = useCallback(
    async (productId: number) => {
      const data: postToCart = {
        product_id: productId,
        quantity,
      };

      await dispatch(postItemToCart(data));
      dispatch(getCart());
    },
    [dispatch,quantity],
  );
  const removeFromCart = useCallback(
    async (itemId: number) => {
      await dispatch(deleteItemFromCart(itemId));
      dispatch(getCart());
    },
    [dispatch],
  );

  return (
    <Box maxW="1400px" mx="auto" px={6} py={10}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.2fr 1fr",
        }}
        gap={12}
      >
        {/* Images Section */}
        <GridItem>
          <Stack gap={4}>
            <Box
              borderWidth="1px"
              borderRadius="xl"
              overflow="hidden"
              bg="bg.subtle"
            >
              <Image
                src={selectedImage}
                alt={product.title}
                w="100%"
                h={{ base: "350px", md: "600px" }}
                objectFit="cover"
              />
            </Box>

            <HStack overflowX="auto">
              {product.images.map((img) => (
                <Box
                  key={img.id}
                  cursor="pointer"
                  borderWidth={selectedImage === img.image ? "2px" : "1px"}
                  borderColor={
                    selectedImage === img.image ? "blue.500" : "gray.200"
                  }
                  borderRadius="lg"
                  overflow="hidden"
                  minW="80px"
                  onClick={() => setSelectedImage(img.image)}
                >
                  <Image
                    src={img.image}
                    alt={product.title}
                    w="80px"
                    h="80px"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </HStack>
          </Stack>
        </GridItem>

        {/* Product Info */}
        <GridItem>
          <Stack gap={6} position="sticky" top="100px">
            <Stack gap={2}>
              <Heading size="2xl">{product.title}</Heading>

              <HStack>
                <Icon as={Star} fill="gold" color="gold" />
                <Text fontWeight="semibold">{product.rating.toFixed(1)}</Text>
              </HStack>
            </Stack>

            {/* Promotions */}
            {product.promotions.length > 0 && (
              <HStack wrap="wrap">
                {product.promotions.map((promoId) => (
                  <Badge
                    key={promoId}
                    colorPalette="green"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    Promotion #{promoId}
                  </Badge>
                ))}
              </HStack>
            )}

            <Stack gap={1}>
              <Text fontSize="3xl" fontWeight="bold" color="green.600">
                ${product.unit_price.toFixed(2)}
              </Text>

              <Text color="fg.muted">
                Including Tax: ${product.price_with_tax.toFixed(2)}
              </Text>
            </Stack>

            <Separator />

            <Stack gap={2}>
              <Text fontWeight="medium">Availability</Text>

              {product.inventory > 0 ? (
                <Badge colorPalette="green" width="fit-content">
                  In Stock ({product.inventory})
                </Badge>
              ) : (
                <Badge colorPalette="red" width="fit-content">
                  Out of Stock
                </Badge>
              )}
            </Stack>

            <Separator />

            <Stack gap={3}>
              <Text fontWeight="semibold">Quantity</Text>

              <NumberInput.Root
                value={String(quantity)}
                min={1}
                max={product.inventory}
                onValueChange={(details) =>
                  setQuantity(details.valueAsNumber || 1)
                }
                width="140px"
              >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Stack>

            {/* <Button
              size="lg"
              colorPalette="blue"
              disabled={product.inventory === 0}
              onClick={() => addToCart(product.id)}
            >
              Add To Cart
            </Button> */}
            {cartItem ? (
              <Button
                variant="outline"
                w="full"
                colorPalette="red"
                rounded="lg"
                fontWeight="semibold"
                onClick={() => removeFromCart(cartItem.id)}
                aria-label={`Remove ${product.title} from cart`}
              >
                <Icon as={FaTrashAlt} />
                Remove from Cart
              </Button>
            ) : (
              <Button
                variant="solid"
                w="full"
                colorPalette="orange"
                rounded="lg"
                fontWeight="semibold"
                onClick={() => addToCart(product.id)}
                aria-label={`Add ${product.title} to cart`}
              >
                <Icon as={FaShoppingCart} />
                Add to Cart
              </Button>
            )}

            <Separator />

            <Stack gap={3}>
              <Heading size="md">Product Description</Heading>

              <Text color="fg.muted" lineHeight="tall">
                {product.description}
              </Text>
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
}

