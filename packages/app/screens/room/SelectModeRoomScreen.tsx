import { Button, H2, H4, YStack, XStack, Input } from '@my/ui';
import { ModalInfo } from 'app/components/room';
import { useRouter } from 'solito/router';
import { useState } from 'react';

export default function SelectModeRoomScreen() {

  const [showSelectMode, setShowSelectMode] = useState<boolean>(false)
  const [inputRoomName, setInputRoomName] = useState("")


  const { push } = useRouter();
  const competitive = () => {
    push(`/room/createQuestion/competitive`);
  };
  const cooperative = () => {
    push(`/room/createQuestion/cooperative`);
  };
  const confirmRoomName = () => {
    setShowSelectMode(true)
  }
  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
      {showSelectMode ? (
        <>
          <YStack ai="center" jc="center" flex={1} space>
            <H4>ชื่อห้อง : {inputRoomName}</H4>
            <XStack space jc="center" ai="center">
              <H2 mr="$1" theme="white_Text">
                Room Mode {' '}
              </H2>
              <ModalInfo />
            </XStack>


            <Button theme="crimson_Button" w={245} onPress={competitive}>
              Competitive
            </Button>
            <Button theme="lime_Button" w={245} onPress={cooperative}>
              Cooperative
            </Button>
          </YStack>
        </>
      ) : (
        <YStack ai="center" jc="center" flex={1} space als="stretch" p="$12">
          <H2 theme="white_Text">
            Room Name
          </H2>
          <Input
            als="stretch"
            theme="dark"
            onChangeText={setInputRoomName}
            value={inputRoomName}
          />
          <Button theme="dark_Button" w={245} onPress={confirmRoomName}>
            Confirm Room Name
          </Button>

        </YStack>
      )
      }
    </YStack >
  );
}
