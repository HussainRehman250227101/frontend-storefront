import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
  Avatar,
  Field,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../app/store";
import {  selectUser } from "../features/Auth/AuthSlice";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { userDataInterface } from "../features/Auth/AuthInterfaces";
import { useEffect } from "react";
import { userProfileThunk } from "../features/Auth/AuthThunks";

type ProfileFormData = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: number;
  birth_date: string;
};

const ProfilePage = () => {
  const userData = useSelector<RootState, userDataInterface | null>(selectUser);
  console.log(userData);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors ,isSubmitting},
  } = useForm<ProfileFormData>();

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      console.log(data);
      
      // Dispatch Redux Toolkit thunk here
      // await dispatch(updateProfile(userData))
    } catch (error) {
    } finally {
      console.log('passed');
      
    }
  };
  const dispatch =useDispatch<AppDispatch>()
  
  useEffect(()=>{
    
  dispatch(userProfileThunk())

},[dispatch])

useEffect(() => {
  if (userData) {
    reset({
      username: userData.username || "",
      email: userData.email || "",
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      phone: userData.phone || 0,
      birth_date: userData.birth_date
        ? new Date(userData.birth_date)
            .toISOString()
            .split("T")[0]
        : "",
    });
  }
}, [userData, reset]);

  return (
    <Box p={6}>
      <Card.Root maxW="900px" mx="auto" borderRadius="2xl" overflow="hidden">
        <Card.Body p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={8}>
              {/* Header */}
              <Flex
                direction={{
                  base: "column",
                  md: "row",
                }}
                align="center"
                gap={6}
              >
                <Avatar.Root size="2xl">
                  <Avatar.Fallback
                    name={`${userData?.first_name} ${userData?.last_name}`}
                  />
                </Avatar.Root>

                <Box textAlign={{ base: "center", md: "left" }}>
                  <Heading size="lg">
                    {userData?.first_name} {userData?.last_name}
                  </Heading>

                  <Text color="fg.muted">@{userData?.username}</Text>

                  <Text color="fg.muted">{userData?.email}</Text>
                </Box>
              </Flex>

              {/* Form */}
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "1fr 1fr",
                }}
                gap={5}
              >
                <Field.Root>
                  <Field.Label>First Name</Field.Label>

                  <Input {...register("first_name")} />
                  <Field.ErrorText>
                    {errors.first_name?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Last Name</Field.Label>

                  <Input {...register("last_name")} />
                  <Field.ErrorText>{errors.last_name?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Username</Field.Label>

                  <Input disabled />
                  <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Email</Field.Label>

                  <Input {...register("email")} />
                  <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Phone</Field.Label>

                  <Input
                    {...register("phone", {
                      valueAsNumber: true,
                    })}
                  />
                  <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Birth Date</Field.Label>

                  <Input type="date" {...register("birth_date")} />
                  <Field.ErrorText>
                    {errors.birth_date?.message}
                  </Field.ErrorText>
                </Field.Root>
              </Grid>

              {/* Button */}
              <Flex justify="flex-end">
                <Button
                  type="submit"
                  colorPalette="blue"
                  loading={isSubmitting ? true : false}
                >
                  Save Changes
                </Button>
              </Flex>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default ProfilePage;
