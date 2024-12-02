import ProductCard from "../components/ProductCard";
// import useCustomQuery from "../hooks/useCustomQuery";
import { Grid } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import ProductCardSkelton from "../components/ProductCardSkelton";
import { useGetProductSliceQuery } from "../app/services/productsSlice";

const ProductsPage = () => {
  const { data, isLoading, isError, error } = useGetProductSliceQuery({});

  // const { data, isPending } = useCustomQuery({
  //     /* ${queryKey} => when update on item occure => the id of item will change =>
  //      thus, queryKey Changes => then useCustomQuery is execute and this we need to get new updated data */
  //     queryKey: ['product'],
  //     url: "/products?populate=*",
  // })

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

  return (
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
  );
};

export default ProductsPage;
