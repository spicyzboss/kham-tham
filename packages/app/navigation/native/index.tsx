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
import { CompetitiveQuestion } from 'app/features/question/comp-question'
import { CooperativeQuestion } from 'app/features/question/coop-question'
import { CompetitiveScore } from 'app/features/question/comp-score'

const Stack = createNativeStackNavigator<{
  'home': undefined
  'user-detail': {
    id: string
  }
  'login': undefined
  'signIn': undefined
  'signUp': undefined
  'create-room': undefined
  'user-room': undefined,
  'show-room': undefined
  'selectMode-room': undefined
  'comp-question': undefined
  'coop-question': undefined
  'comp-score': undefined
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
        name="comp-question"
        component={CompetitiveQuestion}
        options={{
          title: 'CompetitiveQuestion'
        }}
      />
      <Stack.Screen
        name="coop-question"
        component={CooperativeQuestion}
        options={{
          title: 'CooperativeQuestion'
        }}
      />
      <Stack.Screen
        name="comp-score"
        component={CompetitiveScore}
        options={{
          title: 'CompetitiveScore'
        }}

      />

    </Stack.Navigator>
  )
}
