import { SimpleGrid } from "@chakra-ui/react"
import ProductCardSkelton from "./ProductCardSkelton"

const ProductsSkeleton = () => {
    return (
        <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={10}
            >
                {
                    Array.from({ length: 12 }, (_, idx) => (
                        <ProductCardSkelton key={idx} />
                    ))
                }
        </SimpleGrid>
    )
}

export default ProductsSkeleton