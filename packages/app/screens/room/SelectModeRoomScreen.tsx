import { Button, H2, YStack } from '@my/ui';
import { ModeInfo } from 'app/components/room';
import { useRouter } from "solito/router";

export default function SelectModeRoomScreen() {
  const { push } = useRouter()
  const roomId = 3
  const competitive = () => {
    push(`/room/${roomId}/competitive/createQuestion`)
  }
  const cooperative = () => {
    push(`/room/${roomId}/cooperative/createQuestion`)
  }
  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
      <YStack fd={'row'}>
        <H2 color="#FFFCFC" mr="$1">
          โหมด{' '}
        </H2>
        <ModeInfo />
      </YStack>

      <Button backgroundColor="#F76190" w={245} onPress={competitive}>
        Competitive
      </Button>
      <Button backgroundColor="#C4F042" w={245} onPress={cooperative}>
        Cooperative
      </Button>
    </YStack>
  );
}
