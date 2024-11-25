import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const serverUrl = import.meta.env.VITE_SERVER_URL

export const productApiSlice = createApi({
    tagTypes: ["Products"],
    // reducerPath: 'productApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
    endpoints: (builder) => ({
        getProductSlice: builder.query({
            query: () => {
                return {
                    url: "/products?populate=*",
                }
            },
        }),
    }),
})

export const { useGetProductSliceQuery } = productApiSlice;