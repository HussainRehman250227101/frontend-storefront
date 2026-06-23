import {
  Avatar,
  Badge,
  Box,
  Button,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Link as ChakraLink,
  Portal,
  Separator,
  Span,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { memo, useCallback, useState } from "react";
import { type ElementType } from "react";
import { AiFillBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LuExternalLink } from "react-icons/lu";
import type { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/Auth/AuthSlice";
import { ColorModeButton } from "./ui/color-mode";

type NavItem = {
  label: string;
  to: string;
  icon?: ElementType;
  external?: boolean;
};

type AuthActionsProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

type MobileNavigationProps = AuthActionsProps & {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (details: { open: boolean }) => void;
  navItems: NavItem[];
};

const BRAND_NAME = "Hussain Commerce";
const BRAND_TAGLINE = "Premium marketplace";

const NAV_ITEMS: NavItem[] = [
  {
    label: "Cart",
    to: "/cart",
    icon: FaShoppingCart,
  },
  {
    label: "APIs",
    to: "https://api.hussaindev.tech/store/",
    external: true,
  },
];

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const mobileNav = useDisclosure();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const loggedUser = localStorage.getItem("isAuthenticated") === "true";
  const canAccessAccountActions = isAuthenticated || loggedUser;

  const handleLogout = useCallback(() => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  }, [dispatch, navigate]);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="bg.panel/95"
      borderBottomWidth="1px"
      borderColor="border"
      shadow="xs"
      backdropFilter="blur(16px)"
    >
      <Flex
        as="nav"
        aria-label="Primary navigation"
        align="center"
        justify="space-between"
        gap={{ base: 3, md: 6 }}
        minH={{ base: "16", md: "18" }}
        maxW="7xl"
        mx="auto"
        px={{ base: 3, sm: 4, lg: 8 }}
      >
        <HStack gap={{ base: 2, md: 7 }} minW="0">
          <IconButton
            aria-label="Open navigation menu"
            display={{ base: "inline-flex", md: "none" }}
            variant="ghost"
            size="sm"
            color="fg.muted"
            rounded="full"
            onClick={mobileNav.onOpen}
            _hover={{ bg: "bg.subtle", color: "fg" }}
          >
            <AiOutlineMenu />
          </IconButton>

          <Brand />

          <HStack
            as="ul"
            display={{ base: "none", md: "flex" }}
            gap="1"
            listStyleType="none"
            m="0"
            p="0"
          >
            {NAV_ITEMS.map((item) => (
              <Box as="li" key={item.to}>
                <NavItemButton item={item} />
              </Box>
            ))}
          </HStack>
        </HStack>

        <HStack gap={{ base: 1, md: 2 }} flexShrink="0">
          <Box display={{ base: "none", lg: "block" }} w="min(30vw, 340px)">
            <SearchField />
          </Box>

          <NotificationsButton />
          <AuthActions
            isAuthenticated={canAccessAccountActions}
            onLogout={handleLogout}
          />
          <ColorModeButton rounded="full" />
        </HStack>
      </Flex>

      <MobileNavigation
        isOpen={mobileNav.open}
        onClose={mobileNav.onClose}
        onOpenChange={(details) => {
          if (details.open) {
            mobileNav.onOpen();
            return;
          }

          mobileNav.onClose();
        }}
        navItems={NAV_ITEMS}
        isAuthenticated={canAccessAccountActions}
        onLogout={handleLogout}
      />
    </Box>
  );
};

