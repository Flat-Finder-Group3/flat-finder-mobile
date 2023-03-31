import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, StatusBar } from 'react-native';

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

const Tab = createBottomTabNavigator();

export default function Dashboard({ navigation, route }) {
  
  const user = route.params.user

  const [listings, setListings] = useState([]);
  const [favListings, setFavListings] = useState([]);
  const [ownListings, setOwnListings] = useState([])
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);


  const userService = new UserService();
  const listingService = new ListingService();
  const favListingSevice = new FavListingService();
  const ticketService = new TicketService();

  async function fetchData() {
    const [allListings] = await Promise.all([
      listingService.getListings(),
    ]);
    // user_profile.is_admin && router.push("/admin");
    // setListing((prevListing) => ({ ...prevListing, owner: user_profile.id }));
    setListings(allListings);

    const [new_favListings, new_ownListings, new_tickets] = await Promise.all([
      favListingSevice.getFavListing(user.id),
      listingService.getOwnListing(user.id),
      ticketService.getUserTicket(user.id),
    ]);
    setFavListings(new_favListings);
    setOwnListings(new_ownListings);
    setTickets(new_tickets);
    setLoading(false);
  }


  useEffect(() => {
    fetchData();
  }, []);

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
        component={Inbox}
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