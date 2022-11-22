import { Button, H1, Input, Paragraph, YStack, Image, Dialog } from '@my/ui';
import React, { useState } from 'react';
import { useLink } from 'solito/link';
import globalStyles from '../../../assets/global_style';

import { ConfirmOTP } from 'app/components/login';
import { Alert, Modal, StyleSheet } from 'react-native';

export default function SignUpScreen() {
  const Login = useLink({ href: '/login' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
      <H1 ta="center" color="#FFFCFC">
        Kham Tham
      </H1>
      <YStack>
        <Paragraph color="#CD1D8D" ta="left">
          Email
        </Paragraph>
        <Input
          value={email}
          onChangeText={setEmail}
          w={245}
          color="#FFFCFC"
          size="$4"
          borderWidth={2}
        />
      </YStack>

      <YStack>
        <Paragraph color="#CD1D8D" ta="left">
          Password
        </Paragraph>
        <Input
          value={password}
          onChangeText={setPassword}
          w={245}
          color="#FFFCFC"
          size="$4"
          borderWidth={2}
        />
      </YStack>

      <YStack>
        <Paragraph color="#CD1D8D" ta="left">
          Confirm Password
        </Paragraph>
        <Input
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          w={245}
          color="#FFFCFC"
          size="$4"
          borderWidth={2}
        />
      </YStack>

      <YStack>
        <Paragraph color="#CD1D8D" ta="left">
          Tel
        </Paragraph>
        <Input
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          w={245}
          color="#FFFCFC"
          size="$4"
          borderWidth={2}
        />
      </YStack>
      <ConfirmOTP />
    </YStack>
  );
}
