import { Skeleton, Flex, } from "@chakra-ui/react"


const CategoryListSkelton = () => {
    return (
        <Flex
            justifyContent="center"
            mt={30}
            mb={50}
            alignItems={"center"}
            gap={7}
        >
            <Flex gap={3}>
                <Skeleton height="17px" width={"6px"} />
                <Skeleton height="17px" width={"25px"} />
                <Skeleton height="17px" width={"6px"} />
                <Skeleton height="17px" width={"25px"} />
                <Skeleton height="17px" width={"6px"} />
                <Skeleton height="17px" width={"45px"} />
            </Flex>
            <Skeleton h={"30px"} w={"80px"} startColor='blue.300' endColor='blue.600' />
            <Skeleton height="20px" width={"70px"} />
            <Skeleton height="20px" width={"70px"} />
            <Skeleton height="20px" width={"70px"} />
            <Skeleton height="20px" width={"70px"} />
            <Skeleton height="20px" width={"70px"} />
            <Skeleton h={"30px"} w={"80px"} startColor='blue.300' endColor='blue.600' />
            {/* <SkeletonText height="150px" noOfLines={1} /> */}
        </Flex>
    )
}

export default CategoryListSkelton