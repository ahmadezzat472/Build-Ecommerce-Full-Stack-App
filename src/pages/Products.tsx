import ProductCard from "../components/ProductCard";
import { Flex, Grid } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import ProductCardSkelton from "../components/ProductCardSkelton";



interface IProps {
    products: IProduct[];
    isLoading: boolean;
}

const ProductsPage = ({products, isLoading} : IProps) => {

    if (isLoading) {
        return (
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6">
                {
                    Array.from({ length: 20 }, (_, idx) => (
                        <ProductCardSkelton key={idx} />
                    ))
                }
            </Grid>
        );
    }

    // if(!products) return <>no data</>

    return (
        <> 
            <Flex
                wrap="wrap"
                justify="space-between"
                gap="8"
                >
                {
                    products.length ? (
                    products.map((product: IProduct) => (
                        <ProductCard product={product} key={product.id} />
                    ))
                    ) : (
                    <div>No Products</div>
                    )
                }
            </Flex>
            {/* <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap="8"
            >
                {
                    products.length ? (
                        products.map((product: IProduct) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    ) : (
                        <div>No Products</div>
                    )
                }
            </Grid> */}
        </>
    
    );
};

export default ProductsPage;
