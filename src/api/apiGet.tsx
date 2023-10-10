import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAccessToken } from './userSlice';
import { RootState } from '../types/interface';

const BASE_URL = 'https://ewe-api.herokuapp.com/api/auth/';

export const getApiSlice = createApi({
  reducerPath: 'getApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: 'no-cors',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState | undefined;
      const accessToken = state ? selectAccessToken(state) : '';
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },
  }),
  tagTypes: ['Google', 'Facebook', 'Logout'],
  endpoints: (builder) => ({
    getGoogleSignIn: builder.query({
      query: () => ({
        url: 'google/signin',
        providesTags: ['Google'],
        defer: true,
        method: 'GET',
      }),
    }),
    getFaceBookSignIn: builder.query({
      query: () => ({
        url: 'facebook/signin',
        providesTags: ['Facebook'],
        defer: true,
        method: 'GET',
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: 'logout',
        defer: true,
        method: 'GET',
        providesTags: ['Logout'],
      }),
    }),
  }),
});

export const { useGetGoogleSignInQuery, useGetFaceBookSignInQuery, useLogoutQuery } = getApiSlice;
export const { endpoints: { getGoogleSignIn, logout, getFaceBookSignIn } } = getApiSlice;
