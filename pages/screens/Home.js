import {CommonActions} from '@react-navigation/native'
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Button, StatusBar, FlatList, RefreshControl, ScrollView} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../styles'
import TicketCard from '../../components/TicketCard';
import FavListingCard from '../../components/FavListingCard';


export default function Home({navigation, route, tickets, ownListings, favListings, loading, fetchData}) {

  favListings = favListings.map((item) => item.listing);


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };


  if (loading) return (
    <View>
      <Text>Loading....</Text>
    </View>
  )

  return (
    <ScrollView
    contentContainerStyle={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >

    {/* <View style={styles.container}> */}
        <Text>My empty home!</Text>

          <Text>Favorite Listings</Text>
            <FlatList
              data={favListings}
              renderItem={({item}) => <FavListingCard key={item.id} item={item}/> }
              keyExtractor={(item) => item.id.toString()}
              />


          <Text>Own Listings</Text>
            <FlatList
              data={ownListings}
              renderItem={({item}) => <FavListingCard key={item.id} item={item}/> }
              keyExtractor={(item) => item.id.toString()}
              />

          <Text>Tickets</Text>
          <FlatList
            data={tickets}
            renderItem={({item}) => <TicketCard key={item.id} item={item}/> }
            keyExtractor={(item) => item.id.toString()}
            />
          <Button 
            title='Logout'
            onPress={() => navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Sign in' }],
              }))}
              />
        <StatusBar style="auto" />
        {/* </View> */}
     </ScrollView>
  );
}
