import ProductCard from "../components/ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import ProductCardSkelton from "../components/ProductCardSkelton";

interface IProps {
    products: IProduct[];
    isLoading: boolean;
}

const ProductsPage = ({products, isLoading} : IProps) => {

    if (isLoading) {
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
        );
    }

    // if(!products) return <>no data</>

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            justifyItems="center"
        >
            {
                products.length ? (
                products.map((product: IProduct) => (
                
                    <ProductCard product={product} />
                ))
                ) : (
                <div>No Products</div>
                )
            }
        </SimpleGrid>
    );
};

export default ProductsPage;
