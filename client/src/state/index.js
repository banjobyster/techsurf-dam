import { createSlice } from "@reduxjs/toolkit";

// Initial state for the authentication slice
const initialState = {
  user: null,
  token: null,
  searchParam: null,
};

// Create the authSlice using createSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to handle setting user login information
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Reducer to handle user logout
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.workspaces = [];
    },
    // Reducer to add file to list
    uploadFile: (state, action) => {
      state.user.files.push(action.payload.file);
    },
    // Reducer to refresh file list
    setFiles: (state, action) => {
      state.user.files = action.payload.files;
    },
    // Reducer to set search parameter
    setSearchParam: (state, action) => {
      state.searchParam = action.payload.searchParam;
    }
  },
});

export const { setLogin, setLogout, uploadFile, setFiles, setSearchParam } = authSlice.actions;
export default authSlice.reducer;
