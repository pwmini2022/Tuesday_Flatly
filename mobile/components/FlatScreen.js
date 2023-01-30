import HomeScreen from './HomeScreen';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { flatStyles } from '../styles/FlatStyles';
import { GREENISH_BLUE, TURQUOISE } from '../styles/Colors';
import HorizontalRule from './HorizontalRule';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getUserToken } from '../recoil/recoil';
import { getOfferImages, getOfferImageBase64 } from './utils/apiCalls';

function FlatScreen({ route, navigation }) {
  const {flat} = route.params;
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const token = useRecoilValue(getUserToken);

  const getImages = async() => {
    setLoading(true);

    let imagesBase64 = [];
    const imagesDetails = await getOfferImages(token, flat.uuid);
    for (const image of imagesDetails) {
      imagesBase64.push(await getOfferImageBase64(token, image.offerImageUuid));
    }
    setImages(imagesBase64);

    setLoading(false);
  }

  useEffect(() => {
    getImages();
  }, []);
  
  const getContent = () => (
    <ScrollView>
      <Text style={flatStyles.name}>{flat.name}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {loading ? 
          <ActivityIndicator color={TURQUOISE} size={50}/> :
          <>
            <Image
            style={{width: 170, height: 210}}
            source={{
              uri: images.length ? images[0] : "-",
            }}
          />
          <View>
            <Image
              style={flatStyles.image}
              source={{
                uri: images.length > 0 ? images[1] : "-",
              }}
            />
            <Image
              style={flatStyles.image}
              source={{
                uri: images.length > 1 ? images[2] : "-",
              }}
            />
          </View>
          </>
        }
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