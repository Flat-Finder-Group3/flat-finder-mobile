import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: false,
  reducers: {
    setSnackBarVisibility(state, action) {
      console.log("Payload inside reducer: ", action.payload);
      state = action.payload; 
      return state;
    },
  },
});

export const { setSnackBarVisibility } = snackBarSlice.actions;
export default snackBarSlice.reducer;
