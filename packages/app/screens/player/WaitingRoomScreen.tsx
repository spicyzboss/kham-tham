import { Button, YStack, H4, Spinner } from '@my/ui';
import { useRouter } from 'solito/router';

export default function WaitingRoomScreen({ navigation }) {
  const { back, push } = useRouter();

  const testHostConfirm = () => {
    const roomId = 3
    const order = 1
    push(`/room/${roomId}/question/${order}`)
  }

  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space theme="dark">
      <Spinner size="small" color="white" />
      <H4>Waiting for host</H4>
      <Button onPress={back}>Back</Button>
      <Button onPress={testHostConfirm}>Host Confirm</Button>

    </YStack>
  );
}
