import { useState } from 'react';
import { Text, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GREENISH_BLUE, TURQUOISE } from '../styles/Colors';
import { logInStyles } from '../styles/LogInStyles';
import Button from './Button';
import FloatingScreen from './FloatingScreen';

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
	const [borderColorUsername, setBorderColorUsername] = useState("lightgray");
	const [borderColorPassword, setBorderColorPassword] = useState("lightgray");

	function logIn() {
		Keyboard.dismiss();

		/* TODO */
		if (username === 'user123' && password === 'password') {
			navigation.navigate('FlatsScreen', {name: 'user123'})
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

	function toForgotPasswordScreen() {
		navigation.navigate('ForgotPasswordScreen');
	}

	const getContent = () => (
		<>
		<Text style={logInStyles.credentials}>Enter your credentials:</Text>
		<ScrollView>
			<TextInput
				onChangeText={setUsername}
				value={username}
				placeholder="Username / Email"
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
		<TouchableOpacity onPress={toForgotPasswordScreen} style={{marginTop: 15}}>
			<Text style={logInStyles.forgotPassword}>Forgot your password?</Text>
		</TouchableOpacity>
		</>
	)

  return (
		<FloatingScreen content={getContent()}/>
  )
}

export default LogInScreen;
