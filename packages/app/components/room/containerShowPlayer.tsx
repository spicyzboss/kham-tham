import { Button, XStack, YStack } from '@my/ui';
import { useState } from 'react';
import { useLink } from 'solito/link';

export default function ContainerShowPlayer() {
  const [players, setPlayers] = useState([
    'wave',
    'bank',
    'ฉันจะกินไก่',
    'omg',
    'wavewave',
    'wavewave',
    'w',
  ]);

  // TODO: implement GameMode
  const mode = 'competitive';

  const renderLinkQuestion = () => {
    if (mode == 'competitive') return '/comp-question';
    if (mode == 'cooperative') return '/coop-question';
  };

  const likeQuestion = useLink({ href: `${renderLinkQuestion()}` });

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
      <Button {...likeQuestion}>เริ่มเล่น</Button>
    </YStack>
  );
}
