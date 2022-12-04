import { Button, XStack, YStack, H3, Paragraph, Spinner } from '@my/ui';
import { Player } from '@prisma/client';

interface PlayerJoinRoom {
  player: Player[],
  playTheRoom: () => void,
  loading: boolean
}

export default function ContainerShowPlayer({ player, playTheRoom, loading }: PlayerJoinRoom) {

  const sortByLength = (a, b) => {
    return a.length - b.length;
  };

  const filterPlayers = player.sort(sortByLength);

  return (
    <YStack space="$3">
      <XStack flexWrap="wrap">
        {filterPlayers.map((playerName, index) => (
          <Button color="black" key={index}>{playerName}</Button>
        ))}
        {filterPlayers.length == 0 && <H3 m="$4">ไม่มีผู้เล่นในห้องนี้</H3>}
      </XStack>
      <Button onPress={playTheRoom} theme="dark_Button">
        {!loading ? (
          <Paragraph>
            เริ่มเล่น
          </Paragraph>
        ) : (
          <Spinner size="small" color="white" />
        )}
      </Button>
    </YStack>
  );
}