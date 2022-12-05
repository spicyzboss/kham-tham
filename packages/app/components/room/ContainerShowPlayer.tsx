import { Button, XStack, YStack, H3, Paragraph, Spinner } from '@my/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'solito/router';

export default function ContainerShowPlayer({ roomId }: { roomId: string }) {
  const socket = io('ws://192.168.0.100:3000');
  const { push, replace } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState('');
  const [player, setPlayer] = useState<any[]>([]);
  const sortByLength = (a, b) => {
    return a.length - b.length;
  };

  const filterPlayers = player.sort(sortByLength);
  socket.on('join', (e) => {
    console.log(e);
    setPlayer([...player, e.playername]);
  });

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

  const changeRoomStatusHandler = async () => {
    try {
      if (!roomId) return null;
      const data = await fetch(`http://192.168.0.100:3000/room/${roomId}/play`, {
        method: 'PUT',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({}),
      });
      const d = await data.json();

      return d;
    } catch (e) {
      return null;
    }
  };

  const playTheRoom = () => {
    setLoading(true);

    changeRoomStatusHandler()
      .then((e) => {
        if (e) {
          socket.emit('playroom', {
            roomId,
            name: e.name,
            mode: e.mode,
          });
          push(`/room/${roomId}/question/1`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <YStack space="$3">
      <XStack flexWrap="wrap">
        {filterPlayers.map((playerName, index) => (
          <Button color="black" key={index}>
            {playerName}
          </Button>
        ))}
        {filterPlayers.length == 0 && <H3 m="$4">ไม่มีผู้เล่นในห้องนี้</H3>}
      </XStack>
      <Button onPress={playTheRoom} theme="dark_Button">
        {!loading ? <Paragraph>เริ่มเล่น</Paragraph> : <Spinner size="small" color="white" />}
      </Button>
    </YStack>
  );
}
