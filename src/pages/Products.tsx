import ProductCard from "../components/ProductCard";
import { Grid } from "@chakra-ui/react";
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
            <Grid
                margin={"30px"}
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap="6"
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
            </Grid>
        </>
    
    );
};

export default ProductsPage;
