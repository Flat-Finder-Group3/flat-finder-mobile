// import { Button } from "react-native";
// import { CommonActions } from '@react-navigation/native';

// function SignIn ({navigation}) {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() =>
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'Dashboard' }],
        //   })
        // )
//       }
//     />
//   );
// };

// navigation.navigate('Profile', {name: 'Jane'})

// export default SignIn


import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../utils/supabase'
import { Button, Input } from 'react-native-elements'
import UserService from '../services/UserService'
import { CommonActions } from '@react-navigation/native';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const userService = new UserService();

  useEffect(() => {
    console.log(email, password)
  }, [email, password])

  async function signInWithEmail() {
    setLoading(true)
    const response = await userService.login(supabase, email, password);
    if (response.message) Alert.alert(response.message);
    setLoading(false)
    return response
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={async () => {
            const user = await signInWithEmail()
            if (user) navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{
                  name: 'Dashboard',
                  params: { user: user }
                }],
              })
            )
          }} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})