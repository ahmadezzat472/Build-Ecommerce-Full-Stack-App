import { useState } from 'react'
import PaginatedTabs from './PaginatedTabs'
import { useGetCategoriesSliceQuery } from '../app/services/CategorySlice';
import ProductsPage from '../pages/Products';

const CategoryLists = () => {
    const [page, setPage] = useState<number>(1)
    const [categoryClickedId, setCategoryClickedId] = useState<number>(0)
    const { data, isLoading, isError, error } = useGetCategoriesSliceQuery(page);

    console.log(categoryClickedId);
    

    const preHandler = () => {
        setPage( pre => pre - 1)
    }

    const nextHandler = () => {
        setPage( pre => pre + 1)
    }

    if(isLoading)
        return <h1>loading ..</h1>

    return (
        <div>
            <PaginatedTabs 
                setCategoryClickedId={setCategoryClickedId} 
                data={data.data} 
                page={page} 
                pageCount={data.meta.pagination.pageCount} 
                preHandler={preHandler} 
                nextHandler={nextHandler} 
            />
            <ProductsPage categoryId={categoryClickedId} />
        </div>
    )
}

export default CategoryLists