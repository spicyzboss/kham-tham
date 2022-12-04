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
  const [displayNameErrorMessage, setdisplayNameErrorMessage] = useState<boolean>(false)
  const [displayCodedErrorMessage, setdisplayCodedErrorMessage] = useState<boolean>(false)

  const enterRoom = () => {
    if (!code) return setdisplayCodedErrorMessage(true)
    setdisplayCodedErrorMessage(false)
    setLoading(true);
    push(`/room/${roomId}/waiting`);
    setLoading(false);
  };

  const confirmName = () => {
    if (!name) return setdisplayNameErrorMessage(true)
    setdisplayNameErrorMessage(false)
    setShowEnterCode(true)
  }

  const backToInputName = () => {
    setShowEnterCode(false)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'black' }} behavior="padding">
      <YStack f={1} jc="center" ai="center" space="$12" theme="dark">
        <H1>Kham Tham</H1>
        <YStack space w={300}>

          {(name != "" && showEnterCode) && <Paragraph>ชื่อของคุณคือ : {name}</Paragraph>}

          {!showEnterCode ? (
            <>
              <Input
                placeholderTextColor="#CD1D8D"
                placeholder="Enter Name here"
                onChangeText={setName}
                size={'$5'}
              />
              {displayNameErrorMessage && (
                <Paragraph ta="right" theme="error_Text">Please enter your name</Paragraph>
              )}
            </>

          ) : (
            <>
              <Input
                placeholderTextColor="#CD1D8D"
                placeholder="Enter code here"
                onChangeText={setCode}
                size={'$5'}
                keyboardType="number-pad"
              />
              {displayCodedErrorMessage && (
                <Paragraph ta="right" theme="error_Text">Please enter your code</Paragraph>
              )}
            </>
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
          {!showEnterCode ? (
            <Button theme="dark_white_Button" onPress={back}>
              Back To Menu
            </Button>
          ) : (
            <Button theme="dark_white_Button" onPress={backToInputName}>
              Back To Enter Name
            </Button>
          )}
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  );
}
