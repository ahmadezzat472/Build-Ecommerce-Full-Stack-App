import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    Stack,
    HStack,
    VStack,
} from '@chakra-ui/react'
import { FaCheck } from "react-icons/fa";

// Replace test data with your own
// eslint-disable-next-line prefer-spread
const features = Array.apply(null, Array(8)).map(function (x, i) {
    return {
        id: i,
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
    }
})

export default function GridListWithHeading() {
    return (
        <Box mt={30} mb={150}>
            <Stack spacing={4} as={Container} maxW={'7xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>This is the headline</Heading>
                <Text color={'gray.400'} fontSize={'xl'}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </Text>
            </Stack>

            <Container maxW={'7xl'} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
                    {features.map((feature) => (
                        <HStack key={feature.id} align={'top'}>
                            <Box color={'green.400'} px={2}>
                                <FaCheck />
                            </Box>
                            <VStack align={'start'}>
                                <Text fontWeight={600}>{feature.title}</Text>
                                <Text color={'gray.600'}>{feature.text}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}