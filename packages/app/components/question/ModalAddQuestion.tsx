import { Dialog, Button, YStack } from '@my/ui';

interface ModalAddQuestion {
  openModal: boolean;
  closeModal: () => void;
  selectType: (a) => void;
}

export default function ModalAddQuestion({ openModal, closeModal, selectType }: ModalAddQuestion) {
  return (
    <Dialog modal open={openModal}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          o={0.5}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <Dialog.Title>กรุณาเลือกประเภทของคำถาม</Dialog.Title>
            <YStack space="$3">
              <Button
                theme="crimson_Button"
                alignSelf="stretch"
                onPress={() => selectType('QUIZ_4_ANSWER')}
              >
                Single Select
              </Button>
              <Button
                theme="crimson_Button"
                alignSelf="stretch"
                onPress={() => selectType('MULTI_SELECT_ANSWER')}
              >
                Multiple Select
              </Button>
              <Button
                theme="crimson_Button"
                alignSelf="stretch"
                onPress={() => selectType('TYPE_ANSWER')}
              >
                Text Input
              </Button>
            </YStack>
            <YStack ai="flex-end" mt="$2">
              <Dialog.Close asChild>
                <Button
                  aria-label="Close"
                  alignSelf="stretch"
                  textAlign="center"
                  theme="dark_Button"
                  onPress={closeModal}
                >
                  ปิด
                </Button>
              </Dialog.Close>
            </YStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
