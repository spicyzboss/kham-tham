import { View } from 'react-native';
import { YStack, XGroup, Button } from '@my/ui';
import { useState } from 'react';
import ContainerShowCode from 'app/components/room/ContainerShowCode';
import ContainerShowPlayer from 'app/components/room/ContainerShowPlayer';

export default function ShowRoomScreen() {
  const [showCode, setShowCode] = useState<boolean>(true);

  const showContainerTab = () => {
    if (showCode) return <ContainerShowCode />;
    if (!showCode) return <ContainerShowPlayer />;
  };

  return (
    <YStack f={1} backgroundColor={'#000'}>
      <YStack p="$3" space="$2" ai="center">
        <XGroup>
          <Button
            backgroundColor={showCode ? '$blue11Dark' : '$blue5Light'}
            onPress={() => setShowCode(true)}
          >
            Code ของห้อง
          </Button>
          <Button
            backgroundColor={!showCode ? '$blue11Dark' : '$blue5Light'}
            onPress={() => setShowCode(false)}
          >
            ผู้เล่นที่เข้าร่วมห้อง
          </Button>
        </XGroup>
        {showContainerTab()}
      </YStack>
    </YStack>
  );
}
