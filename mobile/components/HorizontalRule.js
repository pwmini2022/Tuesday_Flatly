import { View } from 'react-native';

function HorizontalRule(props) {
  return (
    <View
      style={{
        borderBottomColor: props.color,
        borderBottomWidth: props.width,
        marginTop: 15,
        marginBottom: 15,
      }}
    />
  )
}

export default HorizontalRule;
