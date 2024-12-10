import { Box, Text, Button, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    isLoading: boolean;
    onClickPrev: () => void;
    onClickNext: () => void;
}

const Paginator = ({
    currentPage,
    totalPages,
    onClickPrev,
    isLoading,
    pageSize,
    onClickNext,
}: IProps) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Text fontSize="sm" color="gray.600" mx={3}>
                Page <Text as="span" mx={1} fontWeight="semibold" >{currentPage}</Text> to
                <Text as="span" mx={1} fontWeight="semibold" >{totalPages}</Text> of
                <Text as="span" mx={1} fontWeight="semibold" >{pageSize}</Text> Records
            </Text>

        <Button
            bg="gray.800"
            color="white"
            borderRadius="md"
            borderRight="1px"
            borderColor="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
            h={10}
            fontSize="base"
            fontWeight="medium"
            mr={3}
            _hover={{ bg: "indigo.600", color: "white" }}
            _disabled={{ bg: "gray.400", cursor: "not-allowed", _hover: { bg: "gray.400" } }}
            disabled={currentPage <= 1 || isLoading}
            onClick={onClickPrev}
        >
            <Icon as={IoIosArrowBack} w={4} h={4} mr={2} />
            Previous
        </Button>

        <Button
            bg="gray.800"
            color="white"
            borderRadius="md"
            borderRight="1px"
            borderColor="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
            h={10}
            fontSize="base"
            fontWeight="medium"
            mr={3}
            _hover={{ bg: "indigo.600", color: "white" }}
            _disabled={{ bg: "gray.400", cursor: "not-allowed", _hover: { bg: "gray.400" } }}
            disabled={currentPage === totalPages || isLoading}
            onClick={onClickNext}
        >
            Next
            <Icon as={IoIosArrowForward} w={4} h={4} mr={2} />
        </Button>
    </Box>
    )
}

export default Paginator