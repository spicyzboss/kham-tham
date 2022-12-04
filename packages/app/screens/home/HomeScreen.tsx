import { Button, H1, Separator, YStack } from '@my/ui';
import { useRouter } from 'solito/router';

export default function HomeScreen() {
  const { push } = useRouter()

  const navigateTo = (pathName: string) => {
    push(pathName)
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space="$4" backgroundColor="black">
      <YStack space="$4" minWidth={300}>
        <H1 ta="center" theme="white_Text">Kham Tham</H1>
        <Separator />
      </YStack>
      <YStack space="$4" minWidth={200}>
        <Button als="stretch" theme="dark_Button" onPress={() => navigateTo("/login")}>Sign in</Button>
        <Button als="stretch" theme="crimson_Button" onPress={() => navigateTo("/code")}>Enter code</Button>
      </YStack>

    </YStack >
  );
}
