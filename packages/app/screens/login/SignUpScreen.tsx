import { Button, H1, Input, Paragraph, YStack, Sheet, Spinner } from '@my/ui';
import React, { useState } from 'react';
import { useLink } from 'solito/link';
import globalStyles from '../../../assets/global_style';

import { ConfirmOTP } from 'app/components/login';
import { Alert, KeyboardAvoidingView, Modal, StyleSheet } from 'react-native';

export default function SignUpScreen() {
  const Login = useLink({ href: '/login' });

  const [openOTP, setOpenOTP] = useState(false);

  // TODO: implement error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [OTP, setOTP] = useState('');

  const [loading, setLoading] = useState(false);

  const createAccountHandler = () => {
    setLoading(true);
    setOpenOTP(true);
  };

  const confirmOTP = () => {
    setOpenOTP(false);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <YStack backgroundColor="#222" f={1} jc="center" ai="center" theme="dark" space="$12">
        <H1>Kham Tham</H1>
        <YStack w={300} space="$6">
          <YStack space>
            <YStack>
              <Paragraph ta="left">Email</Paragraph>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#CD1D8D"
                placeholder="Please enter your email"
                size="$4"
                borderWidth={2}
              />
            </YStack>
            <YStack>
              <Paragraph ta="left">Password</Paragraph>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#CD1D8D"
                placeholder="Please enter your password"
                size="$4"
                borderWidth={2}
              />
            </YStack>
            <YStack>
              <Paragraph ta="left">Confirm Password</Paragraph>
              <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                size="$4"
                placeholderTextColor="#CD1D8D"
                placeholder="Repeat your password"
                borderWidth={2}
              />
            </YStack>
          </YStack>
          <Button onPress={createAccountHandler}>
            {loading ? (
              <Spinner size="small" color="#CD1D8D" />
            ) : (
              <Paragraph>Create Account</Paragraph>
            )}
          </Button>
          {/* <ConfirmOTP /> */}
        </YStack>
        <Sheet
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
        </Sheet>
      </YStack>
    </KeyboardAvoidingView>
  );
}
