import {
  Avatar,
  Card,
  Flex,
  HStack,
  Stack,
  Text,
  Badge,
} from "@chakra-ui/react";
import { Star } from "lucide-react";
import api from "../../api/axios";

export interface Review {
  id: number;
  name: string;
  image: string;
  rating: number;
  description: string;
  created_at: Date;
}

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {

  const apiURL = api.defaults.baseURL 

  const formattedDate = new Date(review.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Card.Root
      borderWidth="1px"
      borderColor="border.emphasized"
      borderRadius="xl"
      overflow="hidden"
      bg="bg"
      shadow="sm"
      transition="all 0.2s ease"
      _hover={{
        shadow: "md",
        transform: "translateY(-2px)",
      }}
    >
      <Card.Body>
        <Stack gap={4}>
          <Flex justify="space-between" align="start" wrap="wrap" gap={3}>
            <HStack>
              <Avatar.Root size="lg">
                <Avatar.Image src={`${apiURL}${review.image}`} />
                <Avatar.Fallback name={review.name} />
              </Avatar.Root>

              <Stack gap={0}>
                <Text fontWeight="bold">{review.name}</Text>

                <Text fontSize="sm" color="fg.muted">
                  {formattedDate}
                </Text>
              </Stack>
            </HStack>

            <Badge
              colorPalette="orange"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="semibold"
            >
              {review.rating.toFixed(1)} / 5
            </Badge>
          </Flex>

          <HStack gap={1}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                fill={review.rating >= star ? "currentColor" : "none"}
                color={review.rating >= star ? "#F59E0B" : "#D1D5DB"}
              />
            ))}

            <Text fontSize="sm" color="fg.muted" ml={2}>
              {review.rating.toFixed(1)}
            </Text>
          </HStack>

          <Text color="fg.muted" lineHeight="tall" fontSize="md">
            {review.description}
          </Text>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}

export default ReviewCard;
