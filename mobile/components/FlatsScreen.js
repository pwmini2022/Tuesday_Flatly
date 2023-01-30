import { View, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { listStyles } from '../styles/ListStyles';
import { useState, useEffect } from 'react';
import { getOfferImageBase64, getOfferImages, getOffers } from './utils/apiCalls';
import { useRecoilValue } from 'recoil';
import { getUserToken } from '../recoil/recoil';
import { TURQUOISE } from '../styles/Colors';

import HorizontalRule from './HorizontalRule';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';

function FlatsScreen({ navigation }) {
  const iconSize = 30;
  const iconColor = '#383838';
  const maxFlats = 3;
  const [page, setPage] = useState(0);
  const token = useRecoilValue(getUserToken);
  const maxPages = 50;
  const [loading, setLoading] = useState(true);
  const [flats, setFlats] = useState([]);
  const [uris, setUris] = useState({});

  async function updateFlats() {
    setLoading(true);

    try {
      const flats = await getOffers(token, page+1, maxFlats);
      setFlats(flats);
    }
    catch (err) {
      setFlats([]);
    }
  }

  async function updateURIs() {
    let urls = {}
    for (const flat of flats) {
      const images = await getOfferImages(token, flat.uuid);
      if (images.length) {
        urls[flat.uuid] = await getOfferImageBase64(token, images[0].offerImageUuid)
      }
    }
    setUris(urls);

    setLoading(false);
  }

  useEffect(() => {
    updateFlats();
  }, [page, ]);

  useEffect(() => {
    updateURIs();
  }, [flats]);

  const getFlatView = (flat) => (
    <View key={flat.uuid}>
      <View style={listStyles.itemWrap}>
        <TouchableHighlight onPress={() => navigation.navigate('FlatScreen', {flat: flat})}>
          {flat.uuid in uris ?
            <Image
              style={listStyles.image}
              source={{
                uri: uris[flat.uuid]
              }}
            /> :
            <MaterialIcon name="house" size={100}/>
          }
        </TouchableHighlight>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
          <Text style={[listStyles.details, {fontFamily: 'SourceSansPro-Bold', fontSize: 16}]}>
            {flat.name}
          </Text>
          <Text style={listStyles.details}>
            <Text style={{fontWeight: 'bold'}}>Location:</Text> {flat.location}
          </Text>
        </View>
      </View>
      <HorizontalRule color={'#606060'} width={2}/>
    </View>
  )

  const getContent = () => (
    <View style={listStyles.wrap}>
      <Text style={listStyles.header}>Check out all the flats:</Text>
      <View style={listStyles.listWrap}>
        <View style={{flex: 1}}>
          {loading ?
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator color={TURQUOISE} size={50}/>
            </View> :
            flats.map(flat => getFlatView(flat))}
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

export default FlatsScreen;
