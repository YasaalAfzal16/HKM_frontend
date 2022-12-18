import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  loggedIn: false,
  usr_name: "SIGN_IN",
  isAdmin: false,
  user_id: "No_ID",
};

export const isLogged = createSlice({
  name: "isLogged",
  initialState: initialStateValue,
  reducers: {
    login_user: (state) => {
      state.loggedIn = true;
    },
    logout_user: (state) => {
      state.loggedIn = false;
    },
    addUserName: (state, action) => {
      state.usr_name = action.payload;
      console.log("addUserName`s action: ", action.payload);
    },
    set_as_admin: (state) => {
      state.isAdmin = true;
    },
    logout_admin: (state) => {
      state.isAdmin = false;
    },
    set_user_ID: (state, action) => {
      state.user_id = action.payload;
      console.log("Current User_ID= ", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login_user,
  logout_user,
  addUserName,
  set_as_admin,
  logout_admin,
  set_user_ID,
} = isLogged.actions;

export default isLogged.reducer;
