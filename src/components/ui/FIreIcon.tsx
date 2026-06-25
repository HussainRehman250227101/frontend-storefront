import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { LuFlame } from "react-icons/lu";

const flicker = keyframes`
  0% {
    transform: rotate(-3deg) scale(1);
    opacity: 0.95;
    filter: drop-shadow(0 0 2px #ff6a00);
  }
  25% {
    transform: rotate(2deg) scale(1.08);
    opacity: 1;
    filter: drop-shadow(0 0 6px #ff8c00);
  }
  50% {
    transform: rotate(-2deg) scale(0.96);
    opacity: 0.9;
    filter: drop-shadow(0 0 10px #ff4500);
  }
  75% {
    transform: rotate(3deg) scale(1.06);
    opacity: 1;
    filter: drop-shadow(0 0 8px #ffb000);
  }
  100% {
    transform: rotate(-3deg) scale(1);
    opacity: 0.95;
    filter: drop-shadow(0 0 2px #ff6a00);
  }
`;

type FireIconProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const sizes = {
  xs: "16px",
  sm: "20px",
  md: "28px",
  lg: "36px",
  xl: "48px",
};

export default function FireIcon({
  size = "md",
}: FireIconProps) {
  return (
    <Box
      as={LuFlame}
      color="orange.400"
      boxSize={sizes[size]}
      animation={`${flicker} 1s ease-in-out infinite`}
    />
  );
}