import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.jwt;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'Cart'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/auth/local/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/local',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProducts: builder.query({
      query: () => '/products?fields[0]=id&fields[1]=Title&fields[2]=Price&populate=Image',
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    getCart: builder.query({
      query: (userId) => `/users/${userId}?populate[Cart][populate]=*`,
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: ({ userId, updatedCart }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: { Cart: [{products: updatedCart}] },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: ({ userId, updatedCart }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: { Cart: [{products: updatedCart}] },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = apiSlice;
