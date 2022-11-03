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
<<<<<<< HEAD
              login: 'login',
              SignIn: 'signIn',
=======
              'create-room': 'create-room'
>>>>>>> 8f279e70e33047b67f47c00bf2f4b979b6d14f75
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
