import ProductCard from "../components/ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import NotFoundHandler from "../components/errors/NotFoundHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import ProductsSkeleton from "../components/ProductsSkeleton";

interface IProps {
    products: IProduct[];
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
}

const ProductsPage = ({products, isLoading, isError, error, isFetching } : IProps) => {

    if (isLoading || isFetching) {
        return (
            <ProductsSkeleton />
        );
    }

    //* Handle errors
    if(!products.length || isError){
        return (
            <NotFoundHandler 
                title="NO Products Avaliable" 
                description={
                    error && "status" in error && "data" in error ? 
                    `${error.status} ${(error.data as { error: string }).error}` : 
                    "An unexpected error occurred."
                }
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
