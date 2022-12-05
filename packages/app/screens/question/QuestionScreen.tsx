import { H2, Paragraph, YStack, Text, Card, XStack, Button, TextArea, Progress } from '@my/ui';
import { useState, useRef, useEffect } from 'react';
import { ModalQuestion } from 'app/components/question';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import global_style from '../../../assets/global_style';
import { useIsFocused } from '@react-navigation/native';
import { GameMode } from '@prisma/client';
import LoadingSpinner from 'app/components/LoadingSpinner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuestionScreen() {
  // setting part
  const { push, replace } = useRouter();
  const { useParam } = createParam();

  const isFocused = useIsFocused();

  // param part
  const [order] = useParam('order');
  if (!order) return;
  const [roomId] = useParam('roomId');

  // question part
  const [click, setClick] = useState(false);
  const [finishAnswer, setFinishAnswer] = useState(false);

  // choices part
  const backgroundChoices = ['$red11Dark', '$green11Dark', '$blue11Dark', '$yellow6Light'];
  const [choiceSelected, setChoiceSelected] = useState<number[]>([1, 2, 3, 4]);
  const [typeSelectAnswer, setTypeSelectAnswer] = useState('');

  const [question, setQuestion] = useState<any>({
    RoomQuestion: [
      {
        Question4Question: [
          {
            id: 0,
            choice1: '',
            choice2: '',
            choice3: '',
            choice4: '',
            answer: 1,
          },
        ],
        MultiSelectQuestion: [
          {
            id: 0,
            choice1: '',
            choice2: '',
            choice3: '',
            choice4: '',
            answer: 1,
          },
        ],
        TypeQuestion: [
          {
            id: 0,
            choice1: '',
            choice2: '',
            choice3: '',
            choice4: '',
            answer: 1,
          },
        ],
      },
    ],
    timeDisplayQuestion: 2000,
    timeAnswerQuestion: 2000,
    mode: 'COMPETITIVE' as GameMode,
    type: 'QUIZ_4_ANSWER',
    owner: {
      username: '',
    },
    question: '',
    choices: ['', '', '', ''],
    fetchDone: false,
  });

  const [sumQuestion, setSumQuestion] = useState(0);

  // host part
  const isHost = false;
  const amountUserSelectChoice = [3, 2, 4, 5];

  const timeCounterInterval = useRef<number | null>(null);
  // modal
  const [openModal, setOpenModal] = useState(true);

  const [timeCounter, setTimeCounter] = useState(
    question.timeAnswerQuestion + question.timeDisplayQuestion
  );

  // BossHP 0 - 100
  const [HP, setHP] = useState(80);

  const fetchRooms = (url: string, token: string) => {
    console.log('fetch');
    return fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => res.json());
  };

  const checkHasToken = async () => {
    const token = await AsyncStorage.getItem('playerToken');
    if (!token) {
      replace(`/code`);
    } else {
      fetchRooms(`http://10.0.119.37:3000/room/info/${roomId}`, token).then((result) => {
        const convertResult = result?.RoomQuestion.map((question) => {
          return {
            type: question.type,
            info: [
              ...question.Question4Question,
              ...question.MultiSelectQuestion,
              ...question.TypeQuestion,
            ][0],
            choices: [
              question?.Question4Question[0]?.choice1,
              question?.Question4Question[0]?.choice2,
              question?.Question4Question[0]?.choice3,
              question?.Question4Question[0]?.choice4,
              question?.MultiSelectQuestion[0]?.choice1,
              question?.MultiSelectQuestion[0]?.choice2,
              question?.MultiSelectQuestion[0]?.choice3,
              question?.MultiSelectQuestion[0]?.choice4,
              question?.TypeQuestion[0]?.choice1,
              question?.TypeQuestion[0]?.choice2,
              question?.TypeQuestion[0]?.choice3,
              question?.TypeQuestion[0]?.choice4,
            ].filter((choice) => choice != undefined),
            timeDisplayQuestion: 20,
            timeAnswerQuestion: 15,
            mode: result?.mode,
            owner: result?.owner?.username,
            question: [
              question?.Question4Question[0]?.question,
              question?.MultiSelectQuestion[0]?.question,
              question?.TypeQuestion[0]?.question,
            ].filter((choice) => choice != undefined)[0],
            fetchDone: true,
          };
        })[parseInt(order) - 1];

        setQuestion({ ...convertResult });
        setClick(false);
        setFinishAnswer(false);
        setOpenModal(true);
        setTimeCounter(convertResult.timeDisplayQuestion + convertResult.timeAnswerQuestion);
        setChoiceSelected([1, 2, 3, 4]);
        setSumQuestion(result.RoomQuestion.length);
        timeCounterInterval.current = window.setInterval(() => {
          setTimeCounter((prev) => prev - 1);
        }, 1000);
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkHasToken();
    }
  }, [isFocused]);

  useEffect(() => {
    if (question.fetchDone) {
      if (timeCounter <= question.timeDisplayQuestion && question.mode != 'COOPERATIVE') {
        setOpenModal(false);
      }
      if (timeCounter <= 0) {
        setOpenModal(false);
        setFinishAnswer(true);
      }
    }
  }, [timeCounter]);

  const handlerAnswer = async () => {
    if (!roomId) return;
    const token = await AsyncStorage.getItem(`gameToken-${roomId[0]}`);

    if (token) {
      const request = await fetch(`http://10.0.119.37:3000/room/answer/${question.info.id}`, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(token),
          type: question.type,
          answer: question.type === 'QUIZ_4_ANSWER' ? choiceSelected[0] : choiceSelected,
        }),
      });

      const data = await request.json();
      return data;
    }
  };

  useEffect(() => {
    if (question.fetchDone) {
      if (!finishAnswer) return;
      stopTimeCounter();
      if (!click) {
        let newChoiceSelected = [randomNumber(1, 4)];
        setChoiceSelected([...newChoiceSelected]);
      }
      handlerAnswer().then((e) => {
        console.log(e);
        prepareNextQuestion();
      });
    }
  }, [finishAnswer]);

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const stopTimeCounter = () => {
    window.clearInterval(timeCounterInterval.current);
  };

  const prepareNextQuestion = () => {
    setTimeout(() => {
      if (question.mode == 'COMPETITIVE') {
        push(`/room/${roomId}/leaderBoard/${order}`);
      } else {
        push(`/room/${roomId}/bossHP/${order}`);
      }
    }, 2000);
  };

  const selectChoice = (order: number) => {
    let newChoiceSelected;
    if (isHost || finishAnswer) return;
    if (!click) {
      setClick(true);
      newChoiceSelected = [order];
      if (question.type == 'QUIZ_4_ANSWER') {
        setFinishAnswer(true);
      }
    } else if (question.type == 'MULTI_SELECT_ANSWER') {
      if (choiceSelected.indexOf(order) != -1) {
        const removeIndex = choiceSelected.indexOf(order);
        choiceSelected.splice(removeIndex, 1);
        newChoiceSelected = [...choiceSelected];
      } else {
        newChoiceSelected = [...choiceSelected, order];
      }
    }
    setChoiceSelected([...newChoiceSelected]);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const finishAnswerButton = () => {
    setFinishAnswer(true);
  };

  const renderFinishButton = () => {
    if (question.type == 'QUIZ_4_ANSWER') return;
    if (!finishAnswer) {
      if (click || (question.type == 'TYPE_ANSWER' && typeSelectAnswer != '')) {
        return (
          <Button theme="dark_Button" mb="$2" onPress={finishAnswerButton}>
            ยืนยันคำตอบ
          </Button>
        );
      }
      if (question.type == 'TYPE_ANSWER') {
        return (
          <Button color="white" theme="dark_Button" mb="$2" disabled>
            คุณยังไม่ได้ตอบคำถาม
          </Button>
        );
      }
      return (
        <Button color="white" theme="dark_Button" mb="$2" disabled>
          คุณยังไม่ได้เลือกคำตอบ
        </Button>
      );
    } else {
      return (
        <Button color="white" disabled theme="dark_Button" mb="$2">
          คุณยืนยันคำตอบเรียบร้อยแล้ว
        </Button>
      );
    }
  };

  const renderBossHP = () => {
    return (
      <Progress size="$6" value={HP} mt="$5" backgroundColor="white">
        <Progress.Indicator backgroundColor="$red10Light" animation="lazy" />
      </Progress>
    );
  };

  if (!question.fetchDone) return <LoadingSpinner />;

  return (
    <>
      <ModalQuestion
        mode={question.mode}
        question={question.question}
        timeLeft={timeCounter - question.timeAnswerQuestion}
        order={Number(order)}
        closeModal={closeModal}
        openModal={openModal}
      />
      <YStack f={1} backgroundColor="black" jc="center">
        {question.mode == 'COOPERATIVE' && renderBossHP()}
        <XStack ai="center">
          <H2 theme="white_Text" margin="$5" fow="800">
            คำถามที่ {order} / {sumQuestion}
          </H2>
          {question.mode == 'COOPERATIVE' && (
            <Button theme="dark_Button" ml="$3" onPress={() => setOpenModal(true)}>
              แสดงคำถาม
            </Button>
          )}
        </XStack>
        <Paragraph style={global_style.padding10}>
          {timeCounter > 0
            ? `คุณเหลือเวลาตอบคำถามอีก ${timeCounter} วินาที`
            : `หมดเวลาตอบคำถามแล้ว`}
        </Paragraph>
        <XStack flex={1} jc="center" ai="center" flexWrap="wrap">
          {question.type != 'TYPE_ANSWER' ? (
            question.choices.map((choice, index) => (
              <Card
                key={index}
                backgroundColor={
                  choiceSelected.includes(index + 1) ? backgroundChoices[index] : 'gray'
                }
                w="50%"
                h="50%"
                animation="lazy"
                size="$4"
                scale={0.95}
                pressStyle={{ scale: 0.9 }}
                jc="center"
                ai="center"
                onPress={() => selectChoice(index + 1)}
              >
                <Text>{choice}</Text>
                {isHost && <Text>({amountUserSelectChoice[index]})</Text>}
              </Card>
            ))
          ) : (
            <TextArea
              editable={finishAnswer ? false : true}
              m="$2"
              flex={1}
              als="stretch"
              multiline
              theme="dark_TextArea"
              value={typeSelectAnswer}
              onChangeText={setTypeSelectAnswer}
            />
          )}
        </XStack>
        {question.type != 'QUIZ_4_ANSWER' && renderFinishButton()}
      </YStack>
    </>
  );
}
