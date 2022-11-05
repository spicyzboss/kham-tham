import { Button, Input, YStack } from "@my/ui";
import { useState } from "react";
import { View } from "react-native";

export const ContainerConfirmOTP = () => {
    const [otp, setOTP] = useState(null)
    return (
        <YStack style={[{ position: 'absolute' }]}>
            <Input></Input>
            <Button>ยืนยันรหัส OTP</Button>
        </YStack>
    )
}

