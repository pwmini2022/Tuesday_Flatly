import { View, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { listStyles } from '../styles/ListStyles';
import { useState, useEffect } from 'react';

import HorizontalRule from './HorizontalRule';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './HomeScreen';
import { getNumOffers, getOfferImages, getOffers } from './utils/apiCalls';
import { useRecoilValue } from 'recoil';
import { getUserToken } from '../recoil/recoil';
import { TURQUOISE } from '../styles/Colors';

function FlatsScreen({ navigation }) {
  const iconSize = 30;
  const iconColor = '#383838';
  const maxFlats = 3;
  const [page, setPage] = useState(0);
  const token = useRecoilValue(getUserToken);
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [flats, setFlats] = useState([]);
  const [uri, setUri] = useState("");

  const toDataURL = async (url) => await fetch(url, {headers: {Authorization: 'Bearer '+token}})
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }))

  const getFlatView = (flat) => (
    <View key={flat.uuid}>
      <View style={listStyles.itemWrap}>
        <TouchableHighlight onPress={() => navigation.navigate('FlatScreen', {flat: flat})}>
          <Image
            style={listStyles.image}
            source={{
              uri: uri,
            }}
          />
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

  async function getFlats() {
    setLoading(true);
    console.log(page);

    await toDataURL('https://springserviceflatly-pw2022flatly.azuremicroservices.io/logic/api/offerImages/e0262e81-e4bf-44c8-9c08-b436f718a6d8')
    .then(dataUrl => setUri(dataUrl));

    //const images = getOfferImages(token, flat.u)

    const flats = await getOffers(token, page+1, maxFlats);
    setFlats(flats);
    
    const numOffers = await getNumOffers(token);
    setMaxPages(Math.ceil(numOffers/ maxFlats));
    setLoading(false);
  }

  useEffect(() => {
    getFlats();
  }, [page]);

  useEffect(() => {
    getContent();
  }, [page]);

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

export default FlatsScreen;
