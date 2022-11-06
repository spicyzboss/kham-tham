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
              'login': 'login',
              'signUp': 'signUp',
              'create-room': 'create-room',
              'user-room': 'user-room',
              'show-room': 'show-room',
              'selectMode-room': 'selectMode-room',
              'comp-question': 'comp-question',
              'coop-question': 'coop-question',
              'comp-score': 'comp-score'
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
