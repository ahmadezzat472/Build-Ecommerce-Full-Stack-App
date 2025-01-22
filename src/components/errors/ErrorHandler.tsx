import { useNavigate } from "react-router-dom"
import { 
    Box, 
    Flex, 
    Heading, 
    Text, 
    Button, 
    VStack, 
    Icon, 
    useColorModeValue 
} from "@chakra-ui/react";
import { FaServer } from "react-icons/fa";


interface IProps {
    statusCode?: number;
    title?: string
}

const ErrorHandler = ({statusCode = 500, title = "Server Error"}: IProps) => {
    const navigate = useNavigate();
    const goHome = () => navigate("/");
    const refreshPage = () => window.location.reload();
    
    return (
        <Flex
            align="center"
            justify="center"
            h="100vh"
            bg={useColorModeValue("gray.50", "gray.900")}
            p={6}
        >
            <VStack spacing={6} textAlign="center">
                {/* Error Icon */}
                <Box
                    bg={useColorModeValue("red.100", "red.700")}
                    p={4}
                    borderRadius="full"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Icon as={FaServer} color="red.500" boxSize="50px" />
                </Box>

                {/* Error Message */}
                <Heading size="xl" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
                    500 - Server Error
                </Heading>
                <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                    {title} Try to refresh this page or feel free to contact us if the problem persists.
                </Text>

                {/* Buttons */}
                <Flex gap={4}>
                    <Button colorScheme="blue" onClick={goHome}>
                        Home
                    </Button>
                    <Button colorScheme="teal" variant="solid" onClick={refreshPage}>
                        Refresh
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default ErrorHandler;