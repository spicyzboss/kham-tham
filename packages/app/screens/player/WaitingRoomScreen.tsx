import { Button, YStack, H4, Spinner } from '@my/ui';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';

export default function WaitingRoomScreen({ navigation }) {
  const { useParam } = createParam()
  const { push } = useRouter();
  const [roomId] = useParam("roomId")

  const testHostConfirm = () => {
    push(`/room/${roomId}/question/1`)
  }

  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space theme="dark">
      <Spinner size="small" color="white" />
      <H4>Waiting for host</H4>
      {/* <Button onPress={testHostConfirm}>Host Confirm</Button> */}
    </YStack>
  );
}
