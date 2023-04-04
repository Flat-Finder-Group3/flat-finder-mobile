import { createSlice } from "@reduxjs/toolkit";
// import { emptyUser } from "../models/User";

const messages = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    setMessages(state, action) {
      console.log("Payload inside reducer: ", action.payload);
      Object.assign(state, action.payload);
    },
  },
});

export const { setMessages } = messages.actions;
export default messages.reducer;
