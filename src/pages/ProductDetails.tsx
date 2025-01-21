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
    Badge
} from "@chakra-ui/react"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";
import { useGetOneProductSliceQuery } from "../app/services/productsSlice";
import { MdLocalShipping } from "react-icons/md";


/* ___________________ Type & interface ___________________ */
type IParams = {
    productId: string;
};

const ProductDetailsPage = () => {
    /* ___________________ State ___________________ */
    const serverUrl = import.meta.env.VITE_SERVER_URL
    const {productId} =  useParams<IParams>()
    const navigate = useNavigate()

    /* ___________________ Custom Query ___________________ */ 
    const { isError, isLoading, data } = useGetOneProductSliceQuery(productId)

    const dispatch = useDispatch()

    const goBack = () => navigate(-1)

    const addToCartHandler = () => {
        dispatch(addToCart(data))
    }

    /* ___________________ Render ___________________ */
    if(!isLoading) console.log(data);

    if (!data) {
        return <p>No product details found.</p>;
    }
    
    return (
        <>  
            <Container maxW={'7xl'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 24 }}
                >
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={data.product.defaultImage.url}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
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
                                color={'gray.800'}
                                fontWeight={300}
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
                            <Text
                                color={'gray.500'}
                                fontSize={'2xl'}
                                fontWeight={'300'}
                            >
                                {data.product.description}
                            </Text> 
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
                                Category
                            </Text>
                            <Badge>{data.product.category.name}</Badge>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                <List spacing={2}>
                                <ListItem>Chronograph</ListItem>
                                <ListItem>Master Chronometer Certified</ListItem>{' '}
                                <ListItem>Tachymeter</ListItem>
                                </List>
                                <List spacing={2}>
                                <ListItem>Anti‑magnetic</ListItem>
                                <ListItem>Chronometer</ListItem>
                                <ListItem>Small seconds</ListItem>
                                </List>
                            </SimpleGrid>
                            </Box>
                            <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={'green.500'}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Product Details
                            </Text>

                            <List spacing={2}>
                                <ListItem>
                                <Text as={'span'} fontWeight={'bold'}>
                                    Between lugs:
                                </Text>{' '}
                                20 mm
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
                                    Crystal:
                                </Text>{' '}
                                Domed, scratch‑resistant sapphire crystal with anti‑reflective treatment
                                inside
                                </ListItem>
                                <ListItem>
                                <Text as={'span'} fontWeight={'bold'}>
                                    Water resistance:
                                </Text>{' '}
                                5 bar (50 metres / 167 feet){' '}
                                </ListItem>
                            </List>
                            </Box>
                        </Stack>

                        <Button
                            rounded={'none'}
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









            {/* <Box maxW={"2xl"} mx={"auto"}>
                <Flex
                    width={"fit-content"}
                    alignItems={"center"}
                    my={"8px"}
                    gap={"5px"}
                    onClick={goBack}
                    cursor={"pointer"}
                >
                    <FaArrowLeftLong />
                    <Text>Back</Text>
                </Flex>
            </Box>

            <Card
                maxW={"2xl"}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                mx={"auto"}
                mb={100}
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '250px' }}
                    // src={`${serverUrl}${data.thumbnail.url}`}
                    src={`../../public/thumbnail_images_360fdccef6.jpg`}
                    alt={data.product.name}
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>
                            {data.price}
                        </Heading>

                        <Text py='2'>
                            {data.description}
                        </Text>
                        <HStack mt="3" justifyContent={"space-between"} alignItems={"center"}>
                            <Text 
                                fontSize={"xl"}
                                fontWeight={"bold"}
                            >
                                ${data.price}
                            </Text>
                            <Badge>{data.category.title}</Badge>
                        </HStack>
                    </CardBody>
                    <CardFooter paddingBottom={"12px"}>
                        <Button 
                            variant='solid' 
                            colorScheme='blue' 
                            width={"full"} 
                            textTransform={"capitalize"}
                            onClick={addToCartHandler}
                        >
                            add to cart
                        </Button>
                    </CardFooter>
                </Stack>
            </Card> */}
        </>
    )
}

export default ProductDetailsPage