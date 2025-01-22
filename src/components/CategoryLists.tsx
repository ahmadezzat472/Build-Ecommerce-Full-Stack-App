import { useState } from 'react'
import { useGetCategoriesSliceQuery } from '../app/services/CategorySlice';
import ProductsPage from '../pages/Products';
import Paginator from './Paginator';
import { useGetFilterProductByCategorySliceQuery } from '../app/services/productsSlice';
import CategoryListSkelton from './CategoryListSkelton';
import { Container } from '@chakra-ui/react';

const CategoryLists = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize] = useState<number>(5); 
    const [categoryClickedId, setCategoryClickedId] = useState<string>('')

    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesSliceQuery({});
    const { data: productsData, isLoading: isLoadingProduct } = useGetFilterProductByCategorySliceQuery(categoryClickedId);

    const products = productsData?.products || productsData?.data;

    // Paginate categories
    const totalCategories = categoriesData?.categories?.length || 0;
    const totalPages = Math.ceil(totalCategories / pageSize);
    const paginatedCategories = categoriesData?.categories?.slice(
        (page - 1) * pageSize,
        page * pageSize
    );   

    const prevHandler = () => {
        setPage( prev => prev - 1)
    }

    const nextHandler = () => {
        setPage( prev => prev + 1 )
    }

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