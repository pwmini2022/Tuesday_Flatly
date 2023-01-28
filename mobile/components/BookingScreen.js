import HomeScreen from './HomeScreen';
import { View, Text, Image } from 'react-native';
import { bookingStyles } from '../styles/BookingStyles';
import { flatStyles } from '../styles/FlatStyles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Button from './Button';

function BookingScreen({ route, navigation }) {
  const {booking, flat, user} = route.params;
  
  const getContent = () => (
    <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={bookingStyles.name}>{flat.name}</Text>
        <Text style={bookingStyles.location}>
          <Text style={flatStyles.fieldTitle}>Location:</Text> {flat.location}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableHighlight onPress={() => navigation.navigate('FlatScreen', {flat: flat})}>
          <Image
            style={bookingStyles.image}
            source={{
              uri: flat.picture1,
            }}
          />
        </TouchableHighlight>
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>Price:</Text> {flat.pricePerNight} PLN / night
          </Text>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>Start date:</Text> {booking.startDate}
          </Text>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>End date:</Text> {booking.endDate}
          </Text>
        </View>      
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <AwesomeIcon name="user" size={65}/>
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>First name:</Text> {user.firstName}
          </Text>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>Last name:</Text> {user.lastName}
          </Text>
        </View>      
      </View>
      <Button text="CANCEL" color="#D2122E"/>
    </View>
  )
  return (
    <HomeScreen content={getContent()} navigation={navigation}/>
  )
}

export default BookingScreen;
