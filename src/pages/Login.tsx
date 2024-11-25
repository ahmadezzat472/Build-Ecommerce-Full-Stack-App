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
} from '@chakra-ui/react'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { BiSolidShow } from "react-icons/bi";
import { IoMdEyeOff } from "react-icons/io";
import { userLogin } from '../app/features/loginSlice';
import { RootState, useAppDispatch } from '../app/store';
import { useSelector } from 'react-redux';

interface IUser {
    identifier: string;
    password: string;
}

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const {data, error, loading} =  useSelector( (state: RootState) => state.Login )
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>({
        identifier: "",
        password: ""
    })

    const Submithandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if(!user.identifier && !user.password){
            setIsEmail(true)
            setIsPassword(true)
            return
        }
        if(!user.identifier){
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
                        <FormControl id="email" isInvalid={isEmail}>
                            <FormLabel>Email address</FormLabel>
                            <Input 
                                type="email" 
                                value={user.identifier}
                                onChange={onChangehandler}
                                name='identifier'
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
                                isLoading={loading}
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