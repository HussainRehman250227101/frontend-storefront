import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { memo, useCallback, useMemo } from "react";
import { FaRegStar, FaShoppingCart, FaStar, FaStarHalfAlt, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../app/store";
import dummy from "../../assets/dummy.jpg";
import type { itemType, postToCart } from "../../features/Cart/CartInterfaces";
import { selectCartItems } from "../../features/Cart/CartSlice";
import {
  deleteItemFromCart,
  getCart,
  postItemToCart,
} from "../../features/Cart/CartThunk";
import type { product } from "../../features/Products/ProductInterfaces";
import { Link } from "react-router";

interface Props {
  product: product;
}

type ProductWithReviewCount = product & {
  review_count?: number;
  reviewCount?: number;
  reviews_count?: number;
  reviewsCount?: number;
};

type StarState = "filled" | "half" | "empty";

const MAX_RATING = 5;
const DESCRIPTION_LIMIT = 110;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const ProductCard = memo(function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector<RootState, itemType[] | undefined>(
    selectCartItems,
  );

  const cartItem = useMemo(
    () =>
      Array.isArray(cartItems)
        ? cartItems.find((item) => item.product.id === product.id)
        : undefined,
    [cartItems, product.id],
  );

  const imageSrc = useMemo(() => {
    const apiImage = product.images?.[0]?.image?.trim();
    return apiImage && apiImage.length > 0 ? apiImage : dummy;
  }, [product.images]);

  const description = useMemo(() => {
    if (product.description.length <= DESCRIPTION_LIMIT) {
      return product.description;
    }

    return `${product.description.slice(0, DESCRIPTION_LIMIT).trim()}...`;
  }, [product.description]);

  const formattedPrice = useMemo(
    () => currencyFormatter.format(product.price_with_tax),
    [product.price_with_tax],
  );

  const reviewCount = getReviewCount(product);

  const addToCart = useCallback(
    async (productId: number) => {
      const data: postToCart = {
        product_id: productId,
        quantity: 1,
      };

      await dispatch(postItemToCart(data));
      dispatch(getCart());
    },
    [dispatch],
  );

  const removeFromCart = useCallback(
    async (itemId: number) => {
      await dispatch(deleteItemFromCart(itemId));
      dispatch(getCart());
    },
    [dispatch],
  );

  return (
    <Card.Root
      as="article"
      h="full"
      overflow="hidden"
      bg="bg.panel"
      borderColor="border"
      rounded="xl"
      shadow="xs"
      transition="border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
      _hover={{
        borderColor: "border.emphasized",
        shadow: "md",
        transform: "translateY(-2px)",
      }}
      _focusWithin={{
        borderColor: "orange.500",
        boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)",
      }}
      css={{
        "&:hover [data-product-image]": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Link to={`/products/${product.id}`}  state={{product}}>
      
      <Box position="relative" overflow="hidden" bg="bg.subtle">
        <AspectRatio ratio={4 / 3}>
          <Image
            data-product-image
            src={imageSrc}
            alt={`${product.title} product image`}
            loading="lazy"
            decoding="async"
            objectFit="cover"
            transition="transform 220ms ease"
          />
        </AspectRatio>

        {product.inventory > 0 ? (
          <Badge
            position="absolute"
            top="3"
            left="3"
            colorPalette="green"
            variant="solid"
            rounded="full"
            px="2.5"
            py="1"
            shadow="sm"
          >
            In stock
          </Badge>
        ) : (
          <Badge
            position="absolute"
            top="3"
            left="3"
            colorPalette="red"
            variant="solid"
            rounded="full"
            px="2.5"
            py="1"
            shadow="sm"
          >
            Out of stock
          </Badge>
        )}
      </Box>

      <Card.Body gap="4" p={{ base: 4, md: 5 }}>
        <Stack gap="2.5" flex="1">
          <Card.Title
            color="fg"
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="semibold"
            lineHeight="1.3"
            lineClamp="2"
          >
            {product.title}
          </Card.Title>

          <RatingDisplay rating={product.rating} reviewCount={reviewCount} />

          <Card.Description
            color="fg.muted"
            fontSize="sm"
            lineHeight="1.6"
            lineClamp="3"
          >
            {description}
          </Card.Description>
        </Stack>

        <HStack align="end" justify="space-between" gap="3">
          <Box>
            <Text color="fg.muted" fontSize="xs" fontWeight="medium">
              Price
            </Text>
            <Text
              color="fg"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="1.1"
            >
              {formattedPrice}
            </Text>
          </Box>

          {product.promotions.length > 0 ? (
            <Badge colorPalette="orange" variant="subtle" rounded="full">
              Deal
            </Badge>
          ) : null}
        </HStack>
      </Card.Body>

      </Link>

      <Card.Footer p={{ base: 4, md: 5 }} pt="0">
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
            disabled={product.inventory===0}
            rounded="lg"
            fontWeight="semibold"
            onClick={() => addToCart(product.id)}
            aria-label={`Add ${product.title} to cart`}
          >
            <Icon as={FaShoppingCart} />
            Add to Cart
          </Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
});

function RatingDisplay({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) {
  const normalizedRating = clampRating(rating);
  const starStates = getStarStates(normalizedRating);
  const ratingLabel = `${normalizedRating.toFixed(1)} out of ${MAX_RATING} stars`;

  return (
    <HStack gap="2" align="center" aria-label={ratingLabel}>
      <HStack gap="0.5" aria-hidden="true">
        {starStates.map((state, index) => (
          <RatingStar key={`${state}-${index}`} state={state} />
        ))}
      </HStack>

      <HStack gap="1" minW="0">
        <Text color="fg" fontSize="sm" fontWeight="semibold">
          {normalizedRating.toFixed(1)}
        </Text>

        {typeof reviewCount === "number" ? (
          <Text color="fg.muted" fontSize="xs" truncate>
            ({formatReviewCount(reviewCount)})
          </Text>
        ) : null}
      </HStack>

      <VisuallyHidden>{ratingLabel}</VisuallyHidden>
    </HStack>
  );
}

function RatingStar({ state }: { state: StarState }) {
  if (state === "filled") {
    return <Icon as={FaStar} boxSize="3.5" color="orange.400" />;
  }

  if (state === "half") {
    return <Icon as={FaStarHalfAlt} boxSize="3.5" color="orange.400" />;
  }

  return <Icon as={FaRegStar} boxSize="3.5" color="fg.muted" opacity="0.55" />;
}

function getStarStates(rating: number): StarState[] {
  return Array.from({ length: MAX_RATING }, (_, index) => {
    const starValue = index + 1;

    if (rating >= starValue) {
      return "filled";
    }

    if (rating >= starValue - 0.5) {
      return "half";
    }

    return "empty";
  });
}

function clampRating(rating: number) {
  if (!Number.isFinite(rating)) {
    return 0;
  }

  return Math.min(Math.max(rating, 0), MAX_RATING);
}

function getReviewCount(product: ProductWithReviewCount) {
  const count =
    product.review_count ??
    product.reviewCount ??
    product.reviews_count ??
    product.reviewsCount;

  return typeof count === "number" && Number.isFinite(count) ? count : undefined;
}

function formatReviewCount(reviewCount: number) {
  const label = reviewCount === 1 ? "review" : "reviews";
  return `${reviewCount.toLocaleString()} ${label}`;
}

export default ProductCard;
