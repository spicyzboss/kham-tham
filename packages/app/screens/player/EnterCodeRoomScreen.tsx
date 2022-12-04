import { Button, YStack, Input, H1, Paragraph, Spinner } from '@my/ui';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'solito/router';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import KhamThamAPI from 'app/helpers/KhamThamAPI';

export default function EnterCodeRoomScreen() {
  const { push, back } = useRouter();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState(1)
  const [showEnterCode, setShowEnterCode] = useState<boolean>(false)
  const [displayNameErrorMessage, setdisplayNameErrorMessage] = useState<boolean>(false)
  const [displayCodedErrorMessage, setdisplayCodedErrorMessage] = useState<boolean>(false)

  const checkPlayerToken = async () => {
    const token = await AsyncStorage.getItem('playerToken');
    if (token) {
      const player = await fetch('http://10.0.119.37:3000/room/me', {
        method: 'GET',
        headers: {
          Authorization: token,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      const data = await player.json();
      return {
        data: data,
        token,
      };
    }
  };

  const createPlayer = async () => {
    if (name) {
      const request = await fetch('http://10.0.119.37:3000/room/create/player', {
        method: 'POST',
        body: JSON.stringify({
          playername: name,
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      const data = await request.text();

      if (data) {
        AsyncStorage.setItem('playerToken', data);
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const joinRoom = async () => {
    const result = await checkPlayerToken();
    if (result) {
      const request = await fetch(`http://10.0.119.37:3000/room/join/${code}`, {
        method: 'POST',
        headers: {
          Authorization: result.token,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await request.json();
      return data ?? null;
    } else {
      return null;
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
    if (!code) return setdisplayCodedErrorMessage(true)
    setdisplayCodedErrorMessage(false)
    setLoading(true);
    joinRoom()
      .then((e) => {
        if (e) {
          push(`/room/${e.roomId}/waiting`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const confirmName = () => {
    if (!name) return setdisplayNameErrorMessage(true)
    setdisplayNameErrorMessage(false)
    setShowEnterCode(true)
  }
  setLoading(true);
  createPlayer()
    .then((e) => {
      if (e) {
        setShowEnterCode(true);
      }
    })
    .finally(() => {
      setLoading(false);
    });

  const backToInputName = () => {
    // setShowEnterCode(false)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'black' }} behavior="padding">
      <YStack f={1} jc="center" ai="center" space="$12" theme="dark">
        <H1>Kham Tham</H1>
        <YStack space w={300}>
          {name != '' && showEnterCode && <Paragraph>ชื่อของคุณคือ : {name}</Paragraph>}

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
              {loading ? (
                <Spinner size="small" color="$green10" />
              ) : (
                <Paragraph>Confirm Name</Paragraph>
              )}
            </Button>
          ) : (
            <Button onPress={enterRoom}>
              {loading ? <Spinner size="small" color="$green10" /> : <Paragraph>Join</Paragraph>}
            </Button>
          )}
          {
            !showEnterCode ? (
              <Button theme="dark_white_Button" onPress={back}>
                Back To Menu
              </Button>
            ) : (
              <Button theme="dark_white_Button" onPress={backToInputName}>
                Back To Enter Name
              </Button>
            )
          }
        </YStack >
      </YStack >
    </KeyboardAvoidingView >
  );
}
