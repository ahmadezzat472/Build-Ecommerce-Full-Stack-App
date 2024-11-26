import { Badge, Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { ICartProducts } from '../app/features/cartSlice'

interface IProps {
    item: ICartProducts
}

const CartDrawerItem = ({item}: IProps) => {
    // const  = item
    const {title, price, quantity, thumbnail} = item
    /* ___________________ State ___________________ */
    const serverUrl = import.meta.env.VITE_SERVER_URL

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
                    {/* <Text 
                        fontWeight={"bold"} fontSize={"xs"}
                    >
                        data.price
                    </Text> */}
                </CardBody>
            </HStack>
        </Card>
    )
}

export default CartDrawerItem