import React from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverCloseButton,
    Button,
    Portal,
    Box,
} from '@chakra-ui/react'

const PopOver = () => {
    return (
        <Popover closeOnBlur={false} placement='left' >
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        <Button>Click to {isOpen ? 'close' : 'open'}</Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverHeader>This is the header</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Box>
                                    Hello. Nice to meet you! This is the body of the popover
                                </Box>
                                <Button
                                    mt={4}
                                    colorScheme='blue'
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </PopoverBody>
                            <PopoverFooter>This is the footer</PopoverFooter>
                        </PopoverContent>
                    </Portal>
                </>
            )}
        </Popover>
    )
}

export default PopOver