import HomeScreen from './HomeScreen';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { flatStyles } from '../styles/FlatStyles';

function FlatScreen({ route, navigation }) {
  const {flat} = route.params;
  
  const getContent = () => (
    <ScrollView>
      <Text style={flatStyles.name}>{flat.name}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          style={{width: 170, height: 210}}
          source={{
            uri: flat.picture1,
          }}
        />
        <View>
          <Image
            style={flatStyles.image}
            source={{
              uri: flat.picture2,
            }}
          />
          <Image
            style={flatStyles.image}
            source={{
              uri: flat.picture3,
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
  return (
    <HomeScreen content={getContent()} navigation={navigation}/>
  )
}

export default FlatScreen;