import { View, Text, Image, ActivityIndicator } from 'react-native';
import { bookingStyles } from '../styles/BookingStyles';
import { flatStyles } from '../styles/FlatStyles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { getOfferImages, getOfferImageBase64, deleteBooking } from './utils/apiCalls';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getUserToken, bookingDeleted } from '../recoil/recoil';
import { TURQUOISE } from '../styles/Colors';

import HomeScreen from './HomeScreen';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Button from './Button';

function BookingScreen({ route, navigation }) {
  const {booking, flat} = route.params;
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const token = useRecoilValue(getUserToken);
  const setDeleted = useSetRecoilState(bookingDeleted);

  async function updateImage() {
    try {
      const images = await getOfferImages(token, flat.uuid);
      const imageBase64 = await getOfferImageBase64(token, images[0].offerImageUuid);
      setImage(imageBase64);
    }
    catch {
      setImage("-");
    }
    
    setLoading(false);
  }

  useEffect(() => {
    updateImage();
  }, []);

  async function removeBooking() {
    setDeleting(true);
    try {
      await deleteBooking(token, booking.uuid);
    }
    catch {}
    setDeleted(true);
    navigation.navigate('BookingsScreen');
  }

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
          {loading ? 
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator color={TURQUOISE} size={50}/>
            </View> :
            <Image
              style={bookingStyles.image}
              source={{
                uri: image,
              }}
            />
          }
        </TouchableHighlight>
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>Price:</Text> {flat.price} PLN / night
          </Text>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>Start date:</Text> {booking.dateFrom}
          </Text>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>End date:</Text> {booking.dateTo}
          </Text>
        </View>      
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <AwesomeIcon name="user" size={65}/>
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>First name:</Text> {booking.first_name}
          </Text>
          <Text style={flatStyles.field}>
            <Text style={flatStyles.fieldTitle}>Last name:</Text> {booking.last_name}
          </Text>
        </View>      
      </View>
      <Button loading={deleting} text="CANCEL" color="#D2122E" onPress={removeBooking}/>
    </View>
  )
  return (
    <HomeScreen content={getContent()} navigation={navigation}/>
  )
}

export default BookingScreen;
