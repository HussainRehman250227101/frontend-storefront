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

import {
  FiUser,
  FiLock,
  FiMail,
  FiPhone,
  FiCalendar,
} from "react-icons/fi";

import { Link as RouterLink, useNavigate } from "react-router";

import { useForm, type SubmitHandler } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../app/store";

import { signupThunk } from "../AuthThunks";

import { toast } from "react-toastify";

import type { signupPostInterface } from "../AuthInterfaces";

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector<RootState>((state)=> state.user.status) === 'loading'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupPostInterface>();

  const onSubmit: SubmitHandler<signupPostInterface> = async (data) => {
    try {
      await dispatch(signupThunk(data)).unwrap();

      toast.success("Account created successfully");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.username?.[0] ||
          error?.email?.[0] ||
          error?.password?.[0] ||
          "Account creation failed"
      );
    }
  };

  // Theme Colors
  const bg = useColorModeValue("gray.100", "gray.900");

  const cardBg = useColorModeValue("white", "gray.800");

  const headingColor = useColorModeValue("gray.800", "white");

  const textColor = useColorModeValue("gray.600", "gray.300");

  const buttonColor = useColorModeValue("white", "black");

  const borderColor = useColorModeValue("gray.200", "gray.700");

  const inputBg = useColorModeValue("gray.50", "gray.700");

  const gradient = useColorModeValue(
    "linear(to-br, blue.400, purple.500)",
    "linear(to-br, blue.500, purple.700)"
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
        maxW="550px"
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
                Create Account 🚀
              </Heading>

              <Text color={textColor} textAlign="center" fontSize="sm">
                Signup to continue to your dashboard
              </Text>
            </VStack>

            {/* Form */}
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={5}>
                {/* Username */}
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Username
                  </Text>

                  <InputGroup
                    startElement={<Icon as={FiUser} color="gray.400" />}
                  >
                    <Input
                      type="text"
                      placeholder="Enter username"
                      bg={inputBg}
                      borderColor={borderColor}
                      size="lg"
                      rounded="xl"
                      {...register("username", {
                        required: "Username is required",
                      })}
                    />
                  </InputGroup>

                  {errors.username && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.username.message}
                    </Text>
                  )}
                </Box>

                {/* Email */}
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Email
                  </Text>

                  <InputGroup
                    startElement={<Icon as={FiMail} color="gray.400" />}
                  >
                    <Input
                      type="email"
                      placeholder="Enter email"
                      bg={inputBg}
                      borderColor={borderColor}
                      size="lg"
                      rounded="xl"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                  </InputGroup>

                  {errors.email && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.email.message}
                    </Text>
                  )}
                </Box>

                {/* First & Last Name */}
                <HStack align="start">
                  <Box flex={1}>
                    <Text mb={2} fontWeight="medium">
                      First Name
                    </Text>

                    <Input
                      placeholder="First name"
                      bg={inputBg}
                      borderColor={borderColor}
                      size="lg"
                      rounded="xl"
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                    />

                    {errors.first_name && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.first_name.message}
                      </Text>
                    )}
                  </Box>

                  <Box flex={1}>
                    <Text mb={2} fontWeight="medium">
                      Last Name
                    </Text>

                    <Input
                      placeholder="Last name"
                      bg={inputBg}
                      borderColor={borderColor}
                      size="lg"
                      rounded="xl"
                      {...register("last_name", {
                        required: "Last name is required",
                      })}
                    />

                    {errors.last_name && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.last_name.message}
                      </Text>
                    )}
                  </Box>
                </HStack>

                {/* Phone */}
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Phone Number
                  </Text>

                  <InputGroup
                    startElement={<Icon as={FiPhone} color="gray.400" />}
                  >
                    <Input
                      type="number"
                      placeholder="Enter phone number"
                      bg={inputBg}
                      borderColor={borderColor}
                      size="lg"
                      rounded="xl"
                      {...register("phone", {
                        required: "Phone number is required",
                        valueAsNumber: true,
                      })}
                    />
                  </InputGroup>

                  {errors.phone && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.phone.message}
                    </Text>
                  )}
                </Box>

                {/* Birth Date */}
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Birth Date
                  </Text>

                  <InputGroup
                    startElement={<Icon as={FiCalendar} color="gray.400" />}
                  >
                    <Input
                      type="date"
                      bg={inputBg}
                      borderColor={borderColor}
                      size="lg"
                      rounded="xl"
                      {...register("birth_date", {
                        required: "Birth date is required",
                        valueAsDate: true,
                      })}
                    />
                  </InputGroup>

                  {errors.birth_date && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.birth_date.message}
                    </Text>
                  )}
                </Box>

                {/* Password */}
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Password
                  </Text>

                  <InputGroup
                    startElement={<Icon as={FiLock} color="gray.400" />}
                  >
                    <Input
                      type="password"
                      placeholder="Enter password"
                      bg={inputBg}
                      borderColor={borderColor}
                      size="lg"
                      rounded="xl"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters",
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  rounded="xl"
                  bgGradient={gradient}
                  color={buttonColor}
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "lg",
                  }}
                  transition="0.2s"
                >
                  {loading ? (<Spinner size={'sm'}/>): 'Create Account'}
                </Button>
              </Stack>
            </Box>

            {/* Divider */}
            <HStack>
              <Separator flex="1" />
            </HStack>

            {/* Footer */}
            <Text textAlign="center" color={textColor} fontSize="sm">
              Already have an account?{" "}
              <Link
                asChild
                color="blue.400"
                fontWeight="semibold"
                _hover={{
                  textDecoration: "none",
                  color: "blue.500",
                }}
              >
                <RouterLink to="/login">Login</RouterLink>
              </Link>
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default SignupPage;