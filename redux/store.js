import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import userReducer from "./userSlice";
import selectedListingSlice from "./selectedListingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    allMessages: messagesReducer,
    selectedListing: selectedListingSlice
  },
});
