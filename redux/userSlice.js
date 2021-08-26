import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
}; //global items variable

//basket slice is a small part of the global state. Similarly, we can also have slice for a user, say 'user slice' for storing logged in user's info
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
      //action.payload contains the new product added through the dispatched action
    },
    updateToBasket: (state, action) => {
      let newState = {};
      newState.items = [...state.items];

      newState.items[
        state.items.findIndex((x) => x.title === action.payload.title)
      ] = action.payload;

      state.items = [...newState.items];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((x) => x.id === action.payload.id);
      let newState = {};
      newState.items = [...state.items];
      if (state.items[index].count === 1) {
        newState.items.splice(index, 1); //splice is used to slice/remove 1 or more elements from an array
        //since we wrote 1, it goes back and removes 1 element from the given index
      } else {
        newState.items[index].count = newState.items[index].count - 1;
      }

      state.items = [...newState.items];
    },
  },
});

//Actions
export const { addToBasket, removeFromBasket, updateToBasket } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotalPrice = (state) =>
  state.basket.items.reduce(
    (total, item) => total + item.price * 75 * item.count,
    0
  );

export default basketSlice.reducer;
