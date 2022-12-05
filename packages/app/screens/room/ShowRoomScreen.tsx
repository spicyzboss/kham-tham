import { YStack, XGroup, Button } from '@my/ui';
import { useState, useEffect } from 'react';
import ContainerShowCode from 'app/components/room/ContainerShowCode';
import ContainerShowPlayer from 'app/components/room/ContainerShowPlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import useSWR from 'swr';
import LoadingSpinner from 'app/components/LoadingSpinner';

export default function ShowRoomScreen() {
  const { useParam } = createParam();
  const { replace } = useRouter();
  const [showCode, setShowCode] = useState<boolean>(true);
  const [token, setToken] = useState('');
  const [roomId] = useParam('roomId');

  const checkHasToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      replace(`/login`);
    } else {
      setToken(token);
    }
  };

  useEffect(() => {
    checkHasToken();
  }, []);

  const fetchRooms = (url: string) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => res.json());
  };

  if (!roomId) return <Button>error</Button>;

  const { data, error } = useSWR(
    token ? `http://192.168.0.100:3000/room/info/${roomId[0]}` : null,
    fetchRooms
  );

  if (error) return <Button>error</Button>;

  if (!data) return <LoadingSpinner />;

  return (
    <YStack f={1} backgroundColor={'#000'}>
      <YStack p="$3" space="$2" ai="center" mt="$6">
        <XGroup>
          <Button
            backgroundColor={showCode ? '$blue11Dark' : '$blue5Light'}
            color="black"
            onPress={() => setShowCode(true)}
          >
            Code ของห้อง
          </Button>
          <Button
            backgroundColor={!showCode ? '$blue11Dark' : '$blue5Light'}
            color="black"
            onPress={() => setShowCode(false)}
          >
            ผู้เล่นที่เข้าร่วมห้อง
          </Button>
        </XGroup>
        {showCode ? (
          <ContainerShowCode code={data.code} />
        ) : (
          <ContainerShowPlayer roomId={roomId[0] || ''} />
        )}
      </YStack>
    </YStack>
  );
}
