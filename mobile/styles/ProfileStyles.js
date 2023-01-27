import { StyleSheet } from 'react-native';
import { PURPLE } from './Colors';

export const profileStyles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldsWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    padding: 25,
    margin: 20,
    borderRadius: 15
  },
  header: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 26,
    fontWeight: 'bold',
    color: PURPLE
  },
  fieldTitle: {
    fontFamily: 'Rubik-Regular',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18
  },
  field: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18
  }
});