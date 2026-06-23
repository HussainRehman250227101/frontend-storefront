import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HiArrowLeft, HiOutlineShoppingBag } from "react-icons/hi2";

const NotFound = () => {
  return (
    <Container maxW="7xl" py={{ base: 16, md: 28 }}>
      <VStack gap={10}>
        <Box
          position="relative"
          textAlign="center"
        >
          <Text
            fontSize={{ base: "8rem", md: "14rem" }}
            fontWeight="900"
            opacity={0.08}
            lineHeight="1"
            userSelect="none"
          >
            404
          </Text>

          <VStack
            gap={4}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="100%"
          >
            <Heading size={{ base: "xl", md: "2xl" }}>
              Oops! Lost in the store?
            </Heading>

            <Text
              maxW="500px"
              color="fg.muted"
              fontSize={{ base: "md", md: "lg" }}
            >
              We couldn't find the page you're looking for.
              Let's get you back to discovering great products.
            </Text>
          </VStack>
        </Box>

        <HStack gap={4} flexWrap="wrap" justify="center">
          <Button
            asChild
            colorPalette="orange"
            size="lg"
            rounded="xl"
          >
            <RouterLink to="/">
              <HiOutlineShoppingBag />
              Browse Products
            </RouterLink>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            rounded="xl"
          >
            <RouterLink to="/">
              <HiArrowLeft />
              Back Home
            </RouterLink>
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default NotFound;