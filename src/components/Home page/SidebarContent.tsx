import {
  Box,
  Flex,
  useDisclosure,
  Text,
  Icon,
  Collapsible,
} from "@chakra-ui/react";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import NavItem from "./NavItem";
import { HiCode, HiCollection } from "react-icons/hi";
import { FaClipboardCheck, FaRss } from "react-icons/fa";
import { FaShopify, FaSlack } from "react-icons/fa";

import { SiZapier } from "react-icons/si";

const SidebarContent = () => {
  const integrations = useDisclosure();

  return (
    <Box
      borderRadius={"10px"}
      w="60"
      minH="100vh"
      bg="white"
      borderRightWidth="1px"
      position="sticky"
      top="0"
      overflowY="auto"
      _dark={{
        bg: "gray.800",
      }}
    >
      <Flex px="4" py="5" align="center">
        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          My App
        </Text>
      </Flex>

      <Flex direction="column" fontSize="sm">
        <NavItem icon={MdHome}>Home</NavItem>

        <NavItem icon={FaRss}>Articles</NavItem>

        <NavItem icon={HiCollection}>Collections</NavItem>

        <NavItem icon={FaClipboardCheck}>Checklists</NavItem>

        <NavItem icon={HiCode} onClick={integrations.onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.open ? "rotate(90deg)" : ""}
          />
        </NavItem>

        <Collapsible.Root open={integrations.open}>
          <Collapsible.Content>
            <NavItem icon={FaShopify} pl="12" py="2">
              Shopify
            </NavItem>

            <NavItem icon={FaSlack} pl="12" py="2">
              Slack
            </NavItem>

            <NavItem icon={SiZapier} pl="12" py="2">
              Zapier
            </NavItem>
          </Collapsible.Content>
        </Collapsible.Root>

        <NavItem icon={AiFillGift}>Changelog</NavItem>

        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
