import { View, Text, Image, TouchableHighlight } from 'react-native';
import { listStyles } from '../styles/ListStyles';
import { useState } from 'react';

import BOOKINGS from "../data/bookings.json"
import HorizontalRule from './HorizontalRule';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './HomeScreen';
import FLATS from "../data/flats.json"
import { TouchableOpacity } from 'react-native-gesture-handler';

function BookingsScreen({ navigation }) {
  const iconSize = 30;
  const iconColor = '#383838';
  const maxBookings = 3;
  const maxPages = Math.ceil(BOOKINGS.length / maxBookings);
  const [page, setPage] = useState(0);
  const user = {firstName: 'Myname', lastName: 'Mylastname'}

  const getBookingView = (booking) => (
    <View key={booking.id}>
      <View style={listStyles.itemWrap}>
        <TouchableOpacity onPress={() => navigation.navigate('BookingScreen', {booking, booking, flat: FLATS[booking.flat-1], user: user})}>
          <Image
            style={listStyles.image}
            source={{
              uri: FLATS[booking.flat-1].picture1,
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
          <Text style={[listStyles.details, {fontFamily: 'SourceSansPro-Bold', fontSize: 16}]}>
            Booking {booking.id}
          </Text>
          <Text style={listStyles.details}>
            <Text style={{fontWeight: 'bold'}}>Flat:</Text> {booking.flat}
          </Text>
          <Text style={listStyles.details}>
            <Text style={{fontWeight: 'bold'}}>Dates:</Text> from {booking.startDate} till {booking.endDate}
          </Text>
        </View>
      </View>
      <HorizontalRule color={'#606060'} width={2}/>
    </View>
  )

  function getBookings() {
    const bookings = [];

    for (const booking of BOOKINGS.slice(maxBookings*page, maxBookings*(page+1))) {
      bookings.push(getBookingView(booking));
    }
    
    return bookings;
  }

  const getContent = () => (
    <View style={listStyles.wrap}>
      <Text style={listStyles.header}>Check out all the bookings:</Text>
      <View style={listStyles.listWrap}>
        <View style={{flex: 1}}>
          {getBookings()}
        </View>
        <View style={listStyles.arrowsWrap}>
          <View style={{flex: 1}}>
            {page !== 0 ?
            <AwesomeIcon name="chevron-left"
                        size={iconSize}
                        color={iconColor}
                        onPress={() => setPage(page-1)}/> : <></>}
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={listStyles.pages}>{page+1}/{maxPages}</Text>
          </View>
          <View style={{flex: 1}}>
            {page !== maxPages-1 ?
            <AwesomeIcon name="chevron-right"
                        size={iconSize}
                        color={iconColor}
                        style={{alignSelf: 'flex-end'}}
                        onPress={() => setPage(page+1)}/> : <></>}
          </View>
        </View>
      </View>
    </View>
  )

  return <HomeScreen content={getContent()} navigation={navigation}/>
}

export default BookingsScreen;