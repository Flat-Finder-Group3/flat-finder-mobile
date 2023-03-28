import {CommonActions} from '@react-navigation/native'
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Button, StatusBar, FlatList } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../styles'
import TicketCard from '../../components/TicketCard';

export default function Home({navigation, route, tickets, loading}) {


  // const { tickets, ownListings, favListings, loading} = route.params
  // const [homeTickets, setHomeTickets] = useState(tickets)

  // useEffect(() => {
    // console.log("Tickets from HOME: ", homeTickets)
  // }, [homeTickets])

  if (loading) return (
    <View>
      <Text>Loading....</Text>
    </View>
  )

  return (
    <View style={styles.container}>
        <Text>My empty home!</Text>
          <Text>My tickets!</Text>
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
      </View>
  );
}
