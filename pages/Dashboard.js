import { View, Text, StatusBar, Button } from "react-native";
import { CommonActions } from '@react-navigation/native';

function Dashboard({navigation}) {  
  
  return (
    <View >
        <Text>Open up App.js to start working on your app!</Text>
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
  )
}

export default Dashboard;