import { Stack } from "@chakra-ui/react"
import {
    Skeleton,
    SkeletonText,
} from "@/components/ui/skeleton"

const ProductCardSkelton = () => {
    return (
        <Stack gap="6" maxW="xs">
            <Skeleton height="150px" />
            <SkeletonText noOfLines={3} />
        </Stack>
    )
}

export default ProductCardSkelton