import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const serverUrl = import.meta.env.VITE_SERVER_URL

export const productApiSlice = createApi({
    reducerPath: 'productApiSlice',
    tagTypes: ["Products"],
    baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
    endpoints: (builder) => ({
        getProductSlice: builder.query({
            query: () => {
                return {
                    url: "/api/products?populate=*",
                }
            },
        }),
    }),
})

export const { useGetProductSliceQuery } = productApiSlice;