import { Button, H1, Input, Paragraph, YStack, Sheet, Spinner } from '@my/ui';
import { useState } from 'react';
import { useLink } from 'solito/link';
import { SafeAreaView } from 'react-native';

import { ConfirmOTP } from 'app/components/login';
import KhamThamAPI from 'app/helpers/KhamThamAPI';
import { KeyboardAvoidingView, Modal, StyleSheet } from 'react-native';
import axios from 'axios';

export default function SignUpScreen() {

  const [openOTP, setOpenOTP] = useState(false);

  // TODO: implement error message
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [displayUsernameErrorMessage, setdisplayUsernameErrorMessage] = useState<boolean>(false)
  const [displayEmailErrorMessage, setdisplayEmailErrorMessage] = useState<boolean>(false)
  const [displayPasswordErrorMessage, setdisplayPasswordErrorMessage] = useState<boolean>(false)
  const [displayConfirmPasswordErrorMessage, setdisplayConfirmPasswordErrorMessage] = useState<boolean>(false)
  const [displayNotMatchPassword, setdisplayNotMatchPassword] = useState<boolean>(false)

  const [OTP, setOTP] = useState('');

  const [loading, setLoading] = useState(false);

  const createAccountHandler = async () => {
    const data = await KhamThamAPI.createUser({
      username,
      email,
      password,
    });

  };

  const createAccount = () => {
    setdisplayUsernameErrorMessage(!username)
    setdisplayEmailErrorMessage(!email)
    setdisplayPasswordErrorMessage(!password)
    setdisplayConfirmPasswordErrorMessage(!confirmPassword)
    setdisplayNotMatchPassword(password != confirmPassword)

    // setLoading(true)
    // createAccountHandler().then((result: string) => {
    //   console.log(result)
    //   if (result) {

    //   }
    // }).finally(() => setLoading(false)).catch(e => console.log(e))
  }

  const confirmOTP = () => {
    setOpenOTP(false);
    setLoading(false);
  };

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
                  <Paragraph ta="right" theme="error_Text">Please enter your username</Paragraph>
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
                  <Paragraph ta="right" theme="error_Text">Please enter your email</Paragraph>
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
                  <Paragraph ta="right" theme="error_Text">Please enter your password</Paragraph>
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
                  <Paragraph ta="right" theme="error_Text">Please enter your confirm password</Paragraph>
                )}
                {displayNotMatchPassword && (
                  <Paragraph ta="right" theme="error_Text">Your confirm password is not match</Paragraph>
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
