import { Flex, Icon, type FlexProps  } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import type {IconType, } from 'react-icons'

interface Props extends FlexProps{
  icon:IconType,
  children:React.ReactNode,
}


const NavItem = ({ icon, children, ...rest }:Props) => {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      fontWeight="semibold"
      transition=".15s ease"
      _hover={{
        bg: "gray.100",
        color: "gray.900",
      }}
      _dark={{
        color: "gray.400",
        _hover: {
          bg: "gray.700",
          color: "white",
        },
      }}
      {...rest}
    >
      {icon && (
        <Icon
          as={icon}
          mx="2"
          boxSize="4"
          _groupHover={{
            color,
          }}
        />
      )}

      {children}
    </Flex>
  );
};


export default NavItem;