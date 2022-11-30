import { H2, Paragraph, YStack, Text, Card, XStack, Button, TextArea } from '@my/ui';
import { useState, useRef, useEffect } from 'react';
import { ModalQuestion } from 'app/components/question';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import global_style from '../../../assets/global_style';
import { useIsFocused } from '@react-navigation/native';
import { RoomQuestion } from '@prisma/client';


export default function QuestionScreen() {
  // setting part
  const { push } = useRouter()
  const { useParam } = createParam()

  const isFocused = useIsFocused()

  // param part
  const [order] = useParam("order")
  const [roomId] = useParam("roomId")

  // question part 
  const [sumQuestion, setSumQuestion] = useState(0);
  const [question, setQuestion] = useState({
    description: "description",
    score: 1000,
    choices: ["wave1", "wave2", "wave3", "wave4"],
    showQuestion: 2,
    answerQuestion: 2,
    type: "MultiSelect",
  });
  const [click, setClick] = useState(false)
  const [finishAnswer, setFinishAnswer] = useState(false)

  // choices part
  const backgroundChoices = ['$red11Dark', '$green11Dark', '$blue11Dark', '$yellow6Light']
  const [choiceSelected, setChoiceSelected] = useState<number[]>([1, 2, 3, 4])
  const [typeSelectAnswer, setTypeSelectAnswer] = useState("")

  // host part
  const isHost = false
  const amountUserSelectChoice = [3, 2, 4, 5]

  // time counter part
  const [timeCounter, setTimeCounter] = useState(question.showQuestion + question.answerQuestion)
  const timeCounterInterval = useRef<number | null>(null)
  // modal
  const [openModal, setOpenModal] = useState(true)

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    if (timeCounter <= question.showQuestion) {
      setOpenModal(false)
    }

    if (timeCounter <= 0) {
      stopTimeCounter()
      setFinishAnswer(true)
      if (!click) {
        let newChoiceSelected = [randomNumber(1, 4)]
        setChoiceSelected([...newChoiceSelected])
      }
      setTimeout(() => {
        prepareNextQuestion()
      }, 2000)
    }
  }, [timeCounter])

  useEffect(() => {
    if (isFocused) {
      initiateValue()
      timeCounterInterval.current = window.setInterval(() => {
        setTimeCounter(prev => prev - 1)
      }, 1000)

    }
  }, [isFocused])

  const initiateValue = () => {
    setClick(false)
    setFinishAnswer(false)
    setOpenModal(true)
    setTimeCounter(question.showQuestion + question.answerQuestion)
    setChoiceSelected([1, 2, 3, 4])
  }

  const stopTimeCounter = () => {
    window.clearInterval(timeCounterInterval.current)
  }

  const prepareNextQuestion = () => {
    // push(`/room/${roomId}/leaderBoard/${order}`)
  }

  const selectChoice = (order: number) => {
    let newChoiceSelected
    if (isHost || finishAnswer) return;
    if (!click) {
      setClick(true)
      newChoiceSelected = [order]
      if (question.type == "SingleSelect") setFinishAnswer(true)
    }
    else if (question.type == "MultiSelect") {
      if (choiceSelected.indexOf(order) != -1) {
        const removeIndex = choiceSelected.indexOf(order);
        choiceSelected.splice(removeIndex, 1)
        newChoiceSelected = [...choiceSelected]
      } else {
        newChoiceSelected = [...choiceSelected, order]
      }
    }
    setChoiceSelected([...newChoiceSelected])
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const finishMultiSelectAnswer = () => {
    setFinishAnswer(true)
  }

  const renderFinishButton = () => {
    if (question.type == "SingleSelect") return
    if (!finishAnswer) {
      if (click || (question.type == "TypeSelect" && typeSelectAnswer != "")) {
        return (
          <Button theme="dark_Button" mb="$2" onPress={finishMultiSelectAnswer}>ยืนยันคำตอบ</Button>
        )
      }
      if (question.type == "TypeSelect") {
        return (
          <Button color="white" theme="dark_Button" mb="$2" disabled>คุณยังไม่ได้ตอบคำถาม</Button>
        )
      }
      return (
        <Button color="white" theme="dark_Button" mb="$2" disabled>คุณยังไม่ได้เลือกคำตอบ</Button>
      )
    } else {
      return (
        <Button color="white" disabled theme="dark_Button" mb="$2">คุณยืนยันคำตอบเรียบร้อยแล้ว</Button>
      )
    }
  }


  return (
    <>
      <ModalQuestion description={question.description} timeLeft={timeCounter - question.answerQuestion} order={Number(order)} closeModal={closeModal} openModal={openModal} />
      <YStack f={1} backgroundColor="black">
        <H2 theme="white_Text" margin="$5" fow="800">
          คำถามที่ {order} / {sumQuestion}
        </H2>
        <Paragraph style={global_style.padding10}>
          {timeCounter > 0 ? (
            `คุณเหลือเวลาตอบคำถามอีก ${timeCounter} วินาที`
          ) : (
            `หมดเวลาตอบคำถามแล้ว`
          )}
        </Paragraph>
        <XStack flex={1} jc="center" ai="center" flexWrap='wrap'>
          {question.type != "TypeSelect" ? question.choices.map((choice, index) => (
            <Card
              key={index}
              backgroundColor={choiceSelected.includes(index + 1) ? backgroundChoices[index] : "gray"}
              w="50%"
              h="50%"
              animation="bouncy"
              size="$4"
              scale={0.95}
              pressStyle={{ scale: 0.875 }}
              jc="center"
              ai="center"
              onPress={() => selectChoice(index + 1)}
            >
              <Text>{choice}</Text>
              {isHost && <Text>({amountUserSelectChoice[index]})</Text>}
            </Card>
          )) : (
            <TextArea editable={finishAnswer ? false : true} m="$2" flex={1} als="stretch" multiline theme="dark_TextArea" value={typeSelectAnswer} onChangeText={setTypeSelectAnswer}>
            </TextArea>
          )}
        </XStack>
        {question.type != "SingleSelect" && renderFinishButton()}
      </YStack>
    </>
  );
}
