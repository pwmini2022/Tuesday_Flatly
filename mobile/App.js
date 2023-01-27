import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import LogInScreen from './components/LogInScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import { INDEPENDENCE } from './styles/Colors';
import FlatsScreen from './components/FlatsScreen';
import BookingsScreen from './components/BookingsScreen';
import ProfileScreen from './components/ProfileScreen';
import FlatScreen from './components/FlatScreen';

import { RecoilRoot } from 'recoil';

const { Navigator, Screen } = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <Text>Loading...</Text>
    )
  } else {
    return (
      <RecoilRoot>
        <NavigationContainer theme={{ colors: { background: INDEPENDENCE } }}>
          <Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <Screen name="LogInScreen" component={LogInScreen}/>
            <Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
            <Screen name="FlatsScreen" component={FlatsScreen}/>
            <Screen name="BookingsScreen" component={BookingsScreen}/>
            <Screen name="ProfileScreen" component={ProfileScreen}/>
            <Screen name="FlatScreen" component={FlatScreen}/>
          </Navigator>
        </NavigationContainer>
      </RecoilRoot>
    )
  }
}

export default App;

