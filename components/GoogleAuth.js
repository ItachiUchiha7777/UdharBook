import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { firebase } from './firebaseConfig';
import { useEffect } from 'react';
import { View, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function GoogleAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '33946891705-05j79ep5flcuahv0e4otnsfictl5ruhv.apps.googleusercontent.com', // Your Web Client ID
    redirectUri: makeRedirectUri({
      native: 'com.yourapp:/oauthredirect',
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return (
    <View>
      <TextInput
          label="email"
          value={email}
          onChangeText={setDescription}
          style={[styles.input, styles.description, styles.rounded]}
          multiline
        />
      <Button title="Sign in with Google" disabled={!request} onPress={() => promptAsync()} />
    </View>
  );
}
