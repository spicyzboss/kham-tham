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

  const [email, setEmail] = useState('');
  const [displayEmailErrorMessage, setDisplayEmailErrorMessage] = useState(false);

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
    const data = await KhamThamAPI.login({
      username: email,
      password,
    });

    return data.data as string;
  };

  const validate = () => {
    setDisplayEmailErrorMessage(!email);
    setDisplayPasswordErrorMessage(!password);

    if (email && password) {
      setLoading(true);
      loginHandler()
        .then((e: string) => {
          if (e) {
            AsyncStorage.setItem('userToken', e).then(() => {
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
              <Paragraph>Email</Paragraph>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#CD1D8D"
                placeholder="Please enter your email"
                size="$4"
                borderWidth={2}
              />
              {displayEmailErrorMessage && (
                <Paragraph ta="right">Please enter your email</Paragraph>
              )}
            </YStack>
            <YStack>
              <Paragraph>Password</Paragraph>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#CD1D8D"
                placeholder="Please enter your password"
                size="$4"
                borderWidth={2}
              />
              {displayPasswordErrorMessage && (
                <Paragraph ta="right">Please enter your password</Paragraph>
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
