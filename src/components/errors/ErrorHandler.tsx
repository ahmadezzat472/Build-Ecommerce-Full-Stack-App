import { useNavigate } from "react-router-dom"
import { 
    Box, 
    Flex, 
    Heading, 
    Text, 
    Button, 
    VStack, 
    Icon, 
    useColorModeValue, 
    Container
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
    const goBack = () => navigate(-1)
    
    return (
        <Container maxW={'7xl'}>
            <Flex
                align="center"
                justify="center"
                h="90vh"
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
                        <Icon as={FaServer} color="red.500" boxSize="70px" />
                    </Box>

                    {/* Error Message */}
                    <Heading size="xl" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
                        {`${statusCode} ${title}`}
                    </Heading>
                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                        Try to refresh this page or feel free to contact us if the problem persists.
                    </Text>

                    {/* Buttons */}
                    <Flex gap={4}>
                        <Button colorScheme="blue" onClick={goHome}>
                            Home
                        </Button>
                        <Button colorScheme="green" onClick={goBack}>
                            Go Back
                        </Button>
                        <Button colorScheme="teal" variant="solid" onClick={refreshPage}>
                            Refresh
                        </Button>
                    </Flex>
                </VStack>
            </Flex>
        </Container>
    )
}

export default ErrorHandler;