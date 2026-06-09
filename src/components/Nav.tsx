import {
  Avatar,
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  useDisclosure,
  VisuallyHidden,
  VStack,
  Image,
  Spacer,
  Text
} from "@chakra-ui/react";
import {logout} from '../features/Auth/AuthSlice'
import {
  AiFillBell,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import image from "../assets/images/chakra.png";

import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Nav = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(
  (state: RootState) => state.user.isAuthenticated
)
  const loggedUser = localStorage.getItem('isAuthenticated') === 'true'
  const bg = useColorModeValue("white", "gray.800");
  const orangeheader = useColorModeValue("orange.600", "orange.400");
  const avatarBgColor = useColorModeValue("gray.200", "gray.700");
  const mobileNav = useDisclosure();
  const dispatch =useDispatch<AppDispatch>()

  const logoutUser = ()=>{
    dispatch(logout());
  toast.success("Logged out successfully");
  }

  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <React.Fragment>
      <chakra.header
        position="sticky"
        top="0"
        zIndex="1000"
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" gap={3} alignItems="center">
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                onClick={mobileNav.onOpen}
              >
                <AiOutlineMenu />
              </IconButton>
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.open ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                gap={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <NavLink to="/cart">
                <Button variant="ghost" gap="2" w='full'>
                  <FaShoppingCart />
                  Cart
                </Button>
              </NavLink>
              </VStack>
            </Box>
            <NavLink to="/">
              <Image src={image} w="35px" h="35px" rounded="full" />
            </NavLink>
            <Text fontWeight={'semibold'} fontSize={'larger'} color={orangeheader}>Hussain's Shop</Text>
            <Spacer />
            <HStack
              gap={3}
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <NavLink to="/cart">
                <Button variant="ghost" gap="2" size="sm">
                  <FaShoppingCart />
                  Cart
                </Button>
              </NavLink>
            </HStack>
          </HStack>
          <Spacer />
          <HStack
            gap={3}
            display={mobileNav.open ? "none" : "flex"}
            alignItems="center"
          >
            <InputGroup startElement={<AiOutlineSearch />}>
              <Input
                focusRing={"none"}
                outline={"none"}
                borderColor={colorMode === "light" ? "gray.400" : "gray.200"}
                borderRadius={"10px"}
                border={"1px solid"}
                type="tel"
                placeholder="Search..."
              />
            </InputGroup>

            <chakra.a
              p={3}
              color="gray.800"
              _dark={{
                color: "inherit",
              }}
              rounded="sm"
              _hover={{
                color: "gray.800",
                _dark: {
                  color: "gray.600",
                },
              }}
            >
              <AiFillBell />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>

            {isAuthenticated || loggedUser ? (
              <>
              <Avatar.Root size="sm" bgColor={avatarBgColor}>
                <Avatar.Fallback name={"hussain khan"} />
                {/* <Avatar.Image src={"https://bit.ly/dan-abramov"} /> */}
              </Avatar.Root>
                
                <Button variant="ghost" gap="2" size="sm"
                onClick={()=> {
                  logoutUser()
                  navigate('/login')
                } }>
                  logout
                </Button>
              
              </>
            ) : (
              <NavLink to="/login">
                <Button variant="ghost" gap="2" size="sm">
                  login/Signup
                </Button>
              </NavLink>
            )}

            <IconButton
              variant={"ghost"}
              onClick={toggleColorMode}
              rounded="full"
            >
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default Nav;
