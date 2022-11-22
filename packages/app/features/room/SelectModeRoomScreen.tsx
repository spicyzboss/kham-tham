import { Button, H2, YStack } from '@my/ui';
import { useLink } from 'solito/link';
import { ModeInfo } from 'app/components/room';

export default function SelectModeRoomScreen() {
  const competitive = useLink({ href: '/create-question' });
  const cooperative = useLink({ href: '/create-question' });
  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
      <YStack fd={'row'}>
        <H2 color="#FFFCFC" mr="$1">
          โหมด{' '}
        </H2>
        <ModeInfo />
      </YStack>

      <Button backgroundColor="#F76190" w={245} {...competitive}>
        Competitive
      </Button>
      <Button backgroundColor="#C4F042" w={245} {...cooperative}>
        Cooperative
      </Button>
    </YStack>
  );
}
