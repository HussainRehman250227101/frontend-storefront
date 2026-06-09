import {
  Avatar,
  Container,
  Heading,
  HStack,
  Image,
  Spacer,
  IconButton,
  Link,
  Box,
} from "@chakra-ui/react";
import image from "../assets/images/chakra.png";
import { NavLink } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Container py="5px" bg={"bg.muted"} color={"fg.muted"}>
      <HStack>
        <NavLink to="/">
          <HStack>
            <Image w="45px" h="45px" rounded="full" src={image} />
            <Heading as="h1" fontSize={"2xl"}>
              Hussain's Store
            </Heading>
          </HStack>
        </NavLink>
        <Spacer />

        <NavLink to="/about">
        {({isActive})=> (
            <Box 
            color={isActive ? "green.500": "gray.500"}
            fontWeight={isActive ? "bold": "medium"}
            >
            About
            </Box>
        )}
        </NavLink>
    
        <Spacer />

        <Avatar.Root bg={"bg.muted"} variant={"outline"}>
          <Avatar.Fallback name="Hussain Khan" />
          <Avatar.Image src="" />
        </Avatar.Root>
        <IconButton variant={"ghost"} onClick={toggleColorMode} rounded="full">
          {colorMode === "light" ? <LuSun /> : <LuMoon />}
        </IconButton>
      </HStack>
    </Container>
  );
};

export default Navbar;
