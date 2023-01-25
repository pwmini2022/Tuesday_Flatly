import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import{ buttonStyles } from '../styles/ButtonStyles';

const Button = (props) => (
  <View style={buttonStyles.container}>
    <TouchableOpacity onPress={props.onPress} style={[buttonStyles.button, {backgroundColor: props.color}]}>
      <Text style={buttonStyles.text}>{props.text}</Text>
    </TouchableOpacity>
  </View>
);

export default Button;
