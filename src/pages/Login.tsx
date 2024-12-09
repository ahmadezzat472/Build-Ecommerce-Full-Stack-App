import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { BiSolidShow } from "react-icons/bi";
import { IoMdEyeOff } from "react-icons/io";
import { IError, userLogin } from '../app/features/loginSlice';
import { RootState, useAppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { IUser } from '../interfaces';

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const {isError, error, isLoading} =  useSelector( (state: RootState) => state.Login )
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>({
        email: "",
        password: ""
    })

    const Submithandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if(!user.email && !user.password){
            setIsEmail(true)
            setIsPassword(true)
            return
        }
        if(!user.email){
            setIsEmail(true)
            return
        }
        if(!user.password){
            setIsPassword(true)
            return
        }

        setIsEmail(false)
        setIsPassword(false)
        dispatch(userLogin(user))
    }

    const onChangehandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    as={"form"}
                    onSubmit={Submithandler}
                >
                    <Stack spacing={4}>
                        {isError && (
                            <Alert status="error">
                                <AlertIcon />
                                {(error as IError).response.data.error || "An error occurred while logging in."}
                            </Alert>
                        )}
                        <FormControl id="email" isInvalid={isEmail}>
                            <FormLabel>Email address</FormLabel>
                            <Input 
                                type="email" 
                                value={user.email}
                                onChange={onChangehandler}
                                name='email'
                            />
                            {isEmail ? (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                                ) : (
                                null
                            )}
                        </FormControl>
                        <FormControl id="password" isInvalid={isPassword}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={user.password}
                                    onChange={onChangehandler}
                                    name='password'
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <BiSolidShow size="5" /> : <IoMdEyeOff size={"25px"} />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {isPassword ? (
                                <FormErrorMessage>Password is required.</FormErrorMessage>
                                ) : (
                                null
                            )}
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'}>Forgot password?</Text>
                            </Stack>
                            <Button
                                type={"submit"}
                                bg={isEmail || isPassword ? "red.400" :'blue.400'}
                                color={'white'}
                                _hover={
                                    isEmail || isPassword ? {bg: 'red.500'} : {bg: 'blue.500'}
                                }
                                isLoading={isLoading}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}