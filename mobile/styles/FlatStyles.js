import { StyleSheet } from 'react-native';
import { GREENISH_BLUE, PURPLE } from './Colors';

export const flatStyles = StyleSheet.create({
  name: {
    fontFamily: 'Rubik-Medium',
    fontSize: 32,
    color: GREENISH_BLUE,
    textAlign: 'center',
    margin: 20,
    backgroundColor: '#DAE6E2',
    padding: 10,
    borderRadius: 15
  },
  image: {
    width: 160,
    height: 100,
    marginLeft: 10,
    marginBottom: 10
  }
});