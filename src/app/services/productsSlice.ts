import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieService from '../../services/CookieService'

const serverUrl = import.meta.env.VITE_SERVER_URL
const jwt = CookieService.get("jwt")


export const productApiSlice = createApi({
    reducerPath: 'productApiSlice',
    tagTypes: ["Product"],
    baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
    endpoints: (builder) => ({
        getProductSlice: builder.query({
            query: () => {
                return {
                    url: "/api/products?populate=*",
                }
            },
            providesTags: ["Product"],

            // providesTags: (result) =>
            //     result
            //         ? [...result.data.map(({ id } : {id: number} ) => ({ type: 'Product' as const, id })), 'Product']
            //         : ['Product'],
        }),

        deleteProductSlice: builder.mutation({
            query: (id) => {
                return {
                    url: `/api/products/${id}`,
                    method: "Delete",
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            },
            invalidatesTags: ["Product"],
        }),

        updateProductSlice: builder.mutation({
            query: ({ id, productData }) => ({
                url: `/api/products/${id}`,
                method: "PUT", 
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: productData, // Updated product data
            }),
            invalidatesTags: ["Product"], // Invalidate the "Product" tag after an update
        }),

        addProductSlice: builder.mutation({
            query: (productData) => {
                return {
                    url: `/api/products`,
                    method: "POST", 
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: productData, // Updated product data
                };
            },
            invalidatesTags: ["Product"], // Invalidate the "Product" tag after an update
        }),
    }),
})

export const { useGetProductSliceQuery, useDeleteProductSliceMutation, useUpdateProductSliceMutation, useAddProductSliceMutation } = productApiSlice;