import { Card, H3, Paragraph, XStack, YStack, Text, Input, Label, TextArea } from "@my/ui"
import { StyleSheet, TextInput } from 'react-native'

interface PropQuestion {
    indexQuestion: number,
    question: Question,
    handleChange: Function,
    mode: string
}

interface Question {
    score: number,
    choice_1: string,
    choice_2: string,
    choice_3: string,
    choice_4: string,
    showQuestion: number,
    answerQuestion: number,
}

export const CardQuestion = (props: PropQuestion) => {

    const { indexQuestion, handleChange, question, mode } = props
    const { score, choice_1, choice_2, choice_3, choice_4, showQuestion, answerQuestion } = question

    const renderInputShowQuestion = () => {
        if (mode == "Competitive") {
            return (
                <XStack>
                    <Label w={200}>ระยะเวลาแสดงคำถาม (วินาที)</Label>
                    <Input w={80} textAlign="center" onChangeText={text => handleChange(indexQuestion, "showQuestion", Number(text))} value={String(showQuestion)} keyboardType="number-pad"></Input>
                </XStack>
            )
        }
        return <></>
    }


    return (
        <Card theme="dark" elevate style={styles.cardContainer}>
            <Card.Header padded>
                <YStack space="$3">
                    <XStack alignItems="center">
                        <H3 color="white" mr="$3">คำถามที่ {indexQuestion + 1}</H3>
                        <Label w={60}>คะแนน</Label>
                        <Input textAlign="center" onChangeText={text => handleChange(indexQuestion, "score", Number(text))} value={String(score)} keyboardType="number-pad"></Input>
                    </XStack>
                    <TextArea placeholder="รายละเอียดคำถาม">

                    </TextArea>
                    <XStack>
                        <Label w={90}>ตัวเลือกที่ 1</Label>
                        <Input w={220} onChangeText={text => handleChange(indexQuestion, "choice_1", text)} value={choice_1}></Input>
                    </XStack>
                    <XStack>
                        <Label w={90}>ตัวเลือกที่ 2</Label>
                        <Input w={220} onChangeText={text => handleChange(indexQuestion, "choice_2", text)} value={choice_2}></Input>
                    </XStack>
                    <XStack>
                        <Label w={90}>ตัวเลือกที่ 3</Label>
                        <Input w={220} onChangeText={text => handleChange(indexQuestion, "choice_3", text)} value={choice_3}></Input>
                    </XStack>
                    <XStack>
                        <Label w={90}>ตัวเลือกที่ 4</Label>
                        <Input w={220} onChangeText={text => handleChange(indexQuestion, "choice_4", text)} value={choice_4}></Input>
                    </XStack>
                    {renderInputShowQuestion()}
                    <XStack>
                        <Label w={200}>ระยะเวลาตอบคำถาม (วินาที)</Label>
                        <Input w={80} textAlign="center" onChangeText={text => handleChange(indexQuestion, "answerQuestion", Number(text))} value={String(answerQuestion)} keyboardType="number-pad"></Input>
                    </XStack>
                </YStack>
            </Card.Header>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        height: 550
    }
})