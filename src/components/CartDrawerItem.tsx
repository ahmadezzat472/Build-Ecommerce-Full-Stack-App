import { Badge, Button, Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { ICartProducts, removeFromCart } from '../app/features/cartSlice'
import { useDispatch } from 'react-redux'

interface IProps {
    item: ICartProducts
}

const CartDrawerItem = ({item}: IProps) => {
    const {id, title, price, quantity, thumbnail} = item
    /* ___________________ State ___________________ */
    const dispatch = useDispatch()
    const serverUrl = import.meta.env.VITE_SERVER_URL

    const removeItemhandler = (id: number) => {
        dispatch(removeFromCart(id))
    }

    return (
        <Card 
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline' 
            mt={"10px"}
        >
            <Image w={"40%"} h={"80px"} src={`${serverUrl}${thumbnail.url}`} />
            <HStack flexGrow={"2"} >
                <CardBody padding={"8px"} flexGrow={"2"}>
                    <Heading size='xs'>{title}</Heading>
                    <HStack mt={"8px"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
                        <Text fontWeight={"bold"} fontSize={"xs"}>
                            Quantity: {quantity} 
                        </Text>
                        <Badge fontSize={"xs"}>${price}</Badge>
                    </HStack>
                    <Button 
                        variant='solid' 
                        colorScheme='red' 
                        fontSize={"sm"} 
                        padding={"2px"} 
                        h={"fit-content"}
                        onClick={() => removeItemhandler(id)}
                    >
                        Add to cart
                    </Button>
                </CardBody>
            </HStack>
        </Card>
    )
}

export default CartDrawerItem