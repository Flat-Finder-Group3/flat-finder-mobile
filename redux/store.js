import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesReducer";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    allMessages: messagesReducer,
    // filters: filtersReducer,
  },
});
