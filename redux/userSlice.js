import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
}; //global items variable

//basket slice is a small part of the global state. Similarly, we can also have slice for a user, say 'user slice' for storing logged in user's info
export const userSlice = createSlice({
  name: "userProps",
  initialState,
  reducers: {
    addToUser: (state, action) => {
      state.userDetails = { ...action.payload };
      //action.payload contains the new product added through the dispatched action
    },
  },
});

//Actions
export const { addToUser } = userSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUser = (state) => state.user.userDetails;
//this user object is the user we defined in store.js
// export const selectItems = (state) => state.basket.items;
// export const selectTotalPrice = (state) =>
//   state.basket.items.reduce(
//     (total, item) => total + item.price * 75 * item.count,
//     0
//   );

export default userSlice.reducer;
