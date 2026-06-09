import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Separator,
  Stack,
  Text,
  VStack,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../../components/ui/color-mode";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FiLock, FiUser } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { loginThunk } from "../AuthThunks";
import { toast } from "react-toastify";

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading =useSelector<RootState>((state) => state.user.status) === "loading";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await dispatch(loginThunk(data)).unwrap();

      toast.success("Login successful");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.detail || "Invalid credentials");
    }
    // dispatch(loginUser(data))
  };
  // Responsive color mode values
  const bg = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const buttonColor = useColorModeValue("white", "black");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const gradient = useColorModeValue(
    "linear(to-br, blue.400, purple.500)",
    "linear(to-br, blue.500, purple.700)",
  );

  return (
    <Flex
      minH="100vh"
      bg={bg}
      align="center"
      justify="center"
      px={4}
      py={10}
      position="relative"
      overflow="hidden"
    >
      {/* Background Glow */}
      <Box
        position="absolute"
        top="-120px"
        left="-120px"
        w="300px"
        h="300px"
        bgGradient={gradient}
        filter="blur(120px)"
        opacity={0.4}
      />

      <Box
        position="absolute"
        bottom="-120px"
        right="-120px"
        w="300px"
        h="300px"
        bgGradient={gradient}
        filter="blur(120px)"
        opacity={0.4}
      />

      <Card.Root
        w="full"
        maxW="460px"
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        rounded="3xl"
        shadow="2xl"
        backdropFilter="blur(20px)"
        overflow="hidden"
      >
        {/* Top Gradient Bar */}
        <Box h="8px" bgGradient={gradient} />

        <Card.Body p={{ base: 6, md: 10 }}>
          <VStack gap={8} align="stretch">
            {/* Header */}
            <VStack gap={3}>
              <Heading
                size={{ base: "xl", md: "2xl" }}
                color={headingColor}
                textAlign="center"
              >
                Welcome Back 👋
              </Heading>

              <Text color={textColor} textAlign="center" fontSize="sm">
                Login to continue to your dashboard
              </Text>
            </VStack>

            {/* Form */}
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={5}>
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Username
                  </Text>

                  <InputGroup
                    startElement={<Icon as={FiUser} color="gray.400" />}
                  >
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      bg={inputBg}
                      border="1px solid"
                      borderColor={borderColor}
                      focusRing="none"
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
                      }}
                      size="lg"
                      rounded="xl"
                      {...register("username", {
                        required: "Username is required",
                      })}
                    />
                  </InputGroup>
                </Box>

                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="medium">Password</Text>

                    <Link
                      asChild
                      fontSize="sm"
                      color="blue.400"
                      _hover={{
                        textDecoration: "none",
                        color: "blue.500",
                      }}
                    >
                      <RouterLink to="/forgot-password">
                        Forgot Password?
                      </RouterLink>
                    </Link>
                  </HStack>

                  <InputGroup
                    startElement={<Icon as={FiLock} color="gray.400" />}
                  >
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      bg={inputBg}
                      border="1px solid"
                      borderColor={errors.password ? "red.500" : borderColor}
                      focusRing="none"
                      _focus={{
                        borderColor: errors.password ? "red.500" : "blue.400",
                        boxShadow: errors.password
                          ? "0 0 0 1px var(--chakra-colors-red-500)"
                          : "0 0 0 1px var(--chakra-colors-blue-400)",
                      }}
                      size="lg"
                      rounded="xl"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 3,
                          message: "Password must be at least 3 characters",
                        },
                      })}
                    />
                  </InputGroup>
                  {errors.password && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.password.message}
                    </Text>
                  )}
                </Box>

                <Button
                  size="lg"
                  type="submit"
                  rounded="xl"
                  bgGradient={gradient}
                  color={buttonColor}
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "lg",
                  }}
                  transition="0.2s"
                >
                  {loading ? <Spinner size={"sm"} /> : "login"}
                </Button>
              </Stack>
            </Box>

            {/* Divider */}
            <HStack>
              <Separator flex="1" />
              <Text fontSize="sm" color={textColor}>
                OR CONTINUE WITH
              </Text>
              <Separator flex="1" />
            </HStack>

            {/* Social Buttons */}
            <Stack direction={{ base: "column", sm: "row" }} gap={4}>
              <Button
                flex={1}
                variant="outline"
                rounded="xl"
                size="lg"
                disabled
              >
                <FaGoogle />
                Google
              </Button>

              <Button
                flex={1}
                variant="outline"
                rounded="xl"
                size="lg"
                disabled
              >
                <FaGithub />
                Github
              </Button>
            </Stack>

            {/* Footer */}
            <Text textAlign="center" color={textColor} fontSize="sm">
              Don&apos;t have an account?{" "}
              <Link
                asChild
                color="blue.400"
                fontWeight="semibold"
                _hover={{
                  textDecoration: "none",
                  color: "blue.500",
                }}
              >
                <RouterLink to="/signup">Create Account</RouterLink>
              </Link>
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default LoginPage;