const Brand = memo(function Brand() {
  return (
    <ChakraLink
      asChild
      color="fg"
      rounded="lg"
      _hover={{ textDecoration: "none" }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "orange.500",
        outlineOffset: "4px",
      }}
    >
      <NavLink to="/">
        <HStack gap="3" minW="0">
          <Flex
            aria-hidden="true"
            align="center"
            justify="center"
            boxSize={{ base: "9", md: "10" }}
            rounded="xl"
            bg="orange.100"
            color="orange.700"
            shadow="sm"
            flexShrink="0"
            _dark={{
              bg: "orange.500",
              bgGradient: "linear(to-br, orange.400, orange.600)",
              color: "white",
            }}
          >
            <Icon as={LuShoppingBag} boxSize={{ base: "5", md: "5.5" }} />
          </Flex>

          <Box minW="0">
            <HStack gap="2" minW="0">
              <Text
                color="fg"
                fontSize={{ base: "md", sm: "lg" }}
                fontWeight="bold"
                lineHeight="1"
                letterSpacing="tight"
                truncate
              >
                {BRAND_NAME}
              </Text>
              <Badge
                display={{ base: "none", xl: "inline-flex" }}
                colorPalette="orange"
                variant="subtle"
                size="sm"
                rounded="full"
              >
                Pro
              </Badge>
            </HStack>
            <Text
              display={{ base: "none", sm: "block" }}
              color="fg.muted"
              fontSize="xs"
              fontWeight="medium"
              lineHeight="1.2"
              mt="1"
              truncate
            >
              {BRAND_TAGLINE}
            </Text>
          </Box>
        </HStack>
      </NavLink>
    </ChakraLink>
  );
});

function NavItemButton({ item }: { item: NavItem }) {
  const ItemIcon = item.icon;

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      color="fg.muted"
      fontWeight="semibold"
      px="3"
      rounded="full"
      _hover={{ bg: "bg.subtle", color: "fg" }}
      _currentPage={{ bg: "orange.subtle", color: "orange.fg" }}
    >
      {item.external ? (
        <a href={item.to} target="_blank" rel="noopener noreferrer">
          {ItemIcon && <Icon as={ItemIcon} />}
          {item.label}
          <Icon as={LuExternalLink} boxSize="3" />
        </a>
      ) : (
        <NavLink to={item.to}>
          {ItemIcon && <Icon as={ItemIcon} />}
          {item.label}
        </NavLink>
      )}
    </Button>
  );
}

function SearchField() {
  const [searchParams , setSearchParams]=useSearchParams()
  const [searchValue,SetSearchValue]=useState(searchParams.get('search') ?? "")

  const enterPressed = ()=>{

     const nextParams = new URLSearchParams(searchParams);

     if (searchValue){
      nextParams.set('search',String(searchValue))
    }else{
      nextParams.delete('search')
    }

    setSearchParams(nextParams)

  }

  return (
    <Box role="search" w="full">
      <InputGroup
        startElement={<Icon as={AiOutlineSearch} color="fg.muted" />}
        startElementProps={{ pointerEvents: "none" }}
      >
        <Input
          value = {searchValue}
          onChange={(e)=>{ SetSearchValue(e.target.value)}}
          onKeyDown={(e)=> e.key === 'Enter' ? enterPressed() : null}
          id="site-search"
          aria-label="Search products"
          type="search"
          placeholder="Search products..."
          bg="bg.subtle"
          borderColor="border"
          rounded="full"
          _placeholder={{ color: "fg.muted" }}
          _hover={{ borderColor: "border.emphasized" }}
          _focusVisible={{
            borderColor: "orange.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)",
          }}
        />
      </InputGroup>
    </Box>
  );
}

function NotificationsButton() {
  return (
    <IconButton
      aria-label="Open notifications"
      variant="ghost"
      size="sm"
      color="fg.muted"
      rounded="full"
      _hover={{ bg: "bg.subtle", color: "fg" }}
    >
      <AiFillBell />
    </IconButton>
  );
}

