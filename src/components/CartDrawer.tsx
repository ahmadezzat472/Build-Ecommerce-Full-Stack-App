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
import { ICartProducts, selectCart } from '../app/features/cartSlice'

const CartDrawer = () => {
    const btnRef = useRef<HTMLButtonElement | null>(null)
    const {isOpenCartDrawer} = useSelector(selectGlobal)
    const {cartItems} = useSelector(selectCart)
    const dispatch = useDispatch()

    const onClose = () => dispatch(isOpenCartDrawerAction())
    return (
        <Drawer
            isOpen={isOpenCartDrawer}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
        <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>Cart Items</DrawerHeader>

                <DrawerBody>
                    {
                        cartItems.length ? (
                            cartItems.map( (item: ICartProducts) => <CartDrawerItem key={item.id} item={item} />)
                        ) : (
                            <Text>No Cart tems</Text>
                        )
                    }
                </DrawerBody>

                <DrawerFooter>
                    <Button colorScheme='red' variant='outline' onClick={onClose}>
                        Clear All
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CartDrawer;