import { Button, YStack, Input, H1 } from "@my/ui";
import { useState } from "react";

export const WaitingRoom = ({ navigation }) => {

    const [input, setInput] = useState("")

    const enterRoom = () => {
        navigation.navigate("waiting-room")
    }

    return (
        <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
            <H1 color='white'>รอห้องเริ่มเล่น . . .</H1>
        </YStack>
    )
}