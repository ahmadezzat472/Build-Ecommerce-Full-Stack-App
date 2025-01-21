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
    Skeleton,
} from '@chakra-ui/react'
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    data: {
        data: []
    };
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
}

const PopOver = ({data, isLoading, error}: IProps) => {
    const initRef = useRef<HTMLButtonElement>(null)
    return (
        <Popover 
            closeOnBlur={false}
            placement='left' 
            initialFocusRef={initRef}
        >
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
                                    {isLoading ? (
                                            <Skeleton height="17px" width={"150px"} />
                                        ) : (
                                            <>total of product: {error ? 0 : data && data.data.length }</>
                                        )
                                    }
                                </Box>
                                <Button
                                    as={Link}
                                    to={'/dashboard/products'}
                                    state={{ data }} // Passing category ID through state
                                    mt={4}
                                    mr={4}
                                    colorScheme='blue'
                                    onClick={onClose}
                                >
                                    go to related product
                                </Button>
                                <Button
                                    mt={4}
                                    colorScheme='red'
                                    onClick={onClose}
                                    ref={initRef}
                                >
                                    Close
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </>
            )}
        </Popover>
    )
}

export default PopOver