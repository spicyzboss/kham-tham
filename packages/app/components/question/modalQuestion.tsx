import { AlertDialog, Button, Text, Image, YStack, Paragraph } from "@my/ui";
import { Pressable } from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
interface QuestionText {
    image: string,
    questionInfo: string,
    time: Float
}
export const ModalQuestion = (props: QuestionText) => {
    const image = (props.image == '' || props.image == undefined) ? 'https://www.logotypes101.com/logos/92/9FD796504879FC8567A988E91829720C/Undefined.png' : props.image
    const questionInfo = props.questionInfo
    const time = props.time
    return (
        <AlertDialog>
            <AlertDialog.Trigger asChild>
                <Pressable>
                    <Text>คำถาม</Text>
                </Pressable>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    key="overlay"
                    animation="quick"
                    o={0.5}
                    enterStyle={{ o: 0 }}
                    exitStyle={{ o: 0 }}>

                </AlertDialog.Overlay>
                <AlertDialog.Content
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
                    y={0}
                >
                    <AlertDialog.Description>
                        <Image aspectRatio={1} width={300} height={300} src={image} >
                        </Image>
                        <YStack>
                            <Paragraph>{questionInfo}</Paragraph>
                        </YStack>
                        <YStack backgroundColor={"$yellow11Dark"}>
                            <Paragraph>เหลือเวลาอ่านคำถามอีก</Paragraph> {time}
                        </YStack>
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
}