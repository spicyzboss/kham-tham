import { Button, YStack, Input, H1, Paragraph, Spinner } from '@my/ui';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'solito/router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KhamThamAPI from 'app/helpers/KhamThamAPI';

export default function EnterCodeRoomScreen({ navigation }) {
  const { push, back, replace } = useRouter();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState(1);
  const [showEnterCode, setShowEnterCode] = useState<boolean>(false);

  const checkPlayerToken = async () => {
    const token = await AsyncStorage.getItem('playerToken');
    if (token) {
      const player = await KhamThamAPI.getPlayer(token);
      if (player.status === 200) {
        return {
          data: JSON.parse(player.data),
          token,
        };
      }
    }
  };

  const createPlayer = async () => {
    if (name) {
      const request = await KhamThamAPI.createPlayer(name);
      if (request.status === 201) {
        AsyncStorage.setItem('playerToken', request.data);
      }
    }
  };

  const joinRoom = async () => {
    const result = await checkPlayerToken();
    if (result) {
      const request = await KhamThamAPI.joinRoom(code, result.token);
      console.log(request.data);
    }
  };

  useEffect(() => {
    checkPlayerToken().then((e) => {
      if (e) {
        setName(e.data.playername);
        setShowEnterCode(true);
      }
    });
  }, []);

  const enterRoom = () => {
    setLoading(true);
    joinRoom()
      .then(() => {
        push(`/room/${roomId}/waiting`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const confirmName = () => {
    createPlayer();
    setShowEnterCode(true);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'black' }} behavior="padding">
      <YStack f={1} jc="center" ai="center" space="$12" theme="dark">
        <H1>Kham Tham</H1>
        <YStack space w={300}>
          {name != '' && showEnterCode && <Paragraph>ชื่อของคุณคือ : {name}</Paragraph>}

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
            <Button onPress={confirmName}>Confirm Name</Button>
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
