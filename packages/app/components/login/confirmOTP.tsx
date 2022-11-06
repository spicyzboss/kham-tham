import { Dialog, Button, Input, XStack, YStack, Fieldset, Label } from "@my/ui";
import { useState } from "react";
import { View } from "react-native";

export const ContainerConfirmOTP = () => {
    const generateOTP = null;
    const [otp, setOTP] = useState('')

    return (
        <Dialog>
            <Dialog.Trigger asChild>
                <Button>Edit Profile</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    key="overlay"
                    animation="quick"
                    o={0.5}
                    enterStyle={{ o: 0 }}
                    exitStyle={{ o: 0 }}
                />
                <Dialog.Content w={350}
                    backgroundColor={'$blue1Dark'}
                    borderColor={'$blue11Dark'}
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
                    y={0} space>

                    <Input
                        value={otp}
                        onChangeText={setOTP}
                        h={'$6'}
                        ta={'center'}
                        mt={'$4'}
                        borderRadius={'$-0'}
                        borderColor={'$blue11Dark'}
                        backgroundColor={'$blue3Light'}
                        placeholderTextColor={'$gray9Light'}
                        placeholder="รหัส OTP"
                    ></Input>
                    <Dialog.Close asChild>
                        <Button>
                            ยืนยันรหัส OTP
                        </Button>
                    </Dialog.Close>

                    <Dialog.Close asChild>
                        <Button backgroundColor={'$blue1Dark'} color={'#F0C000'} pos="absolute" t="$0" r="$0" size="$3" circular>
                            X
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )
}

