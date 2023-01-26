import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import LogInScreen from './components/LogInScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import { INDEPENDENCE } from './styles/Colors';
import FlatsScreen from './components/FlatsScreen';
import BookingsScreen from './components/BookingsScreen';

const { Navigator, Screen } = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <Text>Loading...</Text>
    )
  } else {
    return (
      <NavigationContainer theme={{ colors: { background: INDEPENDENCE } }}>
        <Navigator initialRouteName="FlatsScreen" screenOptions={{ headerShown: false }}>
          <Screen name="LogInScreen" component={LogInScreen}/>
          <Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
          <Screen name="FlatsScreen" component={FlatsScreen}/>
          <Screen name="BookingsScreen" component={BookingsScreen}/>
        </Navigator>
      </NavigationContainer>
    )
  }
}

export default App;

