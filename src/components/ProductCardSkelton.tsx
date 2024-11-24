import { Stack, Skeleton, SkeletonText, } from "@chakra-ui/react"


const ProductCardSkelton = () => {
    return (
        <Stack gap="6" maxW="xs">
            <Skeleton height="150px" />
            <SkeletonText noOfLines={3} />
        </Stack>
    )
}

export default ProductCardSkelton