import { Button, YStack, H4 } from '@my/ui';
import { useState } from 'react';
import { useRouter } from 'solito/router';

export default function WaitingRoomScreen({ navigation }) {
  const { back } = useRouter();

  const [input, setInput] = useState('');

  return (
    <YStack backgroundColor="#222" f={1} jc="center" ai="center" space theme="dark">
      <H4>Waiting for host...</H4>
      <Button onPress={back}>Back</Button>
    </YStack>
  );
}
