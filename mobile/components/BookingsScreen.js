import { View, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { listStyles } from '../styles/ListStyles';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getBookings, getOffer } from './utils/apiCalls';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserToken } from '../recoil/recoil';
import { INDEPENDENCE, TURQUOISE } from '../styles/Colors';
import { bookingDeleted } from '../recoil/recoil';
import { getDate } from './utils/getDate';

import HorizontalRule from './HorizontalRule';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import HomeScreen from './HomeScreen';


function BookingsScreen({ navigation }) {
  const iconSize = 30;
  const iconColor = '#383838';
  const maxBookings = 4;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [flats, setFlats] = useState({});
  const [deleted, setDeleted] = useRecoilState(bookingDeleted);
  const token = useRecoilValue(getUserToken);
  const maxPages = 50;

  async function updateBookings() {
    setLoading(true);

    try {
      const bookingsDetails = await getBookings(token, page+1, maxBookings);
      setBookings(bookingsDetails);
    }
    catch (err) {
      setBookings([]);
    }

    setDeleted(false);
  }

  async function updateFlats() {
    let offers = {};
    for (const booking of bookings) {
      offers[booking.uuid] = await getOffer(token, booking.offer_uuid);
    }
    setFlats(offers);
    
    setLoading(false);
  }

  useEffect(() => {
    updateBookings();
  }, [page, deleted]);

  useEffect(() => {
    updateFlats();
  }, [bookings]);

  const getBookingView = (booking) => {
    if (!(booking.uuid in flats)) {
      return <View key={booking.uuid}/>
    }
    const flat = flats[booking.uuid][0];

    return (
      <View key={booking.uuid}>
        <View style={listStyles.itemWrap}>
          <TouchableOpacity onPress={() => navigation.navigate('BookingScreen', {booking: booking, flat: flat})}>
            <EntypoIcon name="book" size={65} color={INDEPENDENCE}/>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
            <Text style={[listStyles.details, {fontFamily: 'SourceSansPro-Bold', fontSize: 16}]}>
              Booking {booking.uuid.slice(0,10) + '...'}
            </Text>
            <Text style={listStyles.details}>
              <Text style={{fontWeight: 'bold'}}>Flat:</Text> {flat.name}
            </Text>
            <Text style={listStyles.details}>
              <Text style={{fontWeight: 'bold'}}>Dates:</Text> from {getDate(booking.dateFrom)} till {getDate(booking.dateTo)}
            </Text>
          </View>
        </View>
        <HorizontalRule color={'#606060'} width={2}/>
      </View>
    )
  }

  const getContent = () => (
    <View style={listStyles.wrap}>
      <Text style={listStyles.header}>Check out all the bookings:</Text>
      <View style={listStyles.listWrap}>
        <View style={{flex: 1}}>
          {loading ?
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator color={TURQUOISE} size={50}/>
            </View> :
            bookings.map(booking => getBookingView(booking))}
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
            <Text style={listStyles.pages}>{page+1}</Text>
          </View>
          <View style={{flex: 1}}>
            {page < maxPages ? 
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
