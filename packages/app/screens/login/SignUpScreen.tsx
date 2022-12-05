import { Button, H1, Input, Paragraph, YStack, Sheet, Spinner } from '@my/ui';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'solito/router';

export default function SignUpScreen() {
  const { push, replace } = useRouter();
  const isFocused = useIsFocused();
  const [openOTP, setOpenOTP] = useState(false);

  // TODO: implement error message
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [displayUsernameErrorMessage, setdisplayUsernameErrorMessage] = useState<boolean>(false);
  const [displayEmailErrorMessage, setdisplayEmailErrorMessage] = useState<boolean>(false);
  const [displayPasswordErrorMessage, setdisplayPasswordErrorMessage] = useState<boolean>(false);
  const [displayConfirmPasswordErrorMessage, setdisplayConfirmPasswordErrorMessage] =
    useState<boolean>(false);
  const [displayNotMatchPassword, setdisplayNotMatchPassword] = useState<boolean>(false);

  const [OTP, setOTP] = useState('');

  const [loading, setLoading] = useState(false);

  const checkHasToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      return replace('/room/user');
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkHasToken();
    }
  }, [isFocused]);

  const createAccountHandler = async (url: string) => {
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });

    return data.text();
  };

  const createAccount = async () => {
    setdisplayUsernameErrorMessage(!username);
    setdisplayEmailErrorMessage(!email);
    setdisplayPasswordErrorMessage(!password);
    setdisplayConfirmPasswordErrorMessage(!confirmPassword);
    setdisplayNotMatchPassword(password != confirmPassword);

    setLoading(true);
    if (username && email && password && confirmPassword) {
      console.log('create account');
      createAccountHandler(`http://10.0.119.37:3000/user/create`)
        .then(async (result) => {
          if (result) {
            await AsyncStorage.setItem('userToken', result);
            push('/room/user');
          }
        })
        .finally(() => setLoading(false));
    }
  };

  // const confirmOTP = () => {
  //   setOpenOTP(false);
  //   setLoading(false);
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <YStack backgroundColor="#222" f={1} jc="center" ai="center" theme="dark" space="$12">
          <H1>Kham Tham</H1>
          <YStack w={300} space="$6">
            <YStack space>
              <YStack>
                <Paragraph ta="left">Username</Paragraph>
                <Input
                  value={username}
                  onChangeText={setUsername}
                  placeholderTextColor="#CD1D8D"
                  placeholder="Enter your username"
                  size="$4"
                  borderWidth={2}
                />
                {displayUsernameErrorMessage && (
                  <Paragraph ta="right" theme="error_Text">
                    Please enter your username
                  </Paragraph>
                )}
              </YStack>
              <YStack>
                <Paragraph ta="left">Email</Paragraph>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#CD1D8D"
                  placeholder="Enter your email"
                  size="$4"
                  borderWidth={2}
                />
                {displayEmailErrorMessage && (
                  <Paragraph ta="right" theme="error_Text">
                    Please enter your email
                  </Paragraph>
                )}
              </YStack>
              <YStack>
                <Paragraph ta="left">Password</Paragraph>
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
                  <Paragraph ta="right" theme="error_Text">
                    Please enter your password
                  </Paragraph>
                )}
              </YStack>
              <YStack>
                <Paragraph ta="left">Confirm Password</Paragraph>
                <Input
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  size="$4"
                  placeholderTextColor="#CD1D8D"
                  secureTextEntry={true}
                  placeholder="Repeat your password"
                  borderWidth={2}
                />
                {displayConfirmPasswordErrorMessage && (
                  <Paragraph ta="right" theme="error_Text">
                    Please enter your confirm password
                  </Paragraph>
                )}
                {displayNotMatchPassword && (
                  <Paragraph ta="right" theme="error_Text">
                    Your confirm password is not match
                  </Paragraph>
                )}
              </YStack>
            </YStack>
            <Button onPress={createAccount}>
              {loading ? (
                <Spinner size="small" color="white" />
              ) : (
                <Paragraph>Create Account</Paragraph>
              )}
            </Button>
            {/* <ConfirmOTP /> */}
          </YStack>
          {/* <Sheet
            modal
            open={openOTP}
            onOpenChange={setOpenOTP}
            snapPoints={[100]}
            dismissOnOverlayPress={false}
            disableDrag
          >
            <Sheet.Overlay />
            <Sheet.Frame ai="center" jc="center">
              <Sheet.Handle />
              <YStack w={300} space>
                <YStack>
                  <Paragraph>OTP</Paragraph>
                  <Input
                    value={OTP}
                    onChangeText={setOTP}
                    placeholderTextColor="#CD1D8D"
                    placeholder="Please enter OTP"
                    size="$6"
                    borderWidth={2}
                  />
                </YStack>
                <Button onPress={confirmOTP}>Confirm</Button>
              </YStack>
            </Sheet.Frame>
          </Sheet> */}
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
