import { IProduct } from "../interfaces";
import { Link } from "react-router-dom";
import {
    Box,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    Image,
    Flex,
    Tooltip,
    Icon,
    chakra,
    Badge,
    Button
} from '@chakra-ui/react'
import { FiShoppingCart } from "react-icons/fi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";

interface IProps {
    product: IProduct
}

interface IRating {
    rating: number
    numReviews: number
}

const Rating = ({ rating, numReviews }: IRating) => {
    return (
        <Box display="flex" alignItems="center">
            {
                Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                key={i}
                                style={{ marginLeft: '1' }}
                                color={i < rating ? 'teal.500' : 'gray.300'}
                            />
                        )
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{ marginLeft: '1' }} />
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} />
                })
            }

            <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {numReviews} review{numReviews > 1 && 's'}
            </Box>
        </Box>
    )
}

const ProductCard = ( {product} : IProps) => {
    //** To Dispatch Action addToCart
    const dispatch = useDispatch()
    
    const addToCartHandler = () => {
        dispatch(addToCart(product))
    }
    
    return (
        <Box
            maxW={'450px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
        >
            <Box h={'240px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                <Image
                    src={product.defaultImage.url}
                    fit={"fill"}
                    alt={product.name}
                    height={"100%"}
                    width={"100%"}
                />
            </Box>

            <Stack>
                <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}
                >
                    {product.category.name}
                </Text>
                <Heading
                    color={useColorModeValue('gray.700', 'white')}
                    fontSize={'2xl'}
                    fontFamily={'body'}
                >
                    {product.name}
                </Heading>
                <Text color={'gray.500'}>
                    {product.description}
                </Text>
            </Stack>

            <Box mt={6}>
                <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <Box
                        fontSize="1xl"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                        mb={2}
                    >
                        Stock:{" "}
                        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme={product.avaliableItems <= 10 ? "red" : "green"}>
                            {product.avaliableItems}
                        </Badge>
                    </Box>
                    <Tooltip
                        label="Add to cart"
                        bg="gray.200"
                        placement={'top'}
                        color={'black'}
                        fontSize={'14px'}
                    >
                        <chakra.a onClick={addToCartHandler} cursor={"pointer"} display={'flex'}>
                            <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                        </chakra.a>
                    </Tooltip>
                </Flex>

                <Flex justifyContent="space-between" alignContent="center">
                    <Rating rating={4.2} numReviews={34} />
                    <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                        <Box as="span" color={'gray.600'} fontSize="lg">
                            £
                        </Box>
                        {product.price.toFixed(2)}
                    </Box>
                </Flex>
            </Box>

            <Button 
                variant='solid' 
                colorScheme='blue'
                as={Link}
                to={`/products/${product.id}`}
                w={"full"}
                mt={6}
            >
                View Details
            </Button>
        </Box>
    )
}

export default ProductCard;