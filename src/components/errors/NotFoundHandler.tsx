import { useNavigate } from "react-router-dom"
import { 
    Flex, 
    Text, 
    Button, 
    Icon, 
    Container,
    useColorModeValue,
    Heading,
    VStack,
    Box
} from "@chakra-ui/react";
import { FaBoxOpen } from "react-icons/fa";

interface IProps {
    title: string;
    description: string;
}

const NotFoundHandler = ({title, description}: IProps) => {
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
                    <Box
                        bg={useColorModeValue("red.100", "red.700")}
                        p={4}
                        borderRadius="full"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                    <Icon as={FaBoxOpen} color="red.500" boxSize="70px" />
                    </Box>
                    <Heading size="xl" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
                        {title}
                    </Heading>
                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                        {description}
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

export default NotFoundHandler;