import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, FormControl, Input, Stack, Button, Text, Center } from 'native-base';
import { UserDetailContext } from '../context/UserContext';
import commonAPIService from '../axios-services/common-api-services';
import { ApiUrl } from '../api/BasicApi';
import { ScreenNavigationProp } from '../../types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface IUser {
    email: string;
    password: string;
};
function Login({ navigation }: { navigation: ScreenNavigationProp }) {
    const { setIsLoggedIn, setUserDetails } = useContext(UserDetailContext);
    const { control, handleSubmit, formState: { errors } } = useForm<IUser>();
    const onSubmit = (formData: IUser) => {
        loginUser({ email: formData?.email });
    }
    const loginUser = ({ email }: { email: string }) => {
        commonAPIService.post(ApiUrl.getUser, {
            email: email
        }).then(res => {
            let userData = {
                email: res?.data?.email,
                id: res?.data?.id
            }
            setUserDetails(userData);
            setIsLoggedIn(true);
            navigation.navigate("home");
        });
    }
    return (
        <Box flex={1} my={2} py={2}>
            <Center>
                <MaterialCommunityIcons name="sticker-emoji" color={"#3cdfee"} size={56} />
            </Center>
            <Box alignItems="center">
                <Box w="100%">
                    <FormControl isRequired isInvalid={errors.email ? true : false}>
                        <Stack mx="4">
                            <FormControl.Label>Email</FormControl.Label>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (

                                    <Input type="text" placeholder="email@something.com"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="email"
                            />
                            {errors.email && <Text color={"red.800"}>This is required</Text>}
                        </Stack>
                    </FormControl>

                    <FormControl isRequired isInvalid={errors.password ? true : false}>
                        <Stack mx="4">
                            <FormControl.Label>Password</FormControl.Label>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (

                                    <Input type="password" placeholder="password"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="password"
                            />
                            {errors.password && <Text color={"red.800"}>This is required</Text>}
                        </Stack>
                    </FormControl>
                </Box>
            </Box>
            <Box my={2} p={4}>
                <Button onPress={handleSubmit(onSubmit)} size={"md"}>
                    Login
                </Button>
            </Box>
        </Box>
    );
}
export default Login;