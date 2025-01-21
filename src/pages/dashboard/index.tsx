import { Container, Grid, GridItem, Flex, Box, Text, Heading, Skeleton, useToast } from '@chakra-ui/react'
import { useGetCategoriesSliceQuery } from '../../app/services/CategorySlice';
import { useGetAllProductSliceQuery } from '../../app/services/productsSlice';
import { useEffect } from 'react';

const Dashboard = () => {
     /* ___________________ Toast ___________________ */
    const toast = useToast();

    /* ___________________ API Queries and Mutations ___________________ */
    const { isError: isErrorCat, error: errorCat, isLoading: isLoadingCat, data: catData } = useGetCategoriesSliceQuery({})
    const {isError: isErrorProduct, error: errorProduct, isLoading: isLoadingProduct, data: ProductData} = useGetAllProductSliceQuery({})

    /* ___________________ Side Effects ___________________ */
    useEffect( () => {
        //* Handle errors
        if (isErrorCat) {
            toast({
                title: "Failed to fetch categories",
                description: 
                    "status" in errorCat && "data" in errorCat ? 
                    `${errorCat.status} ${(errorCat.data as { error: string }).error}` : 
                    "An unexpected error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

        if (isErrorProduct) {
            toast({
                title: "Failed to fetch products",
                description: 
                    "status" in errorProduct && "data" in errorProduct ? 
                    `${errorProduct.status} ${(errorProduct.data as { error: string }).error}` : 
                    "An unexpected error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [isErrorCat, isErrorProduct])

    /* ___________________ Render ___________________ */                                                                                                                                                                                                            
    return (
        <Container py={5} maxW={'container.lg'}>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                }}
                gap={6}
            >
                <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
                    <Heading as={'h2'}>Statistics with title and description</Heading>
                </GridItem>
                <GridItem w="100%">
                    <Flex flexDirection={'column'}>
                        <Text fontSize={'4xl'} fontWeight={'bold'}>
                            {
                                isLoadingCat ? (
                                    <Flex gap={1}>
                                        <Skeleton height="30px" width={"15px"} />
                                        <Skeleton height="30px" width={"15px"} />
                                    </Flex>
                                ) : (
                                    catData && catData.categories.length
                                )
                            }
                        </Text>
                        <Box fontSize={'sm'}>
                            the number of all categories. People always pay attention to numbers.
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem w="100%">
                    <Flex flexDirection={'column'}>
                        <Text fontSize={'4xl'} fontWeight={'bold'}>
                            {
                                isLoadingProduct ? (
                                    <Flex gap={1}>
                                        <Skeleton height="30px" width={"15px"} />
                                        <Skeleton height="30px" width={"15px"} />
                                    </Flex>
                                ) : (
                                    ProductData && ProductData.products.length
                                )
                            }
                        </Text>
                        <Box fontSize={'sm'}>
                            the number of all products. People always pay attention to numbers.
                        </Box>
                    </Flex>
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Dashboard;