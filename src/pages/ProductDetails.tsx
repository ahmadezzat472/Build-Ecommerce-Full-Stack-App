import { Badge, Box, Card, Flex, HStack, Image, Text, Button, Stack, Heading, CardBody, CardFooter } from "@chakra-ui/react"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useCustomQuery from "../hooks/useCustomQuery"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";


/* ___________________ Type & interface ___________________ */
type IParams = {
    productId: string;
};

const ProductDetailsPage = () => {
    /* ___________________ State ___________________ */
    const serverUrl = import.meta.env.VITE_SERVER_URL
    const {productId} =  useParams<IParams>()
    const location = useLocation();
    const navigate = useNavigate()
    const { documentId } = location.state || {};

    /* ___________________ Custom Query ___________________ */
    const { data, isPending} = useCustomQuery({
        /* ${queryKey} => when update on item occure => the id of item will change => 
         thus, queryKey Changes => then useCustomQuery is execute and this we need to get new updated data */
        queryKey: ["product", productId!], // Force TypeScript to treat `productId` as non-null
        url: `/products/${documentId}?populate=*&fields=title,description,price`, 
    }) 

    const dispatch = useDispatch()

    const goBack = () => navigate(-1)

    const addToCartHandler = () => {
        dispatch(addToCart(data))
    }

    /* ___________________ Render ___________________ */
    if(!isPending) console.log(data);

    if (!data) {
        return <p>No product details found.</p>;
    }
    
    return (
        <>  
            <Box maxW={"2xl"} mx={"auto"}>
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
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '250px' }}
                    src={`${serverUrl}${data.thumbnail.url}`}
                    alt={data.title}
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
            </Card>
        </>
    )
}

export default ProductDetailsPage