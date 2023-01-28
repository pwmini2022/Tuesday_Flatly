import { useState } from 'react';
import { Text, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GREENISH_BLUE, TURQUOISE } from '../styles/Colors';
import { logInStyles } from '../styles/LogInStyles';
import Button from './Button';
import FloatingScreen from './FloatingScreen';
import { useRecoilState } from 'recoil';
import { user } from '../recoil/recoil';
import { login, OK } from './utils/apiCalls';

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
	const [borderColorUsername, setBorderColorUsername] = useState("lightgray");
	const [borderColorPassword, setBorderColorPassword] = useState("lightgray");
	const setLoggedInUser = useRecoilState(user)[1];

	async function checkCredentials() {
		Keyboard.dismiss();

		try {
			const response = await login(username, password);
			console.log(response);
			const user = {
				username: username,
				password: password,
				token: response.jwttoken
			}
			setLoggedInUser(user);
			navigation.navigate('FlatsScreen');
		}
		catch {
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
		<Button text="LOG IN" onPress={checkCredentials} color={GREENISH_BLUE}/>
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
