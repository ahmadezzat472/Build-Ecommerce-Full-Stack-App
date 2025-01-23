import { useState } from 'react'
import { useGetCategoriesSliceQuery } from '../app/services/CategorySlice';
import ProductsPage from '../pages/Products';
import Paginator from './Paginator';
import { useGetFilterProductByCategorySliceQuery } from '../app/services/productsSlice';
import CategoryListSkelton from './CategoryListSkelton';
import { Container } from '@chakra-ui/react';

const CategoryLists = () => {
    /* ___________________ State ___________________ */
    //** State for pagination
    const [page, setPage] = useState<number>(1);
    const [pageSize] = useState<number>(5); 

    //** State to track the clicked category's ID (for get all products related by this category )
    const [categoryClickedId, setCategoryClickedId] = useState<string>('')

    /* ___________________ API Queries and Mutations ___________________ */
    //** Fetch categories
    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesSliceQuery({});
    
    //** Fetch Products By Category
    const { data: productsData, isLoading: isLoadingProduct } = useGetFilterProductByCategorySliceQuery({catId: categoryClickedId});

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
            <ProductsPage products={products} isLoading={isLoadingProduct} />
        </Container>
    )
}

export default CategoryLists;