import { useState } from 'react';
import { Text, ScrollView, TextInput } from 'react-native';
import { logInStyles } from '../styles/LogInStyles';
import { GREENISH_BLUE, TURQUOISE } from '../styles/Colors';
import FloatingScreen from './FloatingScreen';
import Button from './Button';

function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
	const [borderColorUsername, setBorderColorUsername] = useState("lightgray");
	const [borderColorEmail, setBorderColorEmail] = useState("lightgray");

  function onFocusUsername() {
		setBorderColorUsername(TURQUOISE);
		setBorderColorEmail("lightgray");
	}

	function onFocusEmail() {
		setBorderColorEmail(TURQUOISE);
		setBorderColorUsername("lightgray");
	}

  function confirm() {

  }

  const getContent = () => (
    <>
    <Text style={logInStyles.credentials}>Did you forget your password? No worries...</Text>
    <Text style={logInStyles.info}>
      We will send you a new one to your email address.
      You will be able to change it to another one in your Profile section.
    </Text>
    <ScrollView>
			<TextInput
				onChangeText={setUsername}
				value={username}
				placeholder="Username"
				onFocus={onFocusUsername}
				style={[logInStyles.field, {borderBottomColor: borderColorUsername}]}
			/>
			<TextInput
				onChangeText={setEmail}
				value={email}
				placeholder="Email"
				onFocus={onFocusEmail}
				style={[logInStyles.field, {borderBottomColor: borderColorEmail}]}
			/>
		</ScrollView>
		<Button text="CONFIRM" onPress={confirm} color={GREENISH_BLUE}/>
    </>
  )

  return <FloatingScreen content={getContent()}/>
}

export default ForgotPasswordScreen;
