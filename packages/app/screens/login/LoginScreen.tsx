import { Button, H1, Input, Paragraph, YStack, Spinner } from '@my/ui';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useLink } from 'solito/link';
import { useRouter } from 'solito/router';

export default function LoginScreen() {
  const { push } = useRouter();
  const signUpLink = useLink({ href: '/sign-up' });

  const [email, setEmail] = useState('');
  const [displayEmailErrorMessage, setDisplayEmailErrorMessage] = useState(false);

  const [password, setPassword] = useState('');
  const [displayPasswordErrorMessage, setDisplayPasswordErrorMessage] = useState(false);

  const [loading, setLoading] = useState(false);

  const validate = () => {
    setLoading(true);
    setDisplayEmailErrorMessage(!email);
    setDisplayPasswordErrorMessage(!password);

    if (email && password) {
      setLoading(false);

      push('/home');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#222' }} behavior="padding">
      <YStack f={1} jc="center" ai="center" space="$12" theme="dark">
        <H1>Kham Tham</H1>

        <YStack w={300} space>
          <YStack>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#CD1D8D"
              placeholder="Email*"
              size="$4"
              borderWidth={2}
            />
            {displayEmailErrorMessage && <Paragraph ta="right">Please enter your email</Paragraph>}
          </YStack>

          <YStack>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#CD1D8D"
              placeholder="Password*"
              size="$4"
              borderWidth={2}
            />
            {displayPasswordErrorMessage && (
              <Paragraph ta="right">Please enter your password</Paragraph>
            )}
          </YStack>

          <YStack space>
            <Button onPress={() => validate()}>
              {loading ? <Spinner size="large" color="$green10" /> : <Paragraph>Sign In</Paragraph>}
            </Button>
            <Button backgroundColor="white" {...signUpLink}>
              Create New Account
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  );
}
