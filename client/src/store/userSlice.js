import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userPosts: {
    trimmedPosts: [],
    overallPostLength: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    getUserPosts: (state, action) => {
      state.userPosts = {
        trimmedPosts: action.payload.slice(0, 30),
        overallPostLength: action.payload.length,
      };
    },
    followUser: (state, action) => {
      const { following } = state.user;

      if (following.includes(action.payload)) return;

      following.push(action.payload);
    },
    unfollowUser: (state, action) => {
      const { following } = state.user;

      if (!following.includes(action.payload)) return;

      following.splice(
        following.findIndex((userId) => userId === action.payload),
        1
      );
    },
  },
});

export const { loginUser, logoutUser, getUserPosts, followUser, unfollowUser } =
  userSlice.actions;

export default userSlice.reducer;
