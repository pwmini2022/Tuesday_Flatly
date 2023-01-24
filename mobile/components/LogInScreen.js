import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { appStyles } from '../styles/AppStyles';
import { logInStyles } from '../styles/LogInStyles';
import HorizontalRule from './HorizontalRule';

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
		<View style={appStyles.centerView}>
			<View style={logInStyles.logInView}>
				<Text style={logInStyles.title}>FLATLY</Text>
				<HorizontalRule/>
				<Text>
					Handling apartment bookings has never been that easy...
				</Text>
				<HorizontalRule/>
				<TextInput
					onChangeText={setUsername}
					value={username}
					placeholder="Username"
				/>
				<TextInput
					onChangeText={setPassword}
					value={password}
					placeholder="Password"
				/>
			</View>
		</View>
  )
}

export default LogInScreen;
