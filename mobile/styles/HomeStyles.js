

import { StyleSheet } from 'react-native';
import { INDEPENDENCE } from './Colors';

export const homeStyles = StyleSheet.create({
  wrap: {
    marginTop: 15,
    backgroundColor: INDEPENDENCE,
    flex: 1
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    fontFamily: 'Rubik-Medium',
    color: 'white'
  },
  iconWrap: {
    flex: 1,
    alignItems: 'center'
  },
  contentWrap: {
    flex: 7,
    backgroundColor: 'white'
  }
});
