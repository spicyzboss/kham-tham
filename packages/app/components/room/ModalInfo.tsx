import { Dialog, Button, YStack, H3 } from "@my/ui"
import { Text, Pressable } from 'react-native';

export default function ModalInfo() {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Pressable>
          <YStack
            br={'$10'}
            w={'$3.5'}
            h={'$3.5'}
            borderWidth={'$1'}
            borderColor="$yellow10Light"
            ai={'center'}
            jc="center"
          >
            <H3 theme="yellow_Text">?</H3>
          </YStack>
        </Pressable>
      </Dialog.Trigger>
      <Dialog.Portal>
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
            <Dialog.Title theme="black_Text">รายละเอียดแต่ละประเภท</Dialog.Title>
            <Text>
              Competitive = แข่งตอบคำถาม{'\n'}
              Cooperative = ร่วมมือการตอบคำถาม
            </Text>
            <YStack ai="flex-end" mt="$2">
              <Dialog.Close asChild>
                <Button aria-label="Close" alignSelf='stretch' textAlign='center' theme="dark_Button">
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
