import { View, Text, Image } from 'react-native';
import { listStyles } from '../styles/ListStyles';

import FLATS from "../data/flats.json"
import HorizontalRule from './HorizontalRule';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';

function FlatsList() {
  const iconSize = 30;
  const iconColor = '#383838';
  const maxApartments = 3;
  const maxPages = 3;
  const [page, setPage] = useState(0);

  return (
    <View style={listStyles.wrap}>
      <Text style={listStyles.header}>Check out all the flats:</Text>
      <View style={listStyles.listWrap}>
        {FLATS.map(flat =>
          <View key={flat.id}>
          <View style={listStyles.itemWrap}>
            <Image
              style={listStyles.image}
              source={{
                uri: flat.picture1,
              }}
            />
            <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
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
        )}
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
}

export default FlatsList;
