import { H1, H3, YStack, XStack, Button, Card, Label, Input } from "@my/ui"
import { useState } from "react"
import { AddQuestionButton } from "../../components/question/addQuestionButton"
import { CardQuestion } from "../../components/question/cardQuestion"
import { ScrollView, View, StyleSheet } from 'react-native'
import globalStyles from '../../../assets/global_style'

interface Question {
    score: number,
    choice_1: string,
    choice_2: string,
    choice_3: string,
    choice_4: string,
    showQuestion: number,
    answerQuestion: number

}



export const CreateQuestion = ({ navigation }) => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [minScore, setMinScore] = useState<number>(30)

    const amountQuestions = questions.length
    const mode = "Cooperative"

    const handleAddQuestionButton = () => {
        const emptyQuestion: Question = {
            score: 1000,
            choice_1: "",
            choice_2: "",
            choice_3: "",
            choice_4: "",
            showQuestion: 5,
            answerQuestion: 5
        }
        setQuestions(prev => [...prev, emptyQuestion])
    }

    const handleChange = (index, key, value) => {

    }

    const submit = () => {
        navigation.navigate("show-room")
    }

    const renderSubmitButton = () => {
        if (amountQuestions != 0) return <Button style={globalStyles.m10} onPress={submit}>ยืนยันการสร้าง</Button>
        return <></>
    }

    const renderInputMinScore = () => {
        if (mode == "Cooperative") {
            return (
                <Card theme="dark" elevate style={styles.cardContainer}>
                    <Card.Header padded>
                        <XStack justifyContent="center">
                            <Label w={170}>เกณฑ์คะแนนขั้นต่ำ (%)</Label>
                            <Input w={100} textAlign="center" onChangeText={text => setMinScore(Number(text))} value={String(minScore)} keyboardType="number-pad"></Input>
                        </XStack>
                    </Card.Header>
                </Card>
            )
        }
        return <></>
    }


    return (
        <View>
            <ScrollView>
                <YStack>
                    <H1 ta="center">คำถาม ( {amountQuestions} )</H1>
                    <H3 ta="center">{mode}</H3>

                    {renderInputMinScore()}

                    {questions.map((question, index) => (
                        <CardQuestion key={index} mode={mode} indexQuestion={index} handleChange={handleChange} question={question}></CardQuestion>
                    ))}
                </YStack>
                {renderSubmitButton()}
                <View style={globalStyles.space} />
            </ScrollView>
            <AddQuestionButton function={handleAddQuestionButton} />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
    }
})