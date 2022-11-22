import { Button, H1, Input, Paragraph, YStack } from '@my/ui';
import React, { useState } from 'react';
import { useLink } from 'solito/link';

export default function LoginScreen({ navigation }) {
  const Login = useLink({ href: '/' });
  const SignUp = useLink({ href: '/signUp' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    if (email && password) navigation.navigate('user-room');
  };

  return (
    <YStack backgroundColor="black" f={1} jc="center">
      <YStack ai="center" space>
        <H1 ta="center">Kham Tham</H1>
        <YStack>
          <Input
            value={email}
            onChangeText={setEmail}
            w={245}
            placeholderTextColor="#CD1D8D"
            placeholder="email"
            size="$4"
            borderWidth={2}
          />
          {!email && <Paragraph ta="right">please enter email</Paragraph>}
        </YStack>

        <YStack>
          <Input
            value={password}
            onChangeText={setPassword}
            w={245}
            placeholderTextColor="#CD1D8D"
            placeholder="password"
            size="$4"
            borderWidth={2}
          />
          {!password && <Paragraph ta="right">please enter password</Paragraph>}
        </YStack>

        <Button w={245} onPress={() => validate()}>
          Sign In
        </Button>
        <YStack w={245} ai="flex-end">
          <Paragraph color={'$gray10Light'} {...SignUp}>
            Sign Up
          </Paragraph>
        </YStack>
      </YStack>
    </YStack>
  );
}