function AuthActions({ isAuthenticated, onLogout }: AuthActionsProps) {
  if (isAuthenticated) {
    return (
      <HStack gap="2">
        <Avatar.Root
          display={{ base: "none", sm: "inline-flex" }}
          size="sm"
          bg="orange.subtle"
          color="orange.fg"
        >
          <Avatar.Fallback name="hussain khan" />
        </Avatar.Root>
        <Button
          variant="ghost"
          size="sm"
          color="fg.muted"
          fontWeight="semibold"
          rounded="full"
          onClick={onLogout}
          _hover={{ bg: "bg.subtle", color: "fg" }}
        >
          Logout
        </Button>
      </HStack>
    );
  }

  return (
    <Button
      asChild
      variant="solid"
      size="sm"
      colorPalette="orange"
      rounded="full"
      fontWeight="semibold"
      px={{ base: 3, sm: 4 }}
      _currentPage={{ opacity: 0.92 }}
    >
      <NavLink to="/login">
        <Span display={{ base: "none", sm: "inline" }}>Login / Signup</Span>
        <Span display={{ base: "inline", sm: "none" }}>Login</Span>
      </NavLink>
    </Button>
  );
}

function MobileNavigation({
  isOpen,
  onClose,
  onOpenChange,
  navItems,
  isAuthenticated,
  onLogout,
}: MobileNavigationProps) {
  const handleMobileLogout = useCallback(() => {
    onClose();
    onLogout();
  }, [onClose, onLogout]);

  return (
    <DrawerRoot
      open={isOpen}
      placement="start"
      onOpenChange={onOpenChange}
      size="xs"
    >
      <Portal>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent bg="bg.panel">
            <DrawerHeader
              alignItems="center"
              borderBottomWidth="1px"
              borderColor="border"
              display="flex"
              justifyContent="space-between"
              py="4"
            >
              <Brand />
              <DrawerCloseTrigger aria-label="Close navigation menu" />
            </DrawerHeader>

            <DrawerBody py="5">
              <VStack align="stretch" gap="5">
                <SearchField />

                <Separator />

                <VStack
                  as="ul"
                  align="stretch"
                  gap="2"
                  listStyleType="none"
                  m="0"
                  p="0"
                >
                  {navItems.map((item) => (
                    <Box as="li" key={item.to}>
                      <Button
                        asChild
                        justifyContent="flex-start"
                        variant="ghost"
                        w="full"
                        color="fg.muted"
                        fontWeight="semibold"
                        rounded="lg"
                        _hover={{ bg: "bg.subtle", color: "fg" }}
                        _currentPage={{
                          bg: "orange.subtle",
                          color: "orange.fg",
                        }}
                      >
                        {item.external ? (
                          <a
                            href={item.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                          >
                            <HStack gap="1">
                              {item.icon && <Icon as={item.icon} />}
                              <Span>{item.label}</Span>
                              <Icon as={LuExternalLink} boxSize="3" />
                            </HStack>
                          </a>
                        ) : (
                          <NavLink to={item.to} onClick={onClose}>
                            {item.icon && <Icon as={item.icon} />}
                            {item.label}
                          </NavLink>
                        )}
                      </Button>
                    </Box>
                  ))}
                </VStack>

                <Separator />

                {isAuthenticated ? (
                  <Button
                    justifyContent="flex-start"
                    variant="ghost"
                    color="fg.muted"
                    fontWeight="semibold"
                    rounded="lg"
                    onClick={handleMobileLogout}
                    _hover={{ bg: "bg.subtle", color: "fg" }}
                  >
                    <Avatar.Root
                      size="2xs"
                      bg="orange.subtle"
                      color="orange.fg"
                    >
                      <Avatar.Fallback name="hussain khan" />
                    </Avatar.Root>
                    Logout
                  </Button>
                ) : (
                  <Button
                    asChild
                    justifyContent="flex-start"
                    colorPalette="orange"
                    rounded="lg"
                    fontWeight="semibold"
                  >
                    <NavLink to="/login" onClick={onClose}>
                      Login / Signup
                    </NavLink>
                  </Button>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </Portal>
    </DrawerRoot>
  );
}

export default Nav;
