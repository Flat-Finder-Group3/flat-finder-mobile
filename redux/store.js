import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import userReducer from "./userSlice";
import selectedListingSlice from "./selectedListingSlice";
import selectedConvoSlice from "./selectedConvoSlice";
import selectedForumPostsSlice from "./selectedForumPostsSlice";
import snackBarSlice from "./snackBarSlice";
import favListingSlice from "./favListingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    allMessages: messagesReducer,
    favListings: favListingSlice,
    selectedListing: selectedListingSlice,
    selectedConvo: selectedConvoSlice,
    selectedForumPosts: selectedForumPostsSlice,
    snackBar: snackBarSlice
  },
});
