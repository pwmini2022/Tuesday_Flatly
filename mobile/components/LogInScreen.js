import { useState } from 'react';
import { Text, TextInput, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GREENISH_BLUE, TURQUOISE } from '../styles/Colors';
import { logInStyles } from '../styles/LogInStyles';
import Button from './Button';
import FloatingScreen from './FloatingScreen';
import { useRecoilState } from 'recoil';
import { user } from '../recoil/recoil';
import { login } from './utils/apiCalls';

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
	const [borderColorUsername, setBorderColorUsername] = useState("lightgray");
	const [borderColorPassword, setBorderColorPassword] = useState("lightgray");
	const setLoggedInUser = useRecoilState(user)[1];
	const [loading, setLoading] = useState(false);

	async function checkCredentials() {
		setLoading(true);
		Keyboard.dismiss();

		try {
			const response = await login(username, password);
			setLoggedInUser({
				id: response.id,
				username: username,
				email: response.email,
				token: response.jwttoken
			});
			setUsername("");
			setPassword("");
			setBorderColorUsername("lightgray");
			setBorderColorPassword("lightgray");
			navigation.navigate('ProfileScreen');
		}
		catch {
			setBorderColorUsername('red');
			setBorderColorPassword('red');
		}
		setLoading(false);
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
		<Button loading={loading} text="LOG IN" color={GREENISH_BLUE} onPress={checkCredentials}/>
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
