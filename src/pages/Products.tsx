import ProductCard from "@/components/ProductCard";
import useCustomQuery from "../hooks/useCustomQuery";
import { Grid } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import ProductCardSkelton from "@/components/ProductCardSkelton";

const ProductsPage = () => {

    const { data, isPending } = useCustomQuery({
        /* ${queryKey} => when update on item occure => the id of item will change => 
         thus, queryKey Changes => then useCustomQuery is execute and this we need to get new updated data */
        queryKey: ['product'], 
        url: "/products?populate=*", 
    }) 

    if(isPending) 
        return (
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6">
                {
                    Array.from({length: 20}, (_, idx) => 
                        <ProductCardSkelton key={idx} />
                    )
                }
            </Grid>

        )
    

    return (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6">
            {
                data.length ? ( 
                    data.map( (prodcut: IProduct) => 
                        <ProductCard 
                            product={prodcut} 
                            key={prodcut.id}
                        />
                    ) 
                ) : (<div>no products</div>)
            }
        </Grid>
    )
}

export default ProductsPage;