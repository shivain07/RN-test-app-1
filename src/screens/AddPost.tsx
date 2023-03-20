import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, FormControl, Input, Stack, Button, Text, Center, TextArea, ScrollView, Heading, HStack, Actionsheet, AspectRatio, Image, useToast } from 'native-base';
import commonAPIService from '../axios-services/common-api-services';
import { ApiUrl } from '../api/BasicApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
interface IPostDetails {
    title: string,
    content: string,
    authorName: string,
    authorDescription: string,
}
function AddPost() {
    const { register, formState: { errors }, handleSubmit, reset, control } = useForm<IPostDetails>();
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>("");
    const toast = useToast();

    const onSubmit = (data: IPostDetails) => {
        commonAPIService.post(ApiUrl.uploadPost, data).then((res) => {
            reset();
            toast.show({
                description: "Post submitted"
            })
            setSelectedPhoto("");
        }).catch((err) => {
            reset();
            toast.show({
                description: "Error occured try again"
            })
            setSelectedPhoto("");
        })
    }

    const showGallery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 1
        }, (res: ImagePickerResponse) => {
            if (res?.assets) {
                let file = res?.assets[0]?.uri;
                if (file) {
                    setSelectedPhoto(file);
                } else {
                    setSelectedPhoto(null);
                }
            } else {
                setSelectedPhoto(null);
            }
        })
    }
    return (
        <Box flex={1} my={2} py={2}>
            <Center>
                <MaterialCommunityIcons name="sticker-emoji" color={"#3cdfee"} size={56} />
                <Heading py={2}>
                    Add post
                </Heading>
            </Center>
            <ScrollView flex={1} p={2}>
                <Box alignItems="center">
                    <Box w="100%">
                        <FormControl isRequired isInvalid={errors.title ? true : false}>
                            <Stack mx="4">
                                <FormControl.Label>Title</FormControl.Label>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (

                                        <Input type="text" placeholder="Some title"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="title"
                                />
                                {errors?.title && <Text color={"red.800"}>This is required</Text>}
                            </Stack>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.content ? true : false}>
                            <Stack mx="4">
                                <FormControl.Label>Content</FormControl.Label>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextArea
                                            h={20}
                                            placeholder="Write something..."
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            autoCompleteType={false}
                                            borderColor={errors.content ? "red.800" : null}
                                        />
                                    )}
                                    name="content"
                                />
                                {errors?.content && <Text color={"red.800"}>This is required</Text>}
                            </Stack>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.authorName ? true : false}>
                            <Stack mx="4">
                                <FormControl.Label>Author </FormControl.Label>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (

                                        <Input type="text" placeholder="Some title"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="authorName"
                                />
                                {errors?.authorName && <Text color={"red.800"}>This is required</Text>}
                            </Stack>
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.authorDescription ? true : false}>
                            <Stack mx="4">
                                <FormControl.Label>Author description</FormControl.Label>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextArea
                                            h={20}
                                            placeholder="Write something..."
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            autoCompleteType={false}
                                            borderColor={errors.authorDescription ? "red.800" : null}
                                        />
                                    )}
                                    name="authorDescription"
                                />
                                {errors?.authorDescription && <Text color={"red.800"}>This is required</Text>}
                            </Stack>
                        </FormControl>
                    </Box>
                </Box>
                <Box my={2} p={4}>
                    {selectedPhoto ? <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{
                            uri: selectedPhoto
                        }} alt="image" />
                    </AspectRatio> : <Text>
                        Selected a cover photo
                    </Text>}
                </Box>
                <Box my={2} p={4}>
                    <Button onPress={showGallery} size={"sm"} variant={"ghost"} _text={{
                        color: "violet.400"
                    }}>
                        Upload
                    </Button>
                </Box>
                <Box my={2} p={4}>
                    <Button onPress={handleSubmit(onSubmit)} size={"md"} bg={"violet.400"}>
                        Add post
                    </Button>
                </Box>
            </ScrollView>
        </Box>
    );
}

export default AddPost;

