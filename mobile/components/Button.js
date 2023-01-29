import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import{ buttonStyles } from '../styles/ButtonStyles';

const Button = ({loading = false, text, color, onPress = () => {}}) => (
  <View style={buttonStyles.container}>
    <TouchableOpacity onPress={onPress} style={[buttonStyles.button, {backgroundColor: color}]}>
      {loading ? <ActivityIndicator size={24} color="white"/> : <Text style={buttonStyles.text}>{text}</Text>}
    </TouchableOpacity>
  </View>
)
 
export default Button;
