import { H1, H3, YStack, XStack, Button, Card, Label, Input, H2 } from '@my/ui';
import { useState } from 'react';
import { AddQuestionButton, CardQuestion } from '../../components/question';
import { ScrollView, View, StyleSheet } from 'react-native';
import globalStyles from '../../../assets/global_style';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import ModalAddQuestion from 'app/components/question/ModalAddQuestion';
import { GameMode } from '@prisma/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateQuestionScreen() {
  const { push, replace } = useRouter();
  const { useParam } = createParam();
  const [questions, setQuestions] = useState<
    (CreateQuestion4Question | CreateMultiSelectQuestion | CreateTypeQuestion)[]
  >([]);
  const [minScore, setMinScore] = useState<number>(30);
  const [openModal, setOpenModal] = useState(false);

  const amountQuestions = questions.length;
  const mode: GameMode = useParam('mode')[0]?.toUpperCase() as GameMode;
  const roomName = useParam('roomName');

  const closeModal = () => {
    setOpenModal(false);
  };

  const selectType = (type: 'QUIZ_4_ANSWER' | 'MULTI_SELECT_ANSWER' | 'TYPE_ANSWER') => {
    closeModal();
    let newQuestion: CreateQuestion4Question | CreateMultiSelectQuestion | CreateTypeQuestion;
    if (type === 'QUIZ_4_ANSWER') {
      newQuestion = {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 1,
        timeDisplayQuestion: 5,
        timeAnswerQuestion: 15,
        type: type,
        score: 1000,
      };
    } else if (type === 'MULTI_SELECT_ANSWER') {
      newQuestion = {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: [],
        timeDisplayQuestion: 5,
        timeAnswerQuestion: 15,
        type: type,
        score: 1000,
      };
    } else if (type === 'TYPE_ANSWER') {
      newQuestion = {
        question: '',
        answer: '',
        timeDisplayQuestion: 5,
        timeAnswerQuestion: 15,
        type: type,
        score: 1000,
      };
    }

    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleAddQuestionButton = () => {
    setOpenModal(true);
  };

  const deleteQuestion = (index: number) => {
    let copyQuestions = [...questions];
    copyQuestions.splice(index, 1);
    setQuestions([...copyQuestions]);
  };

  const handleChange = (index, value) => {
    let copyQuestions = [...questions];
    copyQuestions[index] = { ...copyQuestions[index], ...value };
    setQuestions([...copyQuestions]);
  };

  const tokenChecker = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      return token;
    } else {
      return null;
    }
  };

  const sendQuestion = async () => {
    const token = await tokenChecker();
    if (token) {
      const request = await fetch('http://10.0.119.37:3000/room/create/withQuestion', {
        method: 'POST',
        body: JSON.stringify({
          name: roomName[0],
          mode,
          questions,
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      return await request.json();
    }
  };

  const submit = () => {
    sendQuestion().then((e) => {
      replace(`/room/user`);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <YStack>
          <H1 ta="center" theme="white_Text">
            คำถาม ( {amountQuestions} )
          </H1>
          <H2 ta="center" theme="white_Text">
            ชื่อห้อง : {roomName[0]}
          </H2>
          <H3 ta="center" theme={mode == 'COMPETITIVE' ? 'crimson_Text' : 'lime_Text'}>
            {mode}
          </H3>

          {mode == 'COOPERATIVE' && (
            <Card theme="dark" elevate style={styles.cardContainer}>
              <Card.Header padded>
                <XStack justifyContent="center">
                  <Label w={170} theme="white_Text">
                    เกณฑ์คะแนนขั้นต่ำ (%)
                  </Label>
                  <Input
                    f={1}
                    ai="stretch"
                    textAlign="center"
                    onChangeText={(text) => setMinScore(Number(text))}
                    value={String(minScore)}
                    keyboardType="number-pad"
                  />
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
              questionInfo={question}
              deleteQuestion={deleteQuestion}
            />
          ))}
        </YStack>
        {amountQuestions !== 0 && (
          <Button style={globalStyles.m10} onPress={submit} theme={'dark_Button'}>
            ยืนยันการสร้าง
          </Button>
        )}
        <View style={globalStyles.space} />
      </ScrollView>
      <AddQuestionButton handler={handleAddQuestionButton} />
      <ModalAddQuestion openModal={openModal} closeModal={closeModal} selectType={selectType} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
