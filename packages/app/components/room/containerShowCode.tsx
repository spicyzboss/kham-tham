import { Card, H2 } from "@my/ui"
import { useState } from "react"
import { View, Image, StyleSheet } from "react-native"
import global_style from "../../../assets/global_style"

export const ContainerShowCode = () => {


    const [codeRoom, setCodeRoom] = useState("ABC123")


    return (
        <Card theme="dark" elevate>
            <Card.Header padded>
                <H2 ta="center" color="white">{codeRoom}</H2>
                <H2 ta="center" color="white">or</H2>
                <Image style={styles.image} source={{ uri: "https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png" }}></Image>
            </Card.Header>
        </Card>
    )

}

const styles = StyleSheet.create({
    image: {
        width: 300,
        aspectRatio: 1 / 1
    }
})