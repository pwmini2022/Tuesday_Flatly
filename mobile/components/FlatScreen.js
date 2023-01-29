import HomeScreen from './HomeScreen';
import { View, Text, Image } from 'react-native';
import { flatStyles } from '../styles/FlatStyles';
import { GREENISH_BLUE} from '../styles/Colors';
import HorizontalRule from './HorizontalRule';
import { ScrollView } from 'react-native-gesture-handler';

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
      <HorizontalRule color={GREENISH_BLUE} width={2}/>
      <View style={{marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 5}}>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>Location:</Text> {flat.location}
          </Text>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>Price:</Text> {flat.pricePerNight} PLN / night
          </Text>
          <Text style={[flatStyles.field, {textAlign: 'justify'}]}>
            <Text style={flatStyles.fieldTitle}>Description:</Text> {flat.description}
          </Text>
        </View>
    </ScrollView>
  )
  return (
    <HomeScreen content={getContent()} navigation={navigation}/>
  )
}

export default FlatScreen;