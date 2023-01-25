import { useState } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { appStyles } from '../styles/AppStyles';
import { DARK_BLUE, GREENISH_BLUE, TURQUOISE } from '../styles/Colors';
import { logInStyles } from '../styles/LogInStyles';
import Button from './Button';
import HorizontalRule from './HorizontalRule';

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
	const [borderColorUsername, setBorderColorUsername] = useState("lightgray");
	const [borderColorPassword, setBorderColorPassword] = useState("lightgray");

	function logIn() {
		Keyboard.dismiss();

		/* TODO */
		if (username === 'user123' && password === 'password') {
			navigation.navigate('HomeScreen', {name: 'user123'})
		}
		else {
			setBorderColorUsername('red');
			setBorderColorPassword('red');
		}
	}

	function onFocusUsername() {
		setBorderColorUsername(TURQUOISE);
		setBorderColorPassword("lightgray");
	}

	function onFocusPassword() {
		setBorderColorPassword(TURQUOISE);
		setBorderColorUsername("lightgray");
	}

  return (
		<View style={appStyles.centerView}>
			<View style={logInStyles.logInView}>
				<Text style={logInStyles.title}>FLATLY</Text>
				<HorizontalRule color={DARK_BLUE} width={2}/>
				<Text style={logInStyles.subtitle}>
					Handling apartment bookings has never been that easy...
				</Text>
				<HorizontalRule color={DARK_BLUE} width={2}/>
				<Text style={logInStyles.credentials}>Enter your credentials:</Text>
				<ScrollView>
					<TextInput
						onChangeText={setUsername}
						value={username}
						placeholder="Username"
						onFocus={onFocusUsername}
						style={[logInStyles.field, {borderBottomColor: borderColorUsername}]}
					/>
					<TextInput
						onChangeText={setPassword}
						value={password}
						placeholder="Password"
						onFocus={onFocusPassword}
						secureTextEntry={true}
						style={[logInStyles.field, {borderBottomColor: borderColorPassword}]}
					/>
				</ScrollView>
				<Button text="LOG IN" onPress={logIn} color={GREENISH_BLUE}/>
			</View>
		</View>
  )
}

export default LogInScreen;
