import { View, Text } from 'react-native';
import { appStyles } from '../styles/AppStyles.js';
import { homeStyles } from '../styles/HomeStyles.js';
import HorizontalRule from './HorizontalRule.js';

function HomeScreen({navigate}) {
  return (
    <>
    <View style={[appStyles.centerView, {paddingTop: 35}]}>
      <Text style={homeStyles.title}>FLATLY</Text>
    </View>
    <View style={{flex: 7}}>
      
    </View>
    <View style={appStyles.centerView}>

    </View>
    </>
  )
}

export default HomeScreen;
