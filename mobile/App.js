import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import LogInScreen from './components/LogInScreen';
import HomeScreen from './components/HomeScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import { INDEPENDENCE } from './styles/Colors';

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
        <Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
          <Screen name="LogInScreen" component={LogInScreen}/>
          <Screen name="HomeScreen" component={HomeScreen}/>
          <Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        </Navigator>
      </NavigationContainer>
    )
  }
}

export default App;

