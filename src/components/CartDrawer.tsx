import {
    Drawer,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    DrawerBody,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isOpenCartDrawerAction, selectGlobal } from '../app/features/globalSlice'

const CartDrawer = () => {
    const btnRef = useRef<HTMLButtonElement | null>(null)
    const {isOpenCartDrawer} = useSelector(selectGlobal)
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