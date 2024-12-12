import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieService from '../../services/CookieService'

const serverUrl = import.meta.env.VITE_SERVER_URL
const jwt = CookieService.get("jwt")


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

        deleteCategorySlice: builder.mutation({
            query: (id) => {
                return {
                    url: `category/${id}`,
                    method: "Delete",
                    headers: {
                        token: jwt
                    }
                }
            },
            invalidatesTags: ["Category"],
        }),

        updateCategorySlice: builder.mutation({
            query: ({ id, categoryData }) => ({
                url: `category/${id}`,
                method: "PATCH", 
                headers: {
                    token: jwt,
                },
                body: categoryData, // Updated Category data
            }),
            invalidatesTags: ["Category"], // Invalidate the "Product" tag after an update
        }),

        addCategorySlice: builder.mutation({
            query: (productData) => {
                return {
                    url: `category`,
                    method: "POST", 
                    headers: {
                        token: jwt,
                    },
                    body: productData, // Updated Category data
                };
            },
            invalidatesTags: ["Category"], // Invalidate the "Product" tag after an update
        }),
    }),
})

export const { useGetCategoriesSliceQuery, useAddCategorySliceMutation, useDeleteCategorySliceMutation, useUpdateCategorySliceMutation } = categoryApiSlice;