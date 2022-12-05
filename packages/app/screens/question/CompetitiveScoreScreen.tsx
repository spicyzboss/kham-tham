import { YStack, H2, Paragraph, YGroup, ListItem, H3, H4, Button, Image } from '@my/ui';
import { useEffect, useState } from 'react';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import { Star, Flag } from "@tamagui/feather-icons"
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string,
  score: number
}

export default function CompetitiveScoreScreen() {

  const isFocused = useIsFocused()

  const { push } = useRouter()
  const { useParam } = createParam()

  const [order] = useParam("order")
  const [roomId] = useParam("roomId")
  // const [roomQuestionId] = useParam("roomQuestionId")
  const roomQuestionId = 8

  const [userScore, setUserScore] = useState<User[]>([{
    name: "wave", score: 500
  }, {
    name: "pao", score: 200
  }, {
    name: "parew", score: 300
  }, {
    name: "pun", score: 100
  }])

  const [amountQuestions, setAmountQuestions] = useState(0)

  const top3Score: User[] = userScore.slice(0, 3)
  const yourInfo: User = userScore.find(user => user.name == "pun") as User

  const delay = 2 * 1000

  const fetchPlayerScoreInRoom = async (url) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }

  useEffect(() => {
    if (isFocused) {
      // fetchPlayerScoreInRoom(`http://192.168.0.100:3000/room/${roomId}/question/${roomQuestionId}/playerScore`).then(result => {
      //   console.log("result", result[Number(order) - 1].PlayerAnswerQuestion)
      //   setAmountQuestions(result.length)
      // })


      setTimeout(() => {
        if (Number(order) + 1 > 2) {

        } else {
          push(`/room/${roomId}/question/${Number(order) + 1}`)
        }
      }, delay)
    }
  }, [isFocused])

  const leaveTheRoom = async () => {
    await AsyncStorage.removeItem("playerToken")
    push("/home")
  }

  // return (
  //   <YStack f={1} backgroundColor="black" jc="center">
  //     <YStack m="$5">
  //       <H2 theme="white_Text" fow="800" ta="center">
  //         Leader Board
  //       </H2>
  //       <Paragraph theme="white_Text" ta="center">คะแนนรวมคำถามที่ {order} / {amountQuestions}</Paragraph>
  //     </YStack>
  //     <YGroup w="80%" als="center" bordered size="$6" theme="dark">
  //       {top3Score.map((user, index) => (
  //         <ListItem theme={index == 0 ? "yellow_Text" : "dark"} icon={index == 0 ? Star : Flag} title={user.name} subTitle={`${user.score} คะแนน`} key={index} />
  //       ))}
  //     </YGroup>
  //     <YStack m="$5">
  //       <H3 ta="center" theme="white_Text">ปัจจุบันคุณ <H3 theme="crimson_Text">{yourInfo?.name}</H3> อยู่ลำดับที่ <H2 theme="crimson_Text">{userScore.indexOf(yourInfo) + 1}</H2> {'\n'} จากผู้เล่นทั้งหมด {userScore.length} คน {"\n"} <H4>(คุณมี <H4 theme="crimson_Text">{yourInfo.score}</H4> คะแนน)</H4></H3>
  //     </YStack>
  //     <Button theme="dark_Button" size="$6" onPress={leaveTheRoom}>Leave the Room</Button>
  //   </YStack>
  // );

  return (
    <YStack f={1} backgroundColor="black" jc="center">
      <Image width={400} height={400} src={require('../../../assets/BossAlive.png')} />
    </YStack>
  )
}
