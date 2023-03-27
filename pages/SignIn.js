import { Button } from "react-native";
import { CommonActions } from '@react-navigation/native';

function SignIn ({navigation}) {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        )
      }
    />
  );
};

export default SignIn