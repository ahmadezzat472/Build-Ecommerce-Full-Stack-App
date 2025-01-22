import { 
    Box,
    Container,
    Stack,
    VStack,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    Flex, 
    Image, 
    Text, 
    Heading, 
    Button,
    Badge,
    Avatar,
} from "@chakra-ui/react"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/features/cartSlice";
import { useGetOneProductSliceQuery } from "../app/services/productsSlice";
import { MdLocalShipping } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductDetailSkelton from "../components/ProductDetailSkelton";
import ErrorHandler from "../components/errors/ErrorHandler";
import { selectNetwork } from "../app/features/networkSlice";
import NotFoundHandler from "../components/errors/NotFoundHandler";


/* ___________________ Type & interface ___________________ */
type IParams = {
    productId: string;
};

const ProductDetailsPage = () => {
    /* ___________________ State ___________________ */
    const {productId} =  useParams<IParams>()
    const navigate = useNavigate()

    /* ___________________ API Queries and Mutations ___________________ */
    //** Fetch Product
    const { isError, error, isLoading, data } = useGetOneProductSliceQuery(productId)

    //** To Dispatch Action addToCart
    const dispatch = useDispatch()

    //** Online/offline state
    const { isOnline } = useSelector(selectNetwork)

    /* ___________________ Handler ___________________ */
    const goBack = () => navigate(-1)

    const addToCartHandler = () => {
        dispatch(addToCart(data))
    }

    /* ___________________ Render ___________________ */
    if(isLoading || !isOnline){
        return <ProductDetailSkelton />
    }

    // if (isError) {
    //     const errorMessage = "data" in error 
    //         ? `${(error.data as { error: string }).error}` || "An unexpected error occurred." 
    //         : "An error occurred while fetching product details.";
    //     const errorStatus = "status" in error ? error.status as number : undefined
            
    //     return (
    //         <ErrorHandler statusCode={errorStatus} title={errorMessage} />
    //     );
    // }

    if (!data) {
        return (
            <NotFoundHandler 
                title="No Product Details Found" 
                description="The product you're looking for isn't available. It might have been removed or never existed" 
            />
        )
    }
    
    return (
        <Container maxW={'7xl'}>
            <Box mt={10}>
                <Flex
                    width={"fit-content"}
                    alignItems={"center"}
                    gap={"5px"}
                    onClick={goBack}
                    cursor={"pointer"}
                >
                    <FaArrowLeftLong />
                    <Text>Back</Text>
                </Flex>
            </Box>
            
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                pb={{ base: 18, md: 24 }}
                pt={{ base: 6, md: 10 }}
            >
                <Flex direction={"column"} gap={5}>
                    <Image
                        rounded={'md'}
                        alt={'product image'}
                        src={data.product.defaultImage.url}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                    <Flex justifyContent={"space-between"}>
                        {
                            data.product.images && (
                                data.product.images.map( (img) => 
                                    <Image
                                        key={img._id}
                                        rounded={'md'}
                                        alt={data.product}
                                        src={img.url}
                                        fit={'cover'}
                                        align={'center'}
                                        w={'49%'}                                            
                                    />
                                )
                            )
                        }
                    </Flex>
                    
                </Flex>

                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                        >
                            {data.product.name}
                        </Heading>
                        <Text
                            fontWeight={400}
                            fontSize={'2xl'}
                        >
                            ${data.product.price} USD
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={ <StackDivider borderColor={'gray.200'} />}
                    >
                        <VStack spacing={{ base: 4, sm: 6 }}> 
                            <Text fontSize={'lg'}>
                                {data.product.description}
                            </Text>
                        </VStack>

                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={'green.500'}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}
                            >
                                Product Details
                            </Text>

                            <List spacing={2}>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Avaliable Items:
                                    </Text>{' '}
                                    {data.product.avaliableItems}
                                </ListItem>

                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Bracelet:
                                    </Text>{' '}
                                    leather strap
                                </ListItem>

                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Case:
                                    </Text>{' '}
                                    Steel
                                </ListItem>

                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Case diameter:
                                    </Text>{' '}
                                    42 mm
                                </ListItem>

                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Dial color:
                                    </Text>{' '}
                                    Black
                                </ListItem>

                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Category:
                                    </Text>{' '}
                                </ListItem>

                                <ListItem>
                                    <Badge>{data.product.category.name}</Badge>
                                </ListItem>

                                <ListItem> 
                                    <Avatar
                                        size={'sm'}
                                        src={data.product.category.image.url}
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>

                    <Button
                        onClick={addToCartHandler}
                        rounded={'md'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        bg={useColorModeValue('gray.900', 'gray.50')}
                        color={useColorModeValue('white', 'gray.900')}
                        textTransform={'uppercase'}
                        _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                        }}>
                        Add to cart
                    </Button>

                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                        <MdLocalShipping />
                        <Text>2-3 business days delivery</Text>
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    )
}

export default ProductDetailsPage