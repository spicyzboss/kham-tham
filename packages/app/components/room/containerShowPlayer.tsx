import { Button, XStack } from "@my/ui"
import { useState } from "react"

export const ContainerShowPlayer = () => {

    const [players, setPlayers] = useState(['wave', 'bank', 'ฉันจะกินไก่', 'omg', "wavewave", "wavewave", "w"])

    const sortByLength = (a, b) => {
        return a.length - b.length
    }

    const filterPlayers = players.sort(sortByLength)

    return (
        <XStack flexWrap="wrap">
            {filterPlayers.map((playerName, index) => {
                return (
                    <Button key={index}>{playerName}</Button>
                )
            })}
        </XStack>
    )

}