import { Button, H2, YStack } from '@my/ui';
import { ModalInfo } from 'app/components/room';
import { useRouter } from 'solito/router';

export default function SelectModeRoomScreen() {
  const { push } = useRouter();
  const competitive = () => {
    push(`/room/createQuestion/competitive`);
  };
  const cooperative = () => {
    push(`/room/createQuestion/cooperative`);
  };
  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
      <YStack fd={'row'}>
        <H2 mr="$1" theme="white_Text">
          โหมด{' '}
        </H2>
        <ModalInfo />
      </YStack>

      <Button theme="crimson_Button" w={245} onPress={competitive}>
        Competitive
      </Button>
      <Button theme="lime_Button" w={245} onPress={cooperative}>
        Cooperative
      </Button>
    </YStack>
  );
}
