import { useState } from 'react'
import { useGetCategoriesSliceQuery } from '../app/services/CategorySlice';
import ProductsPage from '../pages/Products';
import Paginator from './Paginator';
import { useGetFilterProductByCategorySliceQuery } from '../app/services/productsSlice';
import CategoryListSkelton from './CategoryListSkelton';
import { Container } from '@chakra-ui/react';
import NotFoundHandler from './errors/NotFoundHandler';

const CategoryLists = () => {
    /* ___________________ State ___________________ */
    //** State for pagination
    const [page, setPage] = useState<number>(1);
    const [pageSize] = useState<number>(2); 

    //** State to track the clicked category's ID (for get all products related by this category )
    const [categoryClickedId, setCategoryClickedId] = useState<string>('')

    /* ___________________ API Queries and Mutations ___________________ */
    //** Fetch categories
    const { data: categoriesData, isLoading: isLoadingCategories, isError: isErrorCategories, error: errorCategories } = useGetCategoriesSliceQuery({});
    
    //** Fetch Products By Category
    const { data: productsData, isLoading: isLoadingProduct, isError: isErrorProduct, error: errorProduct, isFetching } = useGetFilterProductByCategorySliceQuery({catId: categoryClickedId});

    //** if  */
    const products = productsData?.products || productsData?.data;

    /* ___________________ Paginate Categories ___________________ */
    const totalCategories = categoriesData?.categories?.length || 0;
    const totalPages = Math.ceil(totalCategories / pageSize);
    const paginatedCategories = categoriesData?.categories?.slice(
        (page - 1) * pageSize,
        page * pageSize
    );   

    /*  ___________________ Pagination Handlers ___________________ */
    const prevHandler = () => {
        setPage( prev => prev - 1)
    }

    const nextHandler = () => {
        setPage( prev => prev + 1 )
    }

    /* ___________________ Render ___________________ */
    //** Show a skeleton loader if the page is loading or the user is offline
    if(isLoadingCategories) {
        return (
            <CategoryListSkelton />
        )
    }

    //* Handle errors
    if(isErrorCategories || totalCategories === 0){
        return (
            <NotFoundHandler 
                title="NO Categories Avaliable" 
                description={
                    isErrorCategories ? (
                    errorCategories && "status" in errorCategories && "data" in errorCategories ? 
                    `${errorCategories.status} ${(errorCategories.data as { error: string }).error}` : 
                    "An unexpected error occurred."
                    ) : ("There are no categories available to display.")
                }
            />
        )
    } 

    return (
        <Container maxW={'7xl'}>
            <Paginator
                data={paginatedCategories} 
                currentPage={page} 
                totalPages={totalPages} 
                pageSize={pageSize}
                onClickNext={nextHandler} 
                onClickPrev={prevHandler} 
                isLoading={isLoadingCategories}
                setCategoryClickedId={setCategoryClickedId}
            />
            <ProductsPage products={products} isLoading={isLoadingProduct} isFetching={isFetching} isError={isErrorProduct} error={errorProduct} />
        </Container>
    )
}

export default CategoryLists;