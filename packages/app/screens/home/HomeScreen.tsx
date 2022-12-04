import { Button, H1, Separator, YStack } from '@my/ui';
import { useRouter } from 'solito/router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const { push } = useRouter()

  const navigateTo = (pathName: string) => {
    push(pathName)
  }

  const clearToken = (type) => {
    AsyncStorage.removeItem(type)
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space="$4" backgroundColor="black">
      <YStack space="$4" minWidth={300}>
        <H1 ta="center" theme="white_Text">Kham Tham</H1>
        <Separator />
      </YStack>
      <YStack space="$4" minWidth={200}>
        <Button als="stretch" theme="dark_Button" onPress={() => navigateTo("/login")}>Sign in</Button>
        <Button als="stretch" theme="dark_Button" onPress={() => clearToken('playerToken')}>Clear Token User</Button>
        <Button als="stretch" theme="dark_Button" onPress={() => clearToken('userToken')}>Clear Token Player</Button>
        <Button als="stretch" theme="crimson_Button" onPress={() => navigateTo("/code")}>Enter code</Button>
      </YStack>

    </YStack >
  );
}
