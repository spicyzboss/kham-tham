import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
<<<<<<< HEAD
import { LoginScreen } from '../../features/login/login'
=======
import { CreateRoom } from 'app/features/room/create-room'
>>>>>>> 8f279e70e33047b67f47c00bf2f4b979b6d14f75
import { UserRoom } from 'app/features/room/user-room'

const Stack = createNativeStackNavigator<{
  'home': undefined
  'user-detail': {
    id: string
<<<<<<< HEAD
  }
  login: undefined
  signIn: {
    email: string,
    password: string
  }
=======
  },
  'create-room': undefined
>>>>>>> 8f279e70e33047b67f47c00bf2f4b979b6d14f75
  'create-room': undefined,
  'user-room': undefined
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
<<<<<<< HEAD
        name="login"
        component={LoginScreen}
        options={{
          title: 'Login',
=======
        name="create-room"
        component={CreateRoom}
        options={{
          title: 'CreateRoom',
>>>>>>> 8f279e70e33047b67f47c00bf2f4b979b6d14f75
        }}
      />
      <Stack.Screen
        name="user-room"
        component={UserRoom}
        options={{
          title: 'UserRoom',
        }}
      />
    </Stack.Navigator>
  )
}
