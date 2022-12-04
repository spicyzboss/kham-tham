import { Button, YStack, H4, Spinner } from '@my/ui';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WaitingRoomScreen({ navigation }) {
  const socket = io('ws://10.0.119.37:3000');
  const { useParam } = createParam();
  const { push } = useRouter();
  const [roomId] = useParam('roomId');

  socket.on('connect', async () => {
    const token = await AsyncStorage.getItem('playerToken');
    if (token) {
      const request = await fetch('http://10.0.119.37:3000/room/me', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const playerData = await request.json();

      socket.emit('joinroom', {
        id: playerData.id,
        playername: playerData.playername,
      });
    }

    socket.on('play', (data) => {
      push(`/room/${data.roomId}/question/1`);
    });
  });

  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space theme="dark">
      <Spinner size="small" color="white" />
      <H4>Waiting for host</H4>
    </YStack>
  );
}
