import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { CreateRoom } from 'app/features/room/create-room'
import { UserRoom } from 'app/features/room/user-room'

const Stack = createNativeStackNavigator<{
  'home': undefined
  'user-detail': {
    id: string
  },
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
    </Stack.Navigator>
  )
}
