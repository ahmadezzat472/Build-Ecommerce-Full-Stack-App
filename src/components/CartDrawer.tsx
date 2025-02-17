import {
    Drawer,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    DrawerBody,
    Text,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isOpenCartDrawerAction, selectGlobal } from '../app/features/globalSlice'
import CartDrawerItem from './CartDrawerItem'
import { clearCart, ICartProducts, selectCart } from '../app/features/cartSlice'

const CartDrawer = () => {
    const btnRef = useRef<HTMLButtonElement | null>(null)
    const {isOpenCartDrawer} = useSelector(selectGlobal)
    const {cartItems} = useSelector(selectCart)
    const dispatch = useDispatch()

    const onClose = () => dispatch(isOpenCartDrawerAction())
    const RemoveAllItemHandler = () => dispatch(clearCart())

    return (
        <Drawer
            isOpen={isOpenCartDrawer}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
            
        >
            <DrawerOverlay 
                backdropFilter='auto'
                backdropBlur='2px'
            />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>Cart Items</DrawerHeader>

                <DrawerBody>
                    {
                        cartItems.length ? (
                            cartItems.map( (item: ICartProducts) => 
                                <CartDrawerItem key={item.id} item={item} />
                            )
                        ) : (
                            <Text>No Cart Items</Text>
                        )
                    }
                </DrawerBody>

                <DrawerFooter>
                    <Button 
                        colorScheme='red' 
                        variant='outline' 
                        onClick={RemoveAllItemHandler}
                    >
                        Clear All
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CartDrawer;