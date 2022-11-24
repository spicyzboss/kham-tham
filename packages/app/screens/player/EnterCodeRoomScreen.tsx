import { Button, YStack, Input } from '@my/ui';
import { useState } from 'react';

export default function EnterCodeRoomScreen({ navigation }) {
  const [input, setInput] = useState('');

  const enterRoom = () => {
    navigation.navigate('waiting-room');
  };

  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
      <Input
        w={245}
        placeholderTextColor="#CD1D8D"
        placeholder="enterc"
        onChangeText={(text) => setInput(text)}
        size={'$4'}
      ></Input>
      <Button w={245} onPress={enterRoom}>
        เข้าร่วมห้อง
      </Button>
    </YStack>
  );
}
