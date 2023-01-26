import { View, Text } from 'react-native';
import { appStyles } from '../styles/AppStyles';
import { DARK_BLUE, GREENISH_BLUE, TURQUOISE } from '../styles/Colors';
import { logInStyles } from '../styles/LogInStyles';
import HorizontalRule from './HorizontalRule';

function FloatingScreen(props) {
  return (
		<View style={appStyles.centerView}>
			<View style={logInStyles.logInView}>
				<Text style={logInStyles.title}>FLATLY</Text>
				<HorizontalRule color={DARK_BLUE} width={2}/>
				<Text style={logInStyles.subtitle}>
					Handling apartment bookings has never been that easy...
				</Text>
				<HorizontalRule color={DARK_BLUE} width={2}/>
				{props.content}
			</View>
		</View>
  )
}

export default FloatingScreen;
