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
              'create-question': ':roomId/create-question',
              'show-room': ':roomId/show-room',
              'enter-code-room': 'enter-code-room',
              'waiting-room': ':roomId/waiting-room',
              'comp-question': ':roomId/comp-question',
              'coop-question': ':roomId/coop-question',
              'comp-score': ':roomId/comp-score'
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
