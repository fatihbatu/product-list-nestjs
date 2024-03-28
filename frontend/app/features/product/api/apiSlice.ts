// Need to use the React-specific entry point to import createApi
import { Product } from '@/app/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product,
      { sort?: string; stock?: string; minPrice?: number; maxPrice?: number }
    >({
      query: (arg) => {
        console.log(arg);
        const queryString = new URLSearchParams({
          ...(arg?.sort && { sort: 'price' }),
          ...(arg?.stock && { stock: '0' }),
          ...(arg?.minPrice && { minPrice: arg.minPrice.toString() }),
          ...(arg?.maxPrice && { maxPrice: arg.maxPrice.toString() }),
        });
        return `/products?${queryString.toString()}`;
      },
      providesTags: ['Product'],
    }),
    pinProduct: builder.mutation<
      Product,
      { productId: number; position: number }
    >({
      query: ({ productId, position }) => ({
        url: `/products/pin/${productId}`,
        method: 'PUT',
        body: { position },
      }),
      invalidatesTags: ['Product'],
    }),
    unPinProduct: builder.mutation<Product, number>({
      query: (productId) => ({
        url: `/products/unpin/${productId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  usePinProductMutation,
  useUnPinProductMutation,
} = apiSlice;
