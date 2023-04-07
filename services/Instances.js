import MessageService from "./messageService";
import ListingService from './ListingService'
import ForumPostService from './ForumPostService'

const messageService = new MessageService();
const listingService = new ListingService();
const forumPostService = new ForumPostService()

export {messageService, listingService, forumPostService}