import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from './components/LogInScreen';

const { Navigator, Screen } = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="LogInScreen" screenOptions={{ headerShown: false}}>
        <Screen name="LogInScreen" component={LogInScreen}/>
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
