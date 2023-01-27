import { View, Text, TextInput, ScrollView, Keyboard } from 'react-native';
import { useRecoilValue } from 'recoil';
import HomeScreen from "./HomeScreen";
import { getUsername, getEmail } from '../recoil/recoil';
import { profileStyles } from '../styles/ProfileStyles';
import { logInStyles } from '../styles/LogInStyles';
import Button from './Button';
import { useState } from 'react';
import { GREENISH_BLUE, TURQUOISE } from '../styles/Colors';

function ProfileScreen({ navigation }) {
  const username = useRecoilValue(getUsername);
  const email = useRecoilValue(getEmail);
  const [changePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [borderColorNewPassword, setBorderColorNewPassword] = useState("lightgray");
	const [borderColorRepeatNewPassword, setBorderColorRepeatNewPassword] = useState("lightgray");

  function saveNewPassword() {
    Keyboard.dismiss();

    // TODO: change password
    if (newPassword !== repeatNewPassword) {
      setBorderColorNewPassword('red');
      setBorderColorRepeatNewPassword('red');
    }
    else {
      setChangePassword(false);
      setNewPassword("");
      setRepeatNewPassword("")
    }
  }

  function onFocusNewPassword() {
		setBorderColorNewPassword(TURQUOISE);
		setBorderColorRepeatNewPassword("lightgray");
	}

	function onFocusRepeatNewPassword() {
		setBorderColorRepeatNewPassword(TURQUOISE);
		setBorderColorNewPassword("lightgray");
	}

  const getContent = () => (
    <View style={profileStyles.wrap}>
      <Text style={profileStyles.header}>My profile</Text>
      <View style={profileStyles.fieldsWrap}>
        <Text style={profileStyles.fieldTitle}>Username:</Text>
        <Text style={profileStyles.field}>{username}</Text>
        <Text style={[profileStyles.fieldTitle, {marginTop: 20}]}>Email address:</Text>
        <Text style={profileStyles.field}>{email}</Text>
      </View>
      {changePassword ?
        <View style={{height: 150, width: '100%', alignItems: 'center'}}>
          <ScrollView style={{width: '60%'}}>
            <TextInput
              onChangeText={setNewPassword}
              value={newPassword}
              placeholder="New password"
              onFocus={onFocusNewPassword}
              style={[logInStyles.field, {borderBottomColor: borderColorNewPassword}]}
            />
            <TextInput
              onChangeText={setRepeatNewPassword}
              value={repeatNewPassword}
              placeholder="Repeat password"
              onFocus={onFocusRepeatNewPassword}
              style={[logInStyles.field, {borderBottomColor: borderColorRepeatNewPassword}]}
            />
          </ScrollView>
          <Button text='Save' color={TURQUOISE} onPress={saveNewPassword}/>
        </View> :
        <Button text='Change password' color={GREENISH_BLUE} onPress={() => setChangePassword(true)}/>}
    </View>
  )

  return (
    <HomeScreen content={getContent()} navigation={navigation}/>
  )
}

export default ProfileScreen;
