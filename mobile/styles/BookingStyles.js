import { StyleSheet } from 'react-native';
import { PURPLE, INDEPENDENCE } from './Colors';

export const bookingStyles = StyleSheet.create({
  name: {
    fontFamily: 'Rubik-Medium',
    fontSize: 25,
    color: PURPLE,
    textAlign: 'center',
    backgroundColor: '#E8DBE9',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    width: '90%'
  },
  location: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    backgroundColor: 'gainsboro',
    padding: 5,
    width: '90%',
    textAlign: 'center'
  },
  image: {
    width: 130,
    height: 130,
    borderColor: INDEPENDENCE,
    borderWidth: 2,
    borderRadius: 100
  }
});
