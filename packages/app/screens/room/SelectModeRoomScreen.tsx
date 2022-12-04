import { Button, H2, H4, YStack, XStack, Input, Paragraph } from '@my/ui';
import { ModalInfo } from 'app/components/room';
import { useRouter } from 'solito/router';
import { useState } from 'react';

export default function SelectModeRoomScreen() {

  const [showSelectMode, setShowSelectMode] = useState<boolean>(false)
  const [inputRoomName, setInputRoomName] = useState("")
  const [displayRoomNameErrorMessage, setDisplayRoomNameErrorMessage] = useState<boolean>(false)


  const { push, back } = useRouter();
  const competitive = () => {
    push(`/room/createQuestion/${inputRoomName}/competitive`);
  };
  const cooperative = () => {
    push(`/room/createQuestion/${inputRoomName}/cooperative`);
  };
  const confirmRoomName = () => {
    if (!inputRoomName) return setDisplayRoomNameErrorMessage(true)
    setDisplayRoomNameErrorMessage(false)
    setShowSelectMode(true)
  }
  const backToInputRoomName = () => {
    setShowSelectMode(false)
  }
  return (
    <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
      {showSelectMode ? (
        <>
          <YStack ai="center" jc="center" flex={1} space>
            <H4 theme="white_Text">ชื่อห้อง : {inputRoomName}</H4>
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
            <Button theme="dark_Button" w={245} onPress={backToInputRoomName}>
              Back
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
            theme="dark_Input"
            placeholderTextColor="#CD1D8D"
            onChangeText={setInputRoomName}
            value={inputRoomName}
            placeholder="Enter your room name"
          />
          {displayRoomNameErrorMessage && (
            <Paragraph ta="right" theme="error_Text">
              Please enter your room name
            </Paragraph>
          )}
          <Button theme="dark_Button" w={245} onPress={confirmRoomName}>
            Confirm Room Name
          </Button>



        </YStack>
      )
      }
    </YStack >
  );
}
