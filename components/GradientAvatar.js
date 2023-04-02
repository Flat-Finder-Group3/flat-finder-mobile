import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // or 'react-native-linear-gradient';

const GradientAvatar = ({ size, initials, gradientColors }) => (
  <View style={{
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: size / 2,
      }}
    />
    <Text style={{
      fontSize: size * 0.4,
      color: 'white',
      fontWeight: 'bold',
    }}>
      {initials}
    </Text>
  </View>
);

export default GradientAvatar;
