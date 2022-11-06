import { View } from "react-native"
import { YStack, XGroup, Button } from "@my/ui"
import { useState } from "react"
import { ContainerShowCode } from "app/components/room/containerShowCode"
import { ContainerShowPlayer } from "app/components/room/containerShowPlayer"

export const ShowRoom = () => {

    const [showCode, setShowCode] = useState<boolean>(true)


    const showContainerTab = () => {
        if (showCode) return <ContainerShowCode />
        if (!showCode) return <ContainerShowPlayer />
    }

    return (
        <View>
            <YStack p="$3" space="$2" ai="center">
                <XGroup>
                    <Button backgroundColor={showCode ? "$red11Light" : "grey"} onPress={() => setShowCode(true)}>Code ของห้อง</Button>
                    <Button backgroundColor={!showCode ? "$red11Light" : "grey"} onPress={() => setShowCode(false)}>ผู้เล่นที่เข้าร่วมห้อง</Button>
                </XGroup>
                {showContainerTab()}
            </YStack>
        </View>
    )
}