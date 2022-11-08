import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'home',
            screens: {
              'home': '',
              'user-detail': 'user/:id',
              'signUp': 'signUp',
              'login': 'login',
              'user-room': 'user-room',
              'create-room': 'create-room',
              'selectMode-room': 'selectMode-room',
              'create-question': ':roomId/:mode/create-question',
              'show-room': ':roomId/show-room',
              'enter-code-room': 'enter-code-room',
              'waiting-room': ':roomId/waiting-room',
              'question': ':roomId/question/:order',
              'comp-score': ':roomId/comp-score',
              'statistic-room': ':roomId/statistic-room'
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
