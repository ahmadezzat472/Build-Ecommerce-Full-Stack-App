import ProductCard from "../components/ProductCard";
// import useCustomQuery from "../hooks/useCustomQuery";
import { Grid } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import ProductCardSkelton from "../components/ProductCardSkelton";
// import { useGetProductSliceQuery, useLazyGetProductsByCategoryQuery } from "../app/services/productsSlice";
import { useEffect } from "react";

interface IProps {
    categoryId: number;
}

const ProductsPage = ({categoryId} : IProps) => {
    // const { data, isLoading, isError, error } = useGetProductSliceQuery({});
    // const [fetchProducts, { data, isLoading, isError}] = useLazyGetProductsByCategoryQuery();

    useEffect( () => {
        fetchProducts(0)
    }, [])

    useEffect( () => {
        fetchProducts(categoryId)
    },[categoryId])

    if (isLoading) {
        return (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6">
            {Array.from({ length: 20 }, (_, idx) => (
            <ProductCardSkelton key={idx} />
            ))}
        </Grid>
        );
    }

    if (isError) {
        return <p>{error.data?.error?.message}</p>;
    }

    if(!data) return <>no data</>

    return (
        <> 
        <Grid
        margin={"30px"}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap="6"
        >
        {data.data.length ? (
            data.data.map((product: IProduct) => (
            <ProductCard product={product} key={product.id} />
            ))
        ) : (
            <div>no products</div>
        )}
        </Grid>
        </>
    
    );
};

export default ProductsPage;
