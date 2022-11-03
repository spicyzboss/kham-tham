import { View } from "react-native"
import { Button } from "@my/ui"
import { Plus } from "@tamagui/feather-icons"
import { StyleSheet } from "react-native"
export const CreateButton = () => {
    return (
        <View style={styles.createButton}>
            <Button icon={Plus} size="$6">
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