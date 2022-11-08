import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from 'app/features/home/screen'
import { UserDetailScreen } from 'app/features/user/detail-screen'
import { LoginScreen } from 'app/features/login/login'
import { CreateRoom } from 'app/features/room/create-room'
import { SignUpScreen } from 'app/features/login/signUp'
import { UserRoom } from 'app/features/room/user-room'
import { ShowRoom } from 'app/features/room/show-room'
import { SelectModeRoom } from 'app/features/room/selectMode-room'
import { Question } from 'app/features/question/question'
import { CreateQuestion } from 'app/features/question/createQuestion'
import { EnterCodeRoom } from 'app/features/player/enterCodeRoom'
import { WaitingRoom } from 'app/features/player/waitingRoom'
import { CompetitiveScore } from 'app/features/question/comp-score'
import { StatisticRoom } from 'app/features/statistic/statisticRoom'

const Stack = createNativeStackNavigator<{
  'home': undefined,
  'user-detail': {
    id: string
  },
  'login': undefined,
  'signIn': undefined,
  'signUp': undefined,
  'create-room': undefined,
  'user-room': undefined,
  'show-room': {
    roomId: string,
  },
  'selectMode-room': undefined,
  'question': {
    roomId: string,
    order: number
  },
  'create-question': {
    roomId: string,
    mode: string
  },
  // player room
  'enter-code-room': undefined,
  'waiting-room': {
    roomId: string,
  },
  'comp-score': {
    roomId: string,
  },
  'statistic-room': {
    roomId: string,
  }
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUpScreen}
        options={{
          title: 'SignUp',
        }}
      />
      <Stack.Screen
        name="create-room"
        component={CreateRoom}
        options={{
          title: 'CreateRoom',
        }}
      />
      <Stack.Screen
        name="user-room"
        component={UserRoom}
        options={{
          title: 'UserRoom',
        }}
      />
      <Stack.Screen
        name="show-room"
        component={ShowRoom}
        options={{
          title: 'ShowRoom',
        }}
      />
      <Stack.Screen
        name="selectMode-room"
        component={SelectModeRoom}
        options={{
          title: 'SelectModeRoom',
        }}
      />
      <Stack.Screen
        name="question"
        component={Question}
        options={{
          title: 'Question'
        }}
      />
      <Stack.Screen
        name="create-question"
        component={CreateQuestion}
        options={{
          title: 'CreateCompQuestion'
        }}
      />
      <Stack.Screen
        name="enter-code-room"
        component={EnterCodeRoom}
        options={{
          title: 'EnterCodeRoom'
        }}
      />
      <Stack.Screen
        name="waiting-room"
        component={WaitingRoom}
        options={{
          title: 'WaitingRoom'
        }}
      />
      <Stack.Screen
        name="comp-score"
        component={CompetitiveScore}
        options={{
          title: 'CompetitiveScore'
        }}
      />
      <Stack.Screen
        name="statistic-room"
        component={StatisticRoom}
        options={{
          title: 'StatisticRoom'
        }}
      />

    </Stack.Navigator>
  )
}
