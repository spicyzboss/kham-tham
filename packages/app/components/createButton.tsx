import { View } from "react-native"
import { Button } from "@my/ui"
import { Plus } from "@tamagui/feather-icons"
import { StyleSheet } from "react-native"
import { useLink } from "solito/link"

interface PathCreateButton {
    to: string
}

export const CreateButton = (props: PathCreateButton) => {

    const path = props.to

    const linkProps = useLink({
        href: path,
    })

    return (
        <View style={styles.createButton}>
            <Button icon={Plus} size="$6" {...linkProps}>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    createButton: {
        position: "absolute",
        alignSelf: 'center',
        bottom: "5%",
    }
})