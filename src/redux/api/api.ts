/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fit-flex-server-ochre.vercel.app/api" }),
  tagTypes: ["products","orders"],
  endpoints: (builder) => ({
    getProducts: builder.query ({
      query: () => ({
        method : "GET",
        url : "/products"
      }),
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          method: "POST",
          url: "/products/create-product",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["products"],
    }),
    getSingleProduct: builder.query ({
      query: ({ id } ) => ({
        method : "GET",
        url : `/products/${id}`
      }),
      providesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/products/${id}`,
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/products/${id}`,
      }),
      invalidatesTags: ["products"],
    }),


}),
});

export const { useGetProductsQuery, useAddProductMutation, useGetSingleProductQuery, useUpdateProductMutation , useDeleteProductMutation} = baseApi;