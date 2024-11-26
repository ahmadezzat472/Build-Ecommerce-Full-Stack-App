import { createStandaloneToast } from "@chakra-ui/react"
import { ICartProducts } from "../app/features/cartSlice"

const {toast} = createStandaloneToast()

export const addItemToCart = (newItem: ICartProducts, cartItems: ICartProducts[]) => {
    // ** If a matching item is found, it returns the first matching object (the actual item from the cartItems array). ** If no match is found, it returns undefined. */
    const isExist = cartItems.find( (item) => item.id === newItem.id)

    // ** if new item is exist in cart items
    if(isExist){
        toast({
            title: 'Added to your Cart',
            description: "this item already exist, the quantity will be increased",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })

        // ** returns a new array: ** The array contains updated items where the quantity of the matching item is incremented, All other items remain unchanged..
        return cartItems.map( (item) => item.id === newItem.id ? {...item, quantity: item.quantity+1} : item )
    }

    toast({
        title: 'Added to your Cart',
        status: 'success',
        duration: 9000,
        isClosable: true,
    })
    return [...cartItems, {...newItem, quantity: 1}]    
}