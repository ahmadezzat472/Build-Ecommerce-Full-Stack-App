import { Skeleton, Flex, Stack, SkeletonText, Container, SimpleGrid, Box, VStack, List, ListItem } from "@chakra-ui/react"

const ProductDetailSkelton = () => {
    return (
        <Container maxW={'7xl'}>
            <Box mt={10}>
                <SkeletonText noOfLines={1} w={"6%"} />
            </Box>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                pb={{ base: 18, md: 24 }}
                pt={{ base: 6, md: 10 }}
            >
                <Flex direction={"column"} gap={5}>
                    <Skeleton
                        rounded={'md'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />

                    <Flex justifyContent={"space-between"}>
                        <Skeleton  
                            rounded={'md'}                                  
                            w={'49%'} 
                            height="150px"
                        />
                        <Skeleton
                            rounded={'md'}                                    
                            w={'49%'} 
                            height="150px"
                        />
                    </Flex>
                </Flex>

                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Skeleton  w={'50%'} height="18px" mb={3} />
                        <SkeletonText noOfLines={1} w={"30%"} />
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={ <Skeleton  w={'100%'} height="3px" mt={10} mb={6}/>}
                    >
                        <VStack spacing={{ base: 4, sm: 6 }}> 
                            <SkeletonText noOfLines={3} w={"90%"}  />
                        </VStack>

                        <Box>
                            <Skeleton  w={'40%'} height="12px" mb={8} />
                            <List spacing={5}>
                                <ListItem>
                                    <SkeletonText noOfLines={1} w={"55%"} />
                                </ListItem>
                                <ListItem>
                                    <SkeletonText noOfLines={1} w={"40%"} />
                                </ListItem>
                                <ListItem>
                                    <SkeletonText noOfLines={1} w={"60%"} />
                                </ListItem>
                                <ListItem>
                                    <SkeletonText noOfLines={1} w={"50%"} />
                                </ListItem>
                                <ListItem>
                                    <SkeletonText noOfLines={1} w={"15%"} />
                                </ListItem>
                                <ListItem>
                                    <SkeletonText noOfLines={1} w={"18%"} />
                                </ListItem>
                                <ListItem>
                                    <Skeleton  w={'50px'} height="50px" rounded={"full"} />
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>

                    <Skeleton h={"40px"} w={'full'} rounded={'md'} startColor='gray.900' endColor='gray.50' />
                    <VStack spacing={{ base: 4, sm: 6 }}> 
                        <SkeletonText noOfLines={1} w={"50%"} textAlign={"center"} />
                    </VStack>
                </Stack> 
            </SimpleGrid>
        </Container>
    )
}

export default ProductDetailSkelton;