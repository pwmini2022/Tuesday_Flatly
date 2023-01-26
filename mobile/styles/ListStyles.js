import { StyleSheet } from 'react-native';
import { PURPLE } from './Colors';

export const listStyles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  header: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 19,
    fontWeight: 'bold',
    color: PURPLE
  },
  listWrap: {
    flex: 1,
    backgroundColor: 'gainsboro',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    width: '90%'
  },
  itemWrap: {
    flexDirection: 'row'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    backgroundColor: 'center'
  },
  details: {
    fontFamily: 'Rubik-Regular'
  },
  arrowsWrap: {
    flexDirection: 'row'
  },
  pages: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    fontWeight: 'bold'
  }
});