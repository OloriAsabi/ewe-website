import { createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { RootState, User } from "../types/interface";

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.username.localeCompare(b.username),
});

export interface UsersState extends EntityState<User> {
  isLogin: boolean;
  accessToken: string;
  tokenExpiration: string;
  refreshToken: string;
  expiringDate: string;
  currentUser: User | null;
}

const initialState: UsersState = usersAdapter.getInitialState({
  isLogin: false,
  accessToken: "",
  tokenExpiration: "",
  refreshToken: "",
  expiringDate: "",
  currentUser: null,
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    updateUser: (state, action) => {    
      state.currentUser = {
        ...state.currentUser,
        ...action.payload.changes, // Use `changes` from the payload
      };    
    },    
    setLoginStatus: (state, action) => {
      state.isLogin = action.payload.isLogin;
      if (action.payload.user) {
        state.currentUser = {
          ...action.payload.user,
          location: action.payload.user.location || undefined,
        };
      }
      state.expiringDate = new Date(new Date().getTime() + 600 * 60000).toString();
    },
    updateToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearUser: (state) => {
      usersAdapter.removeAll(state);
      state.isLogin = false;
      state.accessToken = "";
      state.tokenExpiration = "";
      state.refreshToken = "";
      state.expiringDate = "";
      state.currentUser = null;
    },
    updateUserLocation: (state, action) => {
      if (state.currentUser) {
        state.currentUser.location = action.payload;
      }
    },
  },
});

export const {
  addUser,
  updateUser,
  updateToken,
  clearUser,
  setLoginStatus,
  updateUserLocation, // Add the new action
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors<RootState>((state) => state.user);


export const selectIsAuthenticated = (state: RootState) => state.user?.isLogin ?? false;
export const selectAccessToken = (state: RootState) => state.user?.accessToken ?? "";
export const selectCurrentUser = (state: RootState) => state.user?.currentUser ?? null;
export const selectUserLocation = (state: RootState) => state.user?.currentUser?.location;