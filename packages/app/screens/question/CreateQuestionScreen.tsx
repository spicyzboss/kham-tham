import { H1, H3, YStack, XStack, Button, Card, Label, Input } from '@my/ui';
import { useState, useEffect } from 'react';
import { AddQuestionButton, CardQuestion } from '../../components/question';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../../assets/global_style';

export default function CreateQuestionScreen({ navigation }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [minScore, setMinScore] = useState<number>(30);

  // const questions = [{  }]

  const amountQuestions = questions.length;
  // TODO: implement GameMode
  const mode = 'Cooperative';

  const handleAddQuestionButton = () => {
    const emptyQuestion: Question = {
      score: 1000,
      choices: [],
      showQuestion: 5,
      answerQuestion: 5,
    };
    setQuestions((prev) => [...prev, emptyQuestion]);
  };

  const handleChange = (index, value) => {
    let copyQuestions = [...questions]
    copyQuestions[index] = { ...copyQuestions[index], ...value }

  };

  const submit = () => {
    navigation.navigate('show-room');
  };

  useEffect(() => {
    console.log(questions)
  }, [questions])

  return (
    <View>
      <ScrollView>
        <YStack>
          <H1 ta="center">คำถาม ( {amountQuestions} )</H1>
          <H3 ta="center">{mode}</H3>

          {mode == 'Cooperative' && (
            <Card theme="dark" elevate style={styles.cardContainer}>
              <Card.Header padded>
                <XStack justifyContent="center">
                  <Label w={170}>เกณฑ์คะแนนขั้นต่ำ (%)</Label>
                  <Input
                    w={100}
                    textAlign="center"
                    onChangeText={(text) => setMinScore(Number(text))}
                    value={String(minScore)}
                    keyboardType="number-pad"
                  ></Input>
                </XStack>
              </Card.Header>
            </Card>
          )}

          {questions.map((question, index) => (
            <CardQuestion
              key={index}
              mode={mode}
              indexQuestion={index}
              handleChange={handleChange}
              question={question}
            ></CardQuestion>
          ))}
        </YStack>
        {amountQuestions !== 0 && (
          <Button style={globalStyles.m10} onPress={submit}>
            ยืนยันการสร้าง
          </Button>
        )}
        <View style={globalStyles.space} />
      </ScrollView>
      <AddQuestionButton handler={handleAddQuestionButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
  },
});
