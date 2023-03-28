import {CommonActions} from '@react-navigation/native'
import React from 'react';
import { View, StyleSheet, Button, StatusBar } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../styles';


export default function Inbox({navigation}) {
  return (
    <View style={styles.container} >
        <Text>I wish I had something in my inbox but i dont!!</Text>
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
