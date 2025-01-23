import { Badge, Button, Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { ICartProducts, removeFromCart } from '../app/features/cartSlice'
import { useDispatch } from 'react-redux'

interface IProps {
    item: ICartProducts
}

const CartDrawerItem = ({item}: IProps) => {
    const {id, name, price, defaultImage,avaliableItems} = item
    /* ___________________ State ___________________ */
    const dispatch = useDispatch()

    const removeItemHandler = (id: number) => {
        dispatch(removeFromCart(id))
    }
    console.log(item);
    

    if (!item) return <p> is loading</p>

    return (
        <Card 
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline' 
            mt={"10px"}
        >
            <Image w={"40%"} h={"80px"} src={defaultImage && defaultImage.url} />
            <HStack flexGrow={"2"} >
                <CardBody padding={"8px"} flexGrow={"2"}>
                    <Heading size='xs'>{name}</Heading>
                    <HStack mt={"8px"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
                        <Text fontWeight={"bold"} fontSize={"xs"}>
                            Quantity: {avaliableItems} 
                        </Text>
                        <Badge fontSize={"xs"}>${price}</Badge>
                    </HStack>
                    <Button 
                        variant='solid' 
                        colorScheme='red' 
                        fontSize={"sm"} 
                        padding={"2px"} 
                        h={"fit-content"}
                        onClick={() => removeItemHandler(id)}
                    >
                        Remove
                    </Button>
                </CardBody>
            </HStack>
        </Card>
    )
}

export default CartDrawerItem;