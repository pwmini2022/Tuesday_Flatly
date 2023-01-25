import { View, Text } from 'react-native';
import { appStyles } from '../styles/AppStyles.js';
import { homeStyles } from '../styles/HomeStyles.js';
import HorizontalRule from './HorizontalRule.js';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';


function HomeScreen({navigation}) {
  const iconSize = 50;
  const iconColor = 'white';

  function logOut() {
    navigation.navigate('LogInScreen');
  }

  return (
    <>
      <View style={[appStyles.centerView, {paddingTop: 35}]}>
        <Text style={homeStyles.title}>FLATLY</Text>
      </View>
      <View style={{flex: 7}}>
        
      </View>
      <View style={[appStyles.centerView, {flexDirection: 'row', alignItems: 'center'}]}>
        <View style={homeStyles.iconWrap}>
          <AwesomeIcon name="user-circle" size={iconSize} color={iconColor}/>
        </View>
        <View style={homeStyles.iconWrap}>
          <MaterialIcon name="apartment" size={iconSize} color={iconColor}/>
        </View>
        <View style={homeStyles.iconWrap}>
          <AwesomeIcon name="book" size={iconSize} color={iconColor}/>
        </View>
        <View style={homeStyles.iconWrap}>
          <EntypoIcon name="log-out" size={iconSize} color={iconColor} onPress={logOut}/>
        </View>
      </View>
    </>
  )
}

export default HomeScreen;
