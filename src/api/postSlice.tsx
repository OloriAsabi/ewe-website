import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, RootState } from "../types/interface";

const BASE_URL = 'https://ewe-api.herokuapp.com/api/auth/';

const postsAdapter = createEntityAdapter<Post>({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState();
  
export const postApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
    }),
    tagTypes: [ 'Post' ],
    endpoints: (builder) => ({
      getPosts: builder.query({
        query: () => "/posts",
        transformResponse: (responseData: any[]) => {
            let min = 1;
            const transformedPosts = responseData.map((post) => ({
              ...post,
              date: post.date || sub(new Date(), { minutes: min++ }).toISOString(),
              reactions: post.reactions || {
                thumbsUp: 0,
                thumbsDown: 0,
                bookmark: 0,
                comments: [],
              },
            }));
            return postsAdapter.setAll(initialState, transformedPosts);
          },
          providesTags: ["Post"],
        }), 
      addNewPost: builder.mutation({
        query: (initialPost) => ({
          url: "/posts",
          method: "POST",
          body: {
            ...initialPost,
            userId: Number(initialPost.userId),
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              thumbsDown: 0,
              bookmark: 0,
              comments: [],
            },
          },
        }),
        invalidatesTags: [{ type: "Post", id: "LIST" }],
      }),
      updatePost: builder.mutation({
        query: ({ id, updatedPost }) => ({
          url: `/posts/${id}`,
          method: "PUT",
          body: {
            ...updatedPost,
            date: new Date().toISOString(),
          },
        }),
        invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
      }),
      deletePost: builder.mutation({
        query: (id) => ({
          url: `/posts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
      }),
      addReaction: builder.mutation({
        query: ({ postId, reactions }) => ({
          url: `posts/${postId}`,
          method: "PATCH",
          body: { reactions },
        }),
        async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            postApiSlice.util.updateQueryData("getPosts", undefined, (draft: { entities: { [x: string]: any; }; }) => {
              const post = draft.entities[postId];
              if (post) post.reactions = reactions;
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
    }),
  });
  
  export const {
    useGetPostsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation,
  } = postApiSlice;
  
  export const selectPostsResult = postApiSlice.endpoints.getPosts.select('');

//   const selectPostsData = createSelector(
//     selectPostsResult,
//     (postsResult) => postsResult.data
//   );
  
//   export const {
//     selectAll: selectAllPosts,
//     selectById: selectPostById,
//     selectIds: selectPostIds,
//   } = postsAdapter.getSelectors((state: RootState) =>
//     selectPostsData(state) ?? initialState
//   );