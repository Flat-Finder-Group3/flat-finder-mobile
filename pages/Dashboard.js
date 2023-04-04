import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Button, StatusBar } from 'react-native';
import {supabase} from '../utils/supabase'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import Search from './screens/Search';
import Home from './screens/Home';
import Account from './screens/Account';
import Inbox from './screens/Inbox';
import UserService from '../services/UserService';
import ListingService from '../services/ListingService';
import FavListingService from '../services/FavListingService';
import TicketService from '../services/TicketService';
import MessageService from '../services/messageService'

const Tab = createBottomTabNavigator();

export default function Dashboard({ navigation, route }) {
  
  const user = route.params.user

  const [listings, setListings] = useState([]);
  const [favListings, setFavListings] = useState([]);
  const [ownListings, setOwnListings] = useState([])
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([])

  const userRef = useRef(user);
  const ownListingsRef = useRef(ownListings);

  const userService = new UserService();
  const listingService = new ListingService();
  const favListingSevice = new FavListingService();
  const ticketService = new TicketService();
  const messageService = new MessageService();

  async function fetchData() {
    const [allListings] = await Promise.all([
      listingService.getListings(),
    ]);
    setListings(allListings);

    const [new_favListings, new_ownListings, new_tickets, new_conversations] = await Promise.all(
      [
        favListingSevice.getFavListing(user.id),
        listingService.getOwnListing(user.id),
        ticketService.getUserTicket(user.id),
        messageService.getUserConversations(user.id)
      ]
    );
    setFavListings(new_favListings);
    setOwnListings(new_ownListings);
    setTickets(new_tickets);
    setLoading(false);
    setConversations(new_conversations);

    console.log({conversations})
    const twoDMessageArray = await Promise.all(new_conversations.map(conversation => {
      return messageService.getConversationMessages(conversation.id)
    }))
    console.log({twoDMessageArray})
    setMessages(twoDMessageArray)
  }


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    userRef.current = user;
    ownListingsRef.current = ownListings
  }, [user, ownListings]);

  useEffect(() => {
    console.log('State changed 🟢🟢🟢')
  }, [messages])

  async function handleMessageEvent(new_record, user){
    //if we sent the message, don't notify!
    if (new_record.sender_id !== user.id){
      const conversation = await messageService.getConversationById(new_record.conversation_id)
      // console.log("Here is the user state var: " , {user})
      if (conversation.user1.id === user.id || conversation.user2.id === user.id){
        setMessages((prev) => {
          // Find the index of the current conversation in the allMessages array
          const conversationIndex = prev.findIndex((msgArray) => msgArray.length > 0 && msgArray[0].conversation_id === conversation.id);
        
          // If the conversation is found, update the messages for that conversation
          if (conversationIndex !== -1) {
            const updatedMessages = [...prev];
            updatedMessages[conversationIndex] = updatedMessages[conversationIndex].concat([new_record]);
            return updatedMessages;
          } else {
            // If the conversation is not found, add the new message to the allMessages array
            return [...prev, [new_message]];
          }
        });
      } else {
        console.log('The message was not sent to you: ', user.id, " the conversation is between:", conversation.user1.id, " and ", conversation.user2.id)
      }
    }
  }

  async function handleForumEvent(new_record, ownListings){
    console.log("Inside handleForumEvent: ", new_record)
    // const new_record = payload.new;
    console.log({new_record})
    console.log({ownListings})
    for (const listing of ownListings){
      console.log({listing})
      if (listing.forum == new_record.forum){
        //get user
        console.log("Inside if statement of handleForumEvent")
        const fullPost = await forumPostService.getPostById(new_record.id)
        // notificationService.forumPost(fullPost, listing.address.city)
      }
    }
  }


  function handleRealtimeEvents(payload, user, ownListings){
    const [new_record, table] = [payload.new, payload.table];
    switch (table){
      case 'forum_post':
        handleForumEvent(new_record,ownListings)
        break;
      case 'message':
        handleMessageEvent(new_record,user);
        break;
      default:
        console.log(payload)
    }
  }

  useEffect(() => {
    // Supabase client setup
    const channel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
      },
      (payload) => handleRealtimeEvents(payload, userRef.current, ownListingsRef.current)
    )
    .subscribe()
  }, [supabase]);

  useEffect(() => {
    console.log({ownListings, tickets, listings})
  }, [ownListings, tickets, listings])

  useEffect(() => {
    console.log("User inside dashboard! " , user)
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <Home
            {...props}
            user={user}
            tickets={tickets}
            ownListings={ownListings}
            favListings={favListings}
            loading={loading}
            fetchData={fetchData}
          />
        )}
      
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        children={(props) => (
          <Search
            {...props}
            user={user}
            listings={listings}
            loading={loading}
            fetchData={fetchData}
          />
        )}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => {
            return <Icon name='home-search' size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        children={(props) => (
          <Inbox
            {...props}
            user={user}
            conversations={conversations}
            messages={messages}
            loading={loading}
            setMessages={setMessages}
            fetchData={fetchData}
          />
        )}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => {
            return <Icon name='inbox' size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        initialParams={{ user }}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});