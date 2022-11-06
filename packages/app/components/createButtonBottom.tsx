import { View } from "react-native"
import { Button, YStack } from "@my/ui"
import { Plus } from "@tamagui/feather-icons"
import { StyleSheet } from "react-native"
import { useLink } from "solito/link"

interface PathCreateButtonBottom {
    to: string
    name: string
}

export const CreateButtonBottom = (props: PathCreateButtonBottom) => {

    const path = props.to
    const name = props.name
    const linkProps = useLink({
        href: path,
    })

    return (
        <YStack mb={'-5%'} w={'100%'} style={styles.createButton}>
            <Button size="$6" {...linkProps}>
                {name}
            </Button>
        </YStack>
    )
}

const styles = StyleSheet.create({
    createButton: {
        position: "absolute",
        alignSelf: 'center',
    }
})