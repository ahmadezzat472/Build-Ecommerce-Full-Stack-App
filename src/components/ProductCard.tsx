import { Card, Image, Text } from "@chakra-ui/react"
import { Button } from "./ui/button";
import { IProduct } from "../interfaces";

interface IProps {
    product: IProduct
}

const ProductCard = ( {product} : IProps) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL
    
    return (
        <Card.Root overflow="hidden">
            <Image
                src={`${serverUrl}${product.thumbnail.url}`}
                alt="Green double couch with wooden legs"
            />
            <Card.Body gap="2">
                <Card.Title>{product.title}</Card.Title>
                    <Card.Description>
                        {product.description}
                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2" fontSize={"sm"}>
                        ${product.price}
                    </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button 
                    variant="solid"
                >Buy now</Button>
                <Button variant="ghost">Add to cart</Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default ProductCard;