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
    Alert,
    AlertIcon
} from "@chakra-ui/react"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";
import { useGetOneProductSliceQuery } from "../app/services/productsSlice";
import { MdLocalShipping } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductDetailSkelton from "../components/ProductDetailSkelton";


/* ___________________ Type & interface ___________________ */
type IParams = {
    productId: string;
};

const ProductDetailsPage = () => {
    /* ___________________ State ___________________ */
    const {productId} =  useParams<IParams>()
    const navigate = useNavigate()

    /* ___________________ Custom Query ___________________ */ 
    const { isError, error, isLoading, data } = useGetOneProductSliceQuery(productId)

    const dispatch = useDispatch()

    const goBack = () => navigate(-1)

    const addToCartHandler = () => {
        dispatch(addToCart(data))
    }

    /* ___________________ Render ___________________ */
    if(isLoading){
        return <ProductDetailSkelton />
    }

    if (isError) {
        const errorMessage =
            "status" in error && "data" in error 
                ? `${error.status} ${(error.data as { error: string }).error} || An unexpected error occurred.` 
                : "An error occurred while fetching product details.";
                
        return (
            <Container maxW={'7xl'}>
                <Flex 
                    align="center" 
                    justify="center" 
                    h="100vh" 
                    direction="column" 
                >
                <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="auto"
                    maxW="lg"
                    borderRadius="md"
                    boxShadow="lg"
                >
                    <AlertIcon boxSize="40px" mr={0} />
                    <Heading as="h2" size="lg" mt={4} mb={2}>
                        Oops! Something Went Wrong
                    </Heading>
                    <Text fontSize="md" color="gray.400">
                        {errorMessage}
                    </Text>
                    <Button
                        mt={6}
                        size="lg"
                        onClick={goBack}
                        colorScheme="red"
                        variant="solid"
                        leftIcon={<FaArrowLeftLong />}
                    >
                        Go Back
                    </Button>
                    </Alert>
                </Flex>
            </Container>
        );
    }

    if (!data) {
        return <p>No product details found.</p>;
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