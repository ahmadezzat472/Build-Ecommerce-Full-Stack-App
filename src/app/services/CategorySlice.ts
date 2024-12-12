import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import CookieService from '../../services/CookieService'

const serverUrl = import.meta.env.VITE_SERVER_URL
// const jwt = CookieService.get("jwt")


export const categoryApiSlice = createApi({
    reducerPath: 'categoryApiSlice',
    tagTypes: ["Category"],
    baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
    endpoints: (builder) => ({
        getCategoriesSlice: builder.query({
            query: () => {
                return {
                    url: `category`,
                }
            },
            providesTags: ["Category"],
        }),

        // getCategorySlice: builder.query({
        //     query: (id) => {
        //         return {
        //             url: `/api/categories/${id}?populate=products`,
        //         }
        //     },
        // })
    }),
})

export const { useGetCategoriesSliceQuery } = categoryApiSlice;