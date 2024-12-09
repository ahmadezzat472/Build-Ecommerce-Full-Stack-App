import { Card, Image, Text, Button, CardBody, Stack, Heading, CardFooter, ButtonGroup } from "@chakra-ui/react"
import { IProduct } from "../interfaces";
import { Link } from "react-router-dom";

interface IProps {
    product: IProduct
}

const ProductCard = ( {product} : IProps) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL
    console.log(product.documentId);
    
    return (
        <Card maxW='sm' variant={"filled"}>
            <CardBody>
                <Image
                    // src={`${serverUrl}${product.thumbnail.url}`}
                    src="../../public/thumbnail_images_360fdccef6.jpg"
                    alt={product.title}
                    borderRadius='lg'
                    width={"full"}
                    maxH={"200px"}
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>
                        {product.title}
                    </Heading>
                    <Text>
                        {product.description}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        ${product.price}
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button 
                        variant='solid' 
                        colorScheme='blue'
                        as={Link}
                        to={`/products/${product.id}`}
                        state={{documentId: product.documentId}}
                    >
                        View Details
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default ProductCard;