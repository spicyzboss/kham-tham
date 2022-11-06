import { AlertDialog, Button, Paragraph, YStack, Text, H2, H3 } from '@my/ui'
import { Pressable } from 'react-native'
export const ModeInfo = () => (

    <AlertDialog>

        <AlertDialog.Trigger asChild>
            <Pressable>
                <YStack br={'$10'} w={'$3.5'} h={'$3.5'} borderColor={'#F0C000'} borderWidth={"$1"} ai={'center'} jc="center" >
                    <H3 color="#F0C000">?</H3>
                </YStack>
            </Pressable>

        </AlertDialog.Trigger>

        <AlertDialog.Portal>

            <AlertDialog.Overlay
                key="overlay"
                animation="quick"
                o={0.5}
                enterStyle={{ o: 0 }}
                exitStyle={{ o: 0 }} />

            <AlertDialog.Content
                backgroundColor={'$blue1Dark'}
                borderColor={'$blue11Dark'}
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
                x={0}
                scale={1}
                opacity={1}
                y={0}>
                <AlertDialog.Description ta={'center'} p='$5'>
                    <Text color="#FFFCFC">
                        Competitive = แข่งตอบคำถาม{'\n'}
                        Cooperative =  ร่วมมือการตอบคำถาม
                    </Text>
                </AlertDialog.Description>
                <AlertDialog.Cancel asChild>
                    <Button backgroundColor={'$blue1Dark'} color={'#F0C000'} pos="absolute" t="$0" r="$0" size="$3" circular>
                        X
                    </Button>
                </AlertDialog.Cancel>
            </AlertDialog.Content>

        </AlertDialog.Portal>

    </AlertDialog>

)