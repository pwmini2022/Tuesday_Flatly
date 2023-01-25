import { StyleSheet } from 'react-native';
import { DARK_BLUE, PURPLE } from './Colors';

export const logInStyles = StyleSheet.create({
  logInView: {
    margin: (0, 35),
    padding: (0, 25),
    backgroundColor: 'white',
    borderRadius: 25
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontWeight: 'bold',
    color: DARK_BLUE
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Regular',
    fontStyle: 'italic'
  },
  credentials: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  field: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    borderBottomWidth: 2,
    padding: 0,
    marginBottom: 5
  },
  logInButton: {
    color: PURPLE,
    fontSize: 15,
    margin: 40,
    fontFamily: 'Rubik-Regular'
  }
});