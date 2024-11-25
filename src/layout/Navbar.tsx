import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    HStack,
    IconButton,
} from '@chakra-ui/react'
import { ReactNode } from 'react';
import { IoSunny, IoMoonOutline  } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import cookieService from '../services/cookieService';
import { useSelector } from 'react-redux';
import { selectCart } from '../app/features/cartSlice';


interface Props {
    children: ReactNode
}

/* _________________ Cookies _________________ */
const token = cookieService.get("jwt");

const Links = ['Dashboard', 'products']

const NavLink = (props: Props) => {
    const { children } = props

    return (
        <Box
            as={Link}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            to={`/${children?.toString().toLowerCase()}`}
        >
            {children}
        </Box>
    )
}

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {cartItems} = useSelector(selectCart) // const {cartItems} = useSelector((state: RootState) => state.Cart) 
    

    const logoutHandler = () => {
        cookieService.remove("jwt")
        window.location.reload()
    }

    const addToCartHandler = () => {

    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                        textAlign={"center"}
                    />

                    <Link to={"/"}>Logo</Link>
                    <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (
                            <NavLink key={link}>{link}</NavLink>
                        ))}
                    </HStack>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} alignItems={"center"} spacing={5}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <IoMoonOutline /> : <IoSunny />}
                            </Button>
                            <Button onClick={addToCartHandler}>Cart({cartItems.length})</Button>
                            {
                                token ? (
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rounded={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            minW={0}>
                                            <Avatar
                                                size={'sm'}
                                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                                            />
                                        </MenuButton>
                                        <MenuList alignItems={'center'}>
                                            <br />
                                            <Center>
                                                <Avatar
                                                    size={'2xl'}
                                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                                                />
                                            </Center>
                                            <br />
                                            <Center>
                                                <p>Username</p>
                                            </Center>
                                            <br />
                                            <MenuDivider />
                                            <MenuItem>Your Servers</MenuItem>
                                            <MenuItem>Account Settings</MenuItem>
                                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                        </MenuList>
                                    </Menu>
                                ) : (
                                    <Button
                                        as={Link}
                                        to={"/login"}
                                        variant={'solid'}
                                        colorScheme={'teal'}
                                    >
                                        Login
                                    </Button>
                                )
                            }
                        </Stack>
                    </Flex>
                </Flex>
                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                        {Links.map((link) => (
                            <NavLink key={link}>{link}</NavLink>
                        ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}