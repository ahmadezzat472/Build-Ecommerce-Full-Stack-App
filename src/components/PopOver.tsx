import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
    Button,
    Portal,
    Box,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

interface IProps {
    data: {
        data: []
    };
    isLoading: boolean;
    catId: string
}

const PopOver = ({data, isLoading, catId}: IProps) => {
    return (
        <Popover closeOnBlur={false} placement='left' >
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        <Button>Click to {isOpen ? 'close' : 'open'}</Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverHeader>the number of products</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Box>
                                    total of product: {data && data.data.length}
                                </Box>
                                <Button
                                    as={Link}
                                    to={'/dashboard/products'}
                                    state={{ data }} // Passing category ID through state
                                    mt={4}
                                    colorScheme='blue'
                                    onClick={onClose}
                                >
                                    go to related product
                                </Button>
                                <Button
                                    mt={4}
                                    colorScheme='blue'
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </PopoverBody>
                            {/* <PopoverFooter>This is the footer</PopoverFooter> */}
                        </PopoverContent>
                    </Portal>
                </>
            )}
        </Popover>
    )
}

export default PopOver