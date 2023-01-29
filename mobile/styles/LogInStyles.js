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
    fontFamily: 'Rubik-Medium',
    color: DARK_BLUE
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Italic'
  },
  credentials: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15
  },
  field: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    borderBottomWidth: 2,
    padding: 0,
    marginTop: 5,
    marginBottom: 5
  },
  logInButton: {
    color: PURPLE,
    fontSize: 15,
    margin: 40,
    fontFamily: 'Rubik-Regular',
    marginTop: 10
  },
  forgotPassword: {
    textAlign: 'center',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 17,
    color: PURPLE,
    textDecorationLine: 'underline'
  },
  info: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'center',
    color: 'green',
    marginBottom: 10
  }
});
