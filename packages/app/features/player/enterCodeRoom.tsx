import { Button, YStack, Input } from "@my/ui";
import { useState } from "react";

export const EnterCodeRoom = ({ navigation }) => {

    const [input, setInput] = useState("")

    const enterRoom = () => {
        navigation.navigate("waiting-room")
    }

    return (
        <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
            <Input w={245} placeholder="กรอกโค้ดห้องที่นี่" onChangeText={text => setInput(text)}></Input>
            <Button w={245} onPress={enterRoom}>
                เข้าร่วมห้อง
            </Button>
        </YStack>
    )
}