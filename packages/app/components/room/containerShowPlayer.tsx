import { Button, XStack, YStack } from '@my/ui';
import { useState } from 'react';
import { useRouter } from 'solito/router';

export default function ContainerShowPlayer() {

  const { push } = useRouter()

  const roomId = 3
  const order = 0

  const [players, setPlayers] = useState([
    'wave',
    'bank',
    'ฉันจะกินไก่',
    'omg',
    'wavewave',
    'wavewave',
    'w',
  ]);

  const startRoomQuestion = () => {

    push(`/room/${roomId}/question/${order}`)
  }


  const sortByLength = (a, b) => {
    return a.length - b.length;
  };

  const filterPlayers = players.sort(sortByLength);

  return (
    <YStack space="$3">
      <XStack flexWrap="wrap">
        {filterPlayers.map((playerName, index) => (
          <Button key={index}>{playerName}</Button>
        ))}
      </XStack>
      <Button onPress={startRoomQuestion} theme="dark_Button">เริ่มเล่น</Button>
    </YStack>
  );
}
