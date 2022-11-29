import { Card, H3, Paragraph, XStack, YStack, Text, Input, Label, TextArea } from '@my/ui';
import { StyleSheet, TextInput } from 'react-native';

interface PropQuestion {
  indexQuestion: number;
  question: Question;
  handleChange: (a, b) => void;
  mode: GameMode;
}

export default function CardQuestion({
  indexQuestion,
  handleChange,
  question,
  mode,
}: PropQuestion) {
  const { description, score, choices, showQuestion, answerQuestion } = question;

  const handleChoicesChange = (index, text) => {
    choices[index] = text
    handleChange(indexQuestion, { choices: choices })
  }

  return (
    <Card theme="dark" elevate style={styles.cardContainer}>
      <Card.Header padded>
        <YStack space="$3">
          <XStack alignItems="center">
            <H3 color="white" mr="$3">
              คำถามที่ {indexQuestion + 1}
            </H3>
            <Label w={60}>คะแนน</Label>
            <Input
              textAlign="center"
              onChangeText={(text) => handleChange(indexQuestion, { score: Number(text) })}
              value={String(score)}
              keyboardType="number-pad"
            />
          </XStack>
          <TextArea placeholder="รายละเอียดคำถาม" value={description} onChangeText={(text) => handleChange(indexQuestion, { description: text })} />
          {choices.map((v, i) => (
            <XStack key={i}>
              <Label w={90}>ตัวเลือกที่ {i + 1}</Label>
              <Input
                w={220}
                onChangeText={(text) => handleChoicesChange(i, text)}
                value={v}
              />
            </XStack>
          ))}
          {mode === 'Competitive' && (
            <XStack>
              <Label w={200}>ระยะเวลาแสดงคำถาม (วินาที)</Label>
              <Input
                w={80}
                textAlign="center"
                onChangeText={(text) => handleChange(indexQuestion, { 'showQuestion': Number(text) })}
                value={String(showQuestion)}
                keyboardType="number-pad"
              />
            </XStack>
          )
          }
          <XStack>
            <Label w={200}>ระยะเวลาตอบคำถาม (วินาที)</Label>
            <Input
              w={80}
              textAlign="center"
              onChangeText={(text) => handleChange(indexQuestion, { 'answerQuestion': Number(text) })}
              value={String(answerQuestion)}
              keyboardType="number-pad"
            />
          </XStack>
        </YStack>
      </Card.Header>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    height: 550,
  },
});
