import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { LoginScreen } from '../../features/login/login'
import { CreateRoom } from 'app/features/room/create-room'
import { SignUpScreen } from 'app/features/login/signUp'

const Stack = createNativeStackNavigator<{
  'home': undefined
  'user-detail': {
    id: string
  }
  login: undefined
  signIn: undefined
  'signUp': undefined
  'create-room': undefined
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

    </Stack.Navigator>
  )
}
