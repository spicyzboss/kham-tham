import { View } from "react-native"
import { Button } from "@my/ui"
import { Plus } from "@tamagui/feather-icons"
import { StyleSheet } from "react-native"
import { useLink } from "solito/link"

interface addQuestionFunction {
    function: Function
}

export const AddQuestionButton = (props: addQuestionFunction) => {

    return (
        <View style={styles.addQuestionButton}>
            <Button icon={Plus} size="$6" onPress={() => props.function()}>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    addQuestionButton: {
        position: "absolute",
        alignSelf: 'center',
        bottom: "5%",
    }
})