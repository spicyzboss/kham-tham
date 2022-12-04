import { Button, H1, Input, Paragraph, YStack, Spinner } from '@my/ui';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'solito/router';
import KhamThamAPI from 'app/helpers/KhamThamAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const { push, replace } = useRouter();
  const signUp = () => {
    push('/sign-up');
  };

  const [username, setUsername] = useState('');
  const [displayUsernameErrorMessage, setDisplayUsernameErrorMessage] = useState(false);

  const [password, setPassword] = useState('');
  const [displayPasswordErrorMessage, setDisplayPasswordErrorMessage] = useState(false);

  const [loading, setLoading] = useState(false);

  const checkHasToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      replace(`/room/user`);
    }
  };

  useEffect(() => {
    checkHasToken();
  }, []);

  const loginHandler = async () => {
    try {
      const data = await fetch('http://10.0.119.37:3000/user/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      const d = await data.text();

      return d;
    } catch (e) {
      return '';
    }
  };

  const validate = () => {
    setDisplayUsernameErrorMessage(!username);
    setDisplayPasswordErrorMessage(!password);

    if (username && password) {
      setLoading(true);
      loginHandler()
        .then((token: string) => {
          if (token) {
            AsyncStorage.setItem('userToken', token).then(() => {
              checkHasToken();
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'black' }} behavior="padding">
      <YStack f={1} jc="center" ai="center" space="$12" theme="dark">
        <H1>Kham Tham</H1>

        <YStack w={300} space="$8">
          <YStack space>
            <YStack>
              <Paragraph>Username</Paragraph>
              <Input
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#CD1D8D"
                placeholder="Enter your username"
                size="$4"
                borderWidth={2}
              />
              {displayUsernameErrorMessage && (
                <Paragraph ta="right" theme="error_Text">Please enter your username</Paragraph>
              )}
            </YStack>
            <YStack>
              <Paragraph>Password</Paragraph>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#CD1D8D"
                placeholder="Enter your password"
                secureTextEntry={true}
                size="$4"
                borderWidth={2}
              />
              {displayPasswordErrorMessage && (
                <Paragraph ta="right" theme="error_Text">Please enter your password</Paragraph>
              )}
            </YStack>
          </YStack>

          <YStack space>
            <Button onPress={() => validate()}>
              {loading ? <Spinner size="small" color="#CD1D8D" /> : <Paragraph>Sign In</Paragraph>}
            </Button>
            <Button theme="dark_white_Button" onPress={signUp}>
              Create New Account
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  );
}
