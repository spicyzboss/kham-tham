import { Dialog, YStack, Button } from '@my/ui';
import { GameMode } from '@prisma/client';

interface QuestionText {
  order: number;
  question: string;
  timeLeft: number;
  closeModal: () => void;
  openModal: boolean;
  mode: GameMode
}

export default function ModalQuestion({ mode, question, timeLeft, order, closeModal, openModal }: QuestionText) {

  return (
    <Dialog modal open={openModal} >
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
            <Dialog.Title>คำถามข้อที่ {order} </Dialog.Title>
            <Dialog.Description>
              {question}
            </Dialog.Description>

            <YStack ai="flex-end" mt="$2">
              <Dialog.Close asChild>
                <Button aria-label="Close" alignSelf='stretch' textAlign='center' theme="dark_Button" onPress={closeModal}>
                  ปิด
                </Button>
              </Dialog.Close>
              {mode == "COMPETITIVE" && (
                <Dialog.Description>
                  คุณเหลือเวลาอ่านคำถามอีก {timeLeft} วินาที
                </Dialog.Description>
              )}
            </YStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
