import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaFire } from "react-icons/fa";

const flicker = keyframes`
  0% {
    transform: translateY(0) scale(1) rotate(-3deg);
    opacity: .9;
  }
  15% {
    transform: translateY(-1px) scale(1.12) rotate(2deg);
    opacity: 1;
  }
  30% {
    transform: translateY(1px) scale(.95) rotate(-2deg);
    opacity: .95;
  }
  45% {
    transform: translateY(-2px) scale(1.18) rotate(4deg);
    opacity: 1;
  }
  60% {
    transform: translateY(1px) scale(.92) rotate(-4deg);
    opacity: .9;
  }
  80% {
    transform: translateY(-1px) scale(1.08) rotate(2deg);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1) rotate(-3deg);
    opacity: .9;
  }
`;

const glow = keyframes`
  0%,100% {
    filter:
      drop-shadow(0 0 4px #ff8c00)
      drop-shadow(0 0 10px #ff4500)
      drop-shadow(0 0 16px #ff0000);
  }

  50% {
    filter:
      drop-shadow(0 0 8px #ffd700)
      drop-shadow(0 0 18px #ff6600)
      drop-shadow(0 0 28px #ff2200);
  }
`;

const sizes = {
  sm: "24px",
  md: "34px",
  lg: "46px",
  xl: "60px",
};

type Props = {
  size?: keyof typeof sizes;
};

export default function FireFlame({ size = "md" }: Props) {
  const iconSize = sizes[size];

  return (
    <Box position="relative" w={iconSize} h={iconSize}>
      {/* Outer glow */}
      <Box
        as={FaFire}
        position="absolute"
        inset={0}
        boxSize="100%"
        color="orange.300"
        opacity={0.25}
        transform="scale(1.4)"
        animation={`${glow} 0.9s ease-in-out infinite`}
      />

      {/* Middle flame */}
      <Box
        as={FaFire}
        position="absolute"
        inset={0}
        boxSize="100%"
        color="orange.400"
        animation={`${flicker} .7s ease-in-out infinite`}
      />

      {/* Inner flame */}
      <Box
        as={FaFire}
        position="absolute"
        inset={0}
        boxSize="82%"
        left="9%"
        top="5%"
        color="yellow.300"
        animation={`${flicker} .45s ease-in-out infinite reverse`}
      />
    </Box>
  );
}