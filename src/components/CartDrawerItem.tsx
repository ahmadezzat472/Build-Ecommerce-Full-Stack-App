import { Badge, Box, Button, Card, Heading, HStack, Image, Text } from '@chakra-ui/react'
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

    return (
        <Card 
            direction={'row'}
            overflow='hidden'
            variant='outline' 
            mt={"10px"}
            _hover={{ boxShadow: "md", transform: "translateY(-2px)", transition: "all 0.2s" }}

        >
            <Box w={"35%"} minW={"35%"}>
                <Image 
                    w={"100%"} 
                    h={"100%"} 
                    src={defaultImage && defaultImage.url} 
                />
            </Box>
            <HStack flexGrow={"2"} flexDirection={"column"} padding={"8px"} gap={3} alignItems={"start"} >
                    <Heading fontSize='16px'>{name}</Heading>
                    <HStack w={"100%"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
                        <Text fontWeight={"bold"} fontSize={"xs"} color="gray.400">
                            Quantity: {avaliableItems} 
                        </Text>
                        <Badge fontSize={"xs"}  colorScheme='green' rounded={"md"}>${price}</Badge>
                    </HStack>
                    <Button 
                        mt={2}
                        w={"full"}
                        variant='solid' 
                        colorScheme='red' 
                        fontSize={"sm"} 
                        py={"4px"} 
                        h={"fit-content"}
                        onClick={() => removeItemHandler(id)}
                    >
                        Remove
                    </Button>
            </HStack>
        </Card>
    )
}

export default CartDrawerItem;