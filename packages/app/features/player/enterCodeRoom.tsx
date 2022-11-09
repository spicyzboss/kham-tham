import { Button, YStack, Input } from "@my/ui";
import { useState } from "react";
import axios from 'axios'
import useSWR from 'swr'

export const EnterCodeRoom = ({ navigation }) => {

    const [input, setInput] = useState("")

    const fetchRoomByCode = (url) => axios.get(url).then(res => res.data)

    const { data, error, isValidating } = useSWR(`/room/${input}`, fetchRoomByCode)

    if (!error && !data) return <Button>Loading</Button>

    const enterRoom = () => {
        navigation.navigate("waiting-room")
    }

    return (
        <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
            <Input w={245} placeholderTextColor="#CD1D8D" placeholder="กรอกโค้ดห้องที่นี่" onChangeText={text => setInput(text)}></Input>
            <Button w={245} onPress={enterRoom}>
                เข้าร่วมห้อง
            </Button>
        </YStack>
    )
}