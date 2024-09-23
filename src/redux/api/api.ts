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
}),
});

export const { useGetProductsQuery, useAddProductMutation, useGetSingleProductQuery} = baseApi;