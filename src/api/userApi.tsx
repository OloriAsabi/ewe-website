// api.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAccessToken } from './userSlice';
import { RootState } from '../types/interface';

const USER_PROFILE_BASE_URL = 'https://ewe-api.herokuapp.com/api/';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: USER_PROFILE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState | undefined;
      const accessToken = state ? selectAccessToken(state) : '';
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      headers.set('Content-Type', 'application/json');
    },
  }),
  tagTypes: ['UserProfile'],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => `users/${userId}/profile`, // Define the query URL
      providesTags: ['UserProfile'],
    }),
    updateUserProfile: builder.mutation({
      query: ({ userId, profileData }) => ({
        url: `users/${userId}/profile`,
        method: 'PATCH',
        body: profileData,
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApiSlice;
export const { endpoints: { getUserProfile, updateUserProfile } } = userApiSlice;

