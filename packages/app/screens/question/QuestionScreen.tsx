import { H2, Paragraph, YStack, Text, Card, XStack } from '@my/ui';
import { useState, useRef, useEffect } from 'react';
import { ModalQuestion } from 'app/components/question';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import global_style from '../../../assets/global_style';


export default function QuestionScreen() {
  // setting part
  const { push } = useRouter()
  const { useParam } = createParam()

  // param part
  const [order] = useParam("order")
  const [roomId] = useParam("roomId")

  // question part 
  const [sumQuestion, setSumQuestion] = useState(0);
  const [question, setQuestion] = useState<Question>({
    description: "description",
    score: 1000,
    choices: ["wave1", "wave2", "wave3", "wave4"],
    showQuestion: 5,
    answerQuestion: 5
  });

  // choices part
  const backgroundChoices = ['$red11Dark', '$green11Dark', '$blue11Dark', '$yellow6Light']
  const [choiceSelected, setChoiceSelected] = useState<number[]>([0, 1, 2, 3])

  // host part
  const isHost = true
  const amountUserSelectChoice = [3, 2, 4, 5]

  // time counter part
  const [timeCounter, setTimeCounter] = useState(question.showQuestion + question.answerQuestion)
  const timeCounterInterval = useRef<number | null>(null)
  // modal
  const [openModal, setOpenModal] = useState(true)

  useEffect(() => {
    timeCounterInterval.current = window.setInterval(() => {
      setTimeCounter(prev => prev - 1)
    }, 1000)


    if (timeCounter <= question.showQuestion) {
      setOpenModal(false)
    }

    if (timeCounter <= 0) {
      stopTimeCounter()
      navigateToNextQuestion()
    }

    console.log(timeCounter)

    return () => window.clearInterval(timeCounterInterval.current)

  }, [timeCounter])

  // useEffect(() => {


  // }, [timeCounter])

  const stopTimeCounter = () => {
    window.clearInterval(timeCounterInterval.current)
  }

  const navigateToNextQuestion = () => {
    setOpenModal(true)
    setTimeCounter(question.showQuestion + question.answerQuestion)
    push(`/room/${roomId}/question/${Number(order) + 1}`)
  }

  const selectChoice = (index: number) => {
    if (!isHost) {
      const newChoiceSelected = [index]
      setChoiceSelected([...newChoiceSelected])
    }
  }

  const closeModal = () => {
    setOpenModal(false)
  }


  return (
    <>
      <ModalQuestion description={question.description} timeLeft={timeCounter - question.answerQuestion} order={Number(order)} closeModal={closeModal} openModal={openModal} />
      <YStack f={1} backgroundColor="black">
        <H2 color="#FFFCFC" margin="$5" fow="800">
          คำถามที่ {order} / {sumQuestion}
        </H2>
        <Paragraph style={global_style.padding10}>
          คุณเหลือเวลาตอบคำถามอีก {timeCounter} วินาที
        </Paragraph>
        <XStack h="80%" w="100%" jc="center" ai="center" flexWrap='wrap'>
          {question.choices.map((choice, index) => (
            <Card
              backgroundColor={choiceSelected.includes(index) ? backgroundChoices[index] : "gray"}
              w="50%"
              h="50%"
              animation="bouncy"
              size="$4"
              scale={0.95}
              pressStyle={{ scale: 0.875 }}
              jc="center"
              ai="center"
              onPress={() => selectChoice(index)}
            >
              <Text>{choice}</Text>
              {isHost && <Text>({amountUserSelectChoice[index]})</Text>}
            </Card>
          ))}
        </XStack>
      </YStack>
    </>
  );
}
