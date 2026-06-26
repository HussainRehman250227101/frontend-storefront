import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Star } from "lucide-react";
import { LuMinus, LuPlus, LuShieldCheck, LuX } from "react-icons/lu";
import { useColorModeValue } from "../components/ui/color-mode";
import { FaStripe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../features/Cart/CartSlice";
import type { AppDispatch } from "../app/store";

import {
  deleteItemFromCart,
  postItemToCart,
  reduceItemQuantityInCart,
} from "../features/Cart/CartThunk";
import type { itemType, postToCart } from "../features/Cart/CartInterfaces";
import FireFlame from "../components/ui/FireFlame";

const Cart = () => {
  const cartItems = useSelector(selectCartItems) || [];
  // COLOR MODE VALUES
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const muted_text = useColorModeValue("gray.600", "gray.400");
  const header_text = useColorModeValue("gray.500", "gray.400");
  const primary_text = useColorModeValue("black", "white");
  const quantityBorder = useColorModeValue("gray.300", "gray.600");

  const subTotal = cartItems.reduce((acc, item) => acc + item.total_price, 0);
  const itemDispatch = useDispatch<AppDispatch>();

  const removefromcart = async (product_id: number) => {
    await itemDispatch(deleteItemFromCart(product_id));
    
  };

  const reduceitemfromthecart = async (item: itemType) => {
    const data: postToCart = {
      product_id: item.product.id,
      quantity: item.quantity - 1,
    };

    const datatoThunk = {
      item_id: item.id,
      data: data,
    };
    await itemDispatch(reduceItemQuantityInCart(datatoThunk));
    
  };

  const additemtocart = async (item: itemType) => {
    const data = {
      product_id: item.product.id,
      quantity: 1,
    };
    await itemDispatch(postItemToCart(data));
    
  };

  return (
    <Box
      bg={pageBg}
      minH="100vh"
      color={primary_text}
      maxW="1400px"
      mx="auto"
      px={{ base: 4, md: 8 }}
      py={10}
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 380px" }}
        gap={8}
        alignItems="start"
      >
        {/* LEFT SIDE */}
        <Box>
          {/* HEADER */}
          <Grid
            templateColumns="2.2fr 1fr 1fr 1fr"
            px={4}
            py={3}
            display={{ base: "none", md: "grid" }}
            color={header_text}
            fontSize="sm"
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <Text>Product Details</Text>
            <Text textAlign="center">Quantity</Text>
            <Text textAlign="center">Price</Text>
            <Text textAlign="center">Total</Text>
          </Grid>

          {/* CART ITEMS */}
          <Stack gap={5} mt={4}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                border="1px solid"
                borderColor={borderColor}
                p={{ base: 4, md: 5 }}
                bg={cardBg}
                rounded="lg"
                shadow="sm"
              >
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "2.2fr 1fr 1fr 1fr auto",
                  }}
                  gap={5}
                  alignItems="center"
                >
                  {/* PRODUCT INFO */}
                  <Flex gap={4} align="center">
                    <Image
                      src={item.product?.images?.[0]?.image || "dummy"}
                      alt={"product image"}
                      boxSize="90px"
                      objectFit="cover"
                      rounded="md"
                    />

                    <Box>
                      <HStack>

                      <Text fontWeight="semibold" fontSize="lg">
                        {item.product.title}
                      </Text>
                      {item.product.featured_product ? <FireFlame size='sm' />:null}
                      </HStack>
                      <HStack>
                        <Icon as={Star} fill="gold" color="gold"  size='md'/>
                        <Text fontSize="sm" color={header_text}>
                          ({item.product.rating})
                        </Text>
                      </HStack>
                    </Box>
                  </Flex>

                  {/* QUANTITY */}
                  <Flex justify={{ base: "flex-start", md: "center" }}>
                    <HStack
                      border="1px solid"
                      borderColor={quantityBorder}
                      rounded="md"
                      overflow="hidden"
                      gap={0}
                    >
                      <IconButton
                        aria-label="Decrease quantity"
                        variant="ghost"
                        size="sm"
                        onClick={() => reduceitemfromthecart(item)}
                      >
                        <LuMinus />
                      </IconButton>

                      <Box px={4}>
                        <Text>{item.quantity}</Text>
                      </Box>

                      <IconButton
                        aria-label="Increase quantity"
                        variant="ghost"
                        size="sm"
                        onClick={() => additemtocart(item)}
                      >
                        <LuPlus />
                      </IconButton>
                    </HStack>
                  </Flex>

                  {/* PRICE */}
                  <Text
                    textAlign={{ base: "left", md: "center" }}
                    fontWeight="medium"
                  >
                    ${item.product.unit_price}
                  </Text>

                  {/* TOTAL */}
                  <Text
                    textAlign={{ base: "left", md: "center" }}
                    fontWeight="bold"
                  >
                    ${item.total_price}
                  </Text>

                  {/* REMOVE */}
                  <Flex justify="center">
                    <IconButton
                      aria-label="Remove item"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => removefromcart(item.product.id)}
                    >
                      <LuX />
                    </IconButton>
                  </Flex>
                </Grid>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* RIGHT SIDE SUMMARY */}
        <Box
          border="1px solid"
          borderColor={borderColor}
          p={6}
          bg={cardBg}
          rounded="lg"
          shadow="sm"
          position={{ lg: "sticky" }}
          top="20px"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Total
          </Text>

          <VStack gap={4} align="stretch">
            <Flex justify="space-between">
              <Text color={muted_text}>Sub-Total</Text>
              <Text fontWeight="semibold">${subTotal.toFixed(2)}</Text>
            </Flex>

            <Separator />
            <Flex justify="space-between">
              <Text color={muted_text}>Delivery</Text>
              <Text>cash on delivery</Text>
            </Flex>
            {/* <Box>
              <Text color={muted_text} mb={3}>
                Delivery
              </Text>
            </Box> */}

            <Button size="lg" colorPalette="red" mt={4} disabled>
              Check Out
            </Button>

            <Box pt={4}>
              <Text fontWeight="semibold" mb={3}>
                We Accept
              </Text>

              <Flex wrap="wrap" gap={3}>
                <Box
                  px={3}
                  py={1}
                  border="1px solid"
                  borderColor={borderColor}
                  rounded="md"
                  fontSize="sm"
                >
                  <Icon color={"purple.500"}>
                    <FaStripe size={30} />
                  </Icon>
                </Box>
              </Flex>
            </Box>

            <Box fontSize="sm" color={muted_text} textAlign="center" pt={4}>
              <HStack justify="center">
                <Icon color="green" boxSize={18} mr={"-5px"} mb={"-3px"}>
                  <LuShieldCheck />
                </Icon>

                <Text>payments secured via</Text>

                <Link
                  href="https://stripe.com/resources/more/payment-security"
                  target="_blank"
                  color={"blue.500"}
                  textDecoration={"underline"}
                >
                  stripe payments
                </Link>
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Cart;
