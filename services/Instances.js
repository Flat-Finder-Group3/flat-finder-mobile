import MessageService from "./messageService";
import ListingService from './ListingService'
import ForumPostService from './ForumPostService'
import FavListingService from "./FavListingService";

const messageService = new MessageService();
const listingService = new ListingService();
const forumPostService = new ForumPostService()
const favListingSevice = new FavListingService();

export {messageService, listingService, forumPostService, favListingSevice}