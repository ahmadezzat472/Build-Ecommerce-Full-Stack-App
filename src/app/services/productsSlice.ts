import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieService from '../../services/CookieService'

const serverUrl = import.meta.env.VITE_SERVER_URL
const jwt = CookieService.get("jwt")

export const productApiSlice = createApi({
    reducerPath: 'productApiSlice',
    tagTypes: ["Product"],
    baseQuery: fetchBaseQuery({ baseUrl: serverUrl}),

    endpoints: (builder) => ({
        getAllProductSlice: builder.query({
            query: () => {
                return {
                    url: "product",
                }
            },
            providesTags: ["Product"],

            // providesTags: (result) =>
            //     result
            //         ? [...result.data.map(({ id } : {id: number} ) => ({ type: 'Product' as const, id })), 'Product']
            //         : ['Product'],
        }),

        getFilterProductSlice: builder.query({
            query: (page) => {
                return {
                    url: `product/filter?page=${page}`,
                }
            },
            providesTags: ["Product"],
        }),

        getFilterProductByCategorySlice: builder.query({
            query: ({catId,page}) => {
                return {
                    url: catId ? `product/filter?category=${catId}&page=${page}` : "product"
                };
            },
            providesTags: ["Product"],
        }),

        deleteProductSlice: builder.mutation({
            query: (id) => {
                return {
                    url: `product/${id}`,
                    method: "Delete",
                    headers: {
                        token: jwt
                    }
                }
            },
            invalidatesTags: ["Product"],
        }),

        updateProductSlice: builder.mutation({
            query: ({ id, productData }) => ({
                url: `product/${id}`,
                method: "PATCH", 
                headers: {
                    token: jwt,
                },
                body: productData, // Updated product data
            }),
            invalidatesTags: ["Product"], // Invalidate the "Product" tag after an update
        }),

        addProductSlice: builder.mutation({
            query: (productData) => {
                return {
                    url: `product`,
                    method: "POST", 
                    headers: {
                        token: jwt,
                    },
                    body: productData, // Updated product data
                };
            },
            invalidatesTags: ["Product"], // Invalidate the "Product" tag after an update
        }),
    }),
})

export const { useGetAllProductSliceQuery, useGetFilterProductSliceQuery, useDeleteProductSliceMutation, useUpdateProductSliceMutation, useAddProductSliceMutation, useGetFilterProductByCategorySliceQuery, useLazyGetFilterProductByCategorySliceQuery } = productApiSlice;