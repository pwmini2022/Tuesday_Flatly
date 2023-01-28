import { StyleSheet } from 'react-native';
import { GREENISH_BLUE, DARK_BLUE } from './Colors';

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
  },
  field: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 17,
    marginBottom: 5
  },
  fieldTitle: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: DARK_BLUE
  }
});