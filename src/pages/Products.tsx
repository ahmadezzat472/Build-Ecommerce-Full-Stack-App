import ProductCard from "../components/ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import ProductCardSkelton from "../components/ProductCardSkelton";
import NotFoundHandler from "../components/errors/NotFoundHandler";

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

    if(!products.length){
        return (
            <NotFoundHandler 
                title="NO Product Avaliable" 
                description="The product you're looking for isn't available. It might have been removed or never existed" 
            />
        )
    } 

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            justifyItems="center"
        >
            {
                products.length ? (
                products.map((product: IProduct) => (
                    <ProductCard key={product.id} product={product} />
                ))
                ) : (
                <div>No Products</div>
                )
            }
        </SimpleGrid>
    );
};

export default ProductsPage;
