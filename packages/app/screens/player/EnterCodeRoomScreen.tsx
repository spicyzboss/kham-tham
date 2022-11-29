import { Button, YStack, Input, H1, Paragraph, Spinner } from '@my/ui';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'solito/router';

export default function EnterCodeRoomScreen({ navigation }) {
  const { push, back } = useRouter();
  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(false);

  const enterRoom = () => {
    setLoading(true);
    push('/room/1/waiting');
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'black' }} behavior="padding">
      <YStack f={1} jc="center" ai="center" space="$12" theme="dark">
        <H1>Kham Tham</H1>
        <YStack space w={300}>
          <Input
            placeholderTextColor="#CD1D8D"
            placeholder="Enter code here"
            onChangeText={setInput}
            size={'$5'}
            keyboardType="number-pad"
          />
          <Button onPress={enterRoom}>
            {loading ? <Spinner size="small" color="$green10" /> : <Paragraph>Join</Paragraph>}
          </Button>
          <Button theme="dark_white_Button" onPress={back}>
            Back
          </Button>
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  );
}
