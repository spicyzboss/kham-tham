import { View } from "react-native"
import { YStack, XGroup, Button } from "@my/ui"
import { useState } from "react"
import { ContainerShowCode } from "app/components/room/containerShowCode"
import { ContainerShowPlayer } from "app/components/room/containerShowPlayer"

export const ShowRoom = () => {

    const [showCode, setShowCode] = useState<boolean>(true)
    const [showPlayer, setShowPlayer] = useState<boolean>(false)

    const selectTab = (mode: string) => {
        if (mode == "code") {
            setShowCode(true)
            setShowPlayer(false)
        }
        if (mode == "player") {
            setShowPlayer(true)
            setShowCode(false)
        }
    }

    const showContainerTab = () => {
        if (showCode) return <ContainerShowCode />
        if (showPlayer) return <ContainerShowPlayer />
    }

    return (
        <YStack f={1} backgroundColor={'#000'}>
            <YStack p="$3" space="$2" ai="center" >
                <XGroup>
                    <Button backgroundColor={showCode ? "$blue11Dark" : "$blue5Light"} onPress={() => selectTab('code')}>Code ของห้อง</Button>
                    <Button backgroundColor={showPlayer ? "$blue11Dark" : "$blue5Light"} onPress={() => selectTab('player')}>ผู้เล่นที่เข้าร่วมห้อง</Button>
                </XGroup>
                {showContainerTab()}
            </YStack>
        </YStack>
    )
}