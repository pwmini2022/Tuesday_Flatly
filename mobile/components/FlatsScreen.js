import { View, Text, Image, TouchableHighlight } from 'react-native';
import { listStyles } from '../styles/ListStyles';
import { useState, useEffect } from 'react';

import FLATS from "../data/flats.json"
import HorizontalRule from './HorizontalRule';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './HomeScreen';
import { getOffers } from './utils/apiCalls';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserToken } from '../recoil/recoil';

function FlatsScreen({ navigation }) {
  const iconSize = 30;
  const iconColor = '#383838';
  const maxFlats = 3;
  const maxPages = Math.ceil(FLATS.length / maxFlats);
  const [page, setPage] = useState(0);
  const token = useRecoilValue(getUserToken);
  const [loading, setLoading] = useState(true);
  const [flats, setFlats] = useState([]);

  const getFlatView = (flat) => (
    <View key={flat.id}>
      <View style={listStyles.itemWrap}>
        <TouchableHighlight onPress={() => navigation.navigate('FlatScreen', {flat: flat})}>
          <Image
            style={listStyles.image}
            source={{
              uri: flat.picture1,
            }}
          />
        </TouchableHighlight>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
          <Text style={[listStyles.details, {fontWeight: 'bold', fontSize: 16}]}>
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

  const getFlatsView = () => {
    const flatsInPage = [];

    for (const flat of flats.slice(maxFlats*page, maxFlats*(page+1))) {
      flatsInPage.push(getFlatView(flat));
    }
    
    return flatsInPage;
  }

  async function getFlats() {
    setLoading(true);
    setFlats(await getOffers(token))
    setLoading(false);;
  }

  useEffect(() => {
    getFlats();
  }, []);

  const getContent = () => (
    <View style={listStyles.wrap}>
      <Text style={listStyles.header}>Check out all the flats:</Text>
      <View style={listStyles.listWrap}>
        <View style={{flex: 1}}>
          {getFlatsView()}
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

  if (loading) {
    return <Text>Loading...</Text>
  }
  else {
    return <HomeScreen content={getContent()} navigation={navigation}/>
  }
}

export default FlatsScreen;
