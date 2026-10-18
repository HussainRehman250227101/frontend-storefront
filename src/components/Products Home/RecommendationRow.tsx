import { Badge, Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import type { RecommendationResult } from "../../features/Products/ProductInterfaces";

interface Props {
  title: string;
  summary?: string;
  results: RecommendationResult[];
}

export default function RecommendationRow({ title, summary, results }: Props) {
  if (!results.length) {
    return null;
  }

  return (
    <Box mt={10}>
      <Stack gap={2} mb={5}>
        <Heading size="xl">{title}</Heading>
        {summary ? (
          <Text color="fg.muted" maxW="3xl">
            {summary}
          </Text>
        ) : null}
      </Stack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={4}>
        {results.map((item) => (
          <Stack key={item.product.id} gap={2}>
            {typeof item.similarity === "number" ? (
              <Badge colorPalette="orange" width="fit-content" rounded="full">
                {Math.round(item.similarity * 100)}% content match
              </Badge>
            ) : null}
            <ProductCard product={item.product} />
            {item.reasons[0] ? (
              <Text color="fg.muted" fontSize="sm">
                {item.reasons[0]}
              </Text>
            ) : null}
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
