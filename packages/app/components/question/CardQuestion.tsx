import { Card, H3, XStack, YStack, Input, Label, TextArea, Button } from '@my/ui';
import { StyleSheet, TextInput } from 'react-native';
import { GameMode } from '@prisma/client';
import { Trash } from '@tamagui/feather-icons';

interface PropQuestion {
  indexQuestion: number;
  questionInfo: CreateQuestion4Question | CreateMultiSelectQuestion | CreateTypeQuestion;
  handleChange: (a, b) => void;
  mode: GameMode;
  deleteQuestion: (a) => void;
}

export default function CardQuestion({
  indexQuestion,
  handleChange,
  questionInfo,
  mode,
  deleteQuestion,
}: PropQuestion) {
  const { question, timeDisplayQuestion, timeAnswerQuestion, type, score, answer, ...rest } =
    questionInfo;

  const handleAnswerChange = (indexQuestion, order, text) => {
    let obj = {};
    obj[`choice${order}`] = text;
    handleChange(indexQuestion, obj);
  };

  const handleSelectAnswer = (indexQuestion, order) => {
    let newAnswer;
    if (type == 'QUIZ_4_ANSWER') {
      newAnswer = { answer: order };
      handleChange(indexQuestion, newAnswer);
    }
    if (type == 'MULTI_SELECT_ANSWER') {
      if (answer.indexOf(order) != -1) {
        const removeIndex = answer.indexOf(order);
        answer.splice(removeIndex, 1);
        newAnswer = { answer: [...answer] };
      } else {
        newAnswer = { answer: [...answer, order] };
      }

      handleChange(indexQuestion, newAnswer);
    }
  };

  const isAnswerSelect = (order) => {
    if (type == 'QUIZ_4_ANSWER') {
      return (
        <>
          <Label
            w={100}
            h={'100%'}
            ta="center"
            pr="$3"
            theme={answer == order ? 'yellow_Text' : 'white_Text'}
            onPress={() => handleSelectAnswer(indexQuestion, order)}
          >
            {answer == order ? `ตัวเลือกที่ ${order} ${'\n'}(คำตอบ)` : `ตัวเลือกที่ ${order}`}
          </Label>
        </>
      );
    }
    if (type == 'MULTI_SELECT_ANSWER') {
      return (
        <Label
          w={100}
          h={'100%'}
          ta="center"
          pr="$3"
          theme={answer.includes(order) ? 'yellow_Text' : 'white_Text'}
          onPress={() => handleSelectAnswer(indexQuestion, order)}
        >
          {answer.includes(order) ? `ตัวเลือกที่ ${order} ${'\n'}(คำตอบ)` : `ตัวเลือกที่ ${order}`}
        </Label>
      );
    }
  };

  const renderSelectElement = (indexQuestion) => {
    if (type != 'TYPE_ANSWER') {
      return [1, 2, 3, 4].map((order, index) => (
        <XStack key={index} ai="center">
          {isAnswerSelect(order)}
          <TextArea
            ai="stretch"
            f={1}
            value={rest[`choice${order}`]}
            onChangeText={(text) => handleAnswerChange(indexQuestion, order, text)}
          />
        </XStack>
      ));
    } else {
      return (
        <XStack ai={'center'}>
          <Label pr="$3" theme="white_Text">
            คำตอบ
          </Label>
          <TextArea
            w={300}
            value={rest['answer']}
            onChangeText={(text) => handleChange(indexQuestion, { answer: text })}
          />
        </XStack>
      );
    }
  };

  return (
    <Card theme="dark" elevate style={styles.cardContainer}>
      <Card.Header padded>
        <YStack space="$3">
          <XStack alignItems="center">
            <H3 mr="$3" theme="white_Text">
              คำถามที่ {indexQuestion + 1}
            </H3>
            <Label w={60} theme="white_Text">
              คะแนน
            </Label>
            <Input
              ai="stretch"
              f={1}
              textAlign="center"
              onChangeText={(text) => handleChange(indexQuestion, { score: Number(text) })}
              value={String(score)}
              keyboardType="number-pad"
            />
          </XStack>
          <TextArea
            ai="stretch"
            f={1}
            placeholder="รายละเอียดคำถาม"
            value={question}
            onChangeText={(text) => handleChange(indexQuestion, { question: text })}
          />
          {renderSelectElement(indexQuestion)}
          {mode === 'COMPETITIVE' && (
            <XStack>
              <Label theme="white_Text" w={200}>
                ระยะเวลาแสดงคำถาม (วินาที)
              </Label>
              <Input
                ai="stretch"
                f={1}
                textAlign="center"
                onChangeText={(text) =>
                  handleChange(indexQuestion, { timeDisplayQuestion: Number(text) })
                }
                value={String(timeDisplayQuestion)}
                keyboardType="number-pad"
              />
            </XStack>
          )}
          <XStack>
            <Label theme="white_Text" w={200}>
              ระยะเวลาตอบคำถาม (วินาที)
            </Label>
            <Input
              ai="stretch"
              f={1}
              textAlign="center"
              onChangeText={(text) =>
                handleChange(indexQuestion, { timeAnswerQuestion: Number(text) })
              }
              value={String(timeAnswerQuestion)}
              keyboardType="number-pad"
            />
          </XStack>
          <Button
            als="center"
            w={150}
            theme="red_Button"
            icon={Trash}
            onPress={() => deleteQuestion(indexQuestion)}
          >
            ลบคำถามนี้
          </Button>
        </YStack>
      </Card.Header>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    flex: 1,
  },
});
