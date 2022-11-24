import { View } from 'react-native';
import { Button, H1, Input, YStack } from '@my/ui';
import { useLink } from 'solito/link';

export default function CreateRoomScreen() {
  const selectModeRoom = useLink({ href: '/selectMode-room' });

  return (
    <YStack backgroundColor={'#000'} f={1} jc="center" ai="center" space>
      <Input
        ta={'center'}
        w={245}
        placeholder="ชื่อห้อง"
        color="#FFFCFC"
        placeholderTextColor="#CD1D8D"
      />
      <Button {...selectModeRoom} w={245}>
        สร้าง
      </Button>
    </YStack>
  );
}
