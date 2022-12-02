import { Button, YStack, Input, H1, Paragraph, Spinner } from '@my/ui';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'solito/router';

export default function EnterCodeRoomScreen({ navigation }) {
  const { push, back } = useRouter();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState(1)
  const [showEnterCode, setShowEnterCode] = useState<boolean>(false)

  const enterRoom = () => {
    setLoading(true);
    push(`/room/${roomId}/waiting`);
    setLoading(false);
  };

  const confirmName = () => {
    setShowEnterCode(true)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'black' }} behavior="padding">
      <YStack f={1} jc="center" ai="center" space="$12" theme="dark">
        <H1>Kham Tham</H1>
        <YStack space w={300}>

          {(name != "" && showEnterCode) && <Paragraph>ชื่อของคุณคือ : {name}</Paragraph>}

          {!showEnterCode ? (
            <Input
              placeholderTextColor="#CD1D8D"
              placeholder="Enter Name here"
              onChangeText={setName}
              size={'$5'}
            />
          ) : (
            <Input
              placeholderTextColor="#CD1D8D"
              placeholder="Enter code here"
              onChangeText={setCode}
              size={'$5'}
              keyboardType="number-pad"
            />
          )}
          {!showEnterCode ? (
            <Button onPress={confirmName}>
              Confirm Name
            </Button>
          ) : (
            <Button onPress={enterRoom}>
              {loading ? <Spinner size="small" color="$green10" /> : <Paragraph>Join</Paragraph>}
            </Button>
          )}
          <Button theme="dark_white_Button" onPress={back}>
            Back
          </Button>
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  );
}
