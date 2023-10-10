import { createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { Post, RootState } from "../types/interface";

const postsAdapter = createEntityAdapter<Post>();
const initialState = postsAdapter.getInitialState();

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: (state, action) => {
      state.entities[action.payload.id] = {
        ...action.payload,
        reactions: {
          thumbsUp: 0,
          thumbsDown: 0,
          bookmark: 0,
          comments: [],
        },
      };
    },
    toggleVerify: (state, action) => {
      const post = state.entities[action.payload];
      if (post) {
        post.verify = !post.verify;
      }
    },
    toggleBookmark: (state, action) => {
      const post = state.entities[action.payload];
      if (post) {
        post.bookmarked = !post.bookmarked;
      }
    },
    reactToPost: (state, action) => {
      const { postId, reactionType } = action.payload;
      const post = state.entities[postId];
      if (post) {
        if (!post.reactions) {
          post.reactions = {
            thumbsUp: 0,
            thumbsDown: 0,
            bookmark: 0,
            comments: [],
          };
        }
        if (reactionType === "like") {
          post.reactions.thumbsUp += 1;
        } else if (reactionType === "dislike") {
          post.reactions.thumbsDown += 1;
        }
      }
    },
    addCommentToPost: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.entities[postId];
      if (post) {
        post.comments.push(comment);
      }
    },
  },
});

export const {
  addPost,
  toggleVerify,
  toggleBookmark,
  reactToPost,
  addCommentToPost,
} = postSlice.actions;

const selectPostsState = (state: RootState) => state.posts;

// export const selectPostsData = createSelector(
//   selectPostsState,
//   (postsState) => postsAdapter.getSelectors().selectAll(postsState)
// );

export default postSlice.reducer;
