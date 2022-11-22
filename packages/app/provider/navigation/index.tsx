import { NavigationContainer } from '@react-navigation/native';
import { useNavigationContainerRef } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import { ReactNode, useMemo } from 'react';

type NavigationProviderProps = {
  children: ReactNode;
};

export default function NavigationProvider({ children }: NavigationProviderProps) {
  const navigationContainerRef = useNavigationContainerRef<KhamThamScreen>();

  return (
    <NavigationContainer
      ref={navigationContainerRef}
      linking={useMemo(
        () => ({
          prefixes: [createURL('')],
          config: {
            initialRouteName: 'HomeScreen',
            screens: {
              HomeScreen: createURL('/'),
              UserDetailScreen: createURL('/users/:id'),
              SignUpScreen: createURL('/sign-up'),
              LoginScreen: createURL('/login'),
              UserRoomScreen: createURL('/room/user'),
              CreateRoomScreen: createURL('/room/create'),
              SelectModeRoomScreen: createURL('/room/mode'),
              ShowRoomScreen: createURL('/room/:roomId'),
              WaitingRoomScreen: createURL('/room/waiting/:roomId'),
              CreateQuestionScreen: createURL('/question/:mode/:roomId'),
              QuestionScreen: createURL('/question/:roomId/:order'),
              CompetitiveScoreScreen: createURL('/:roomId/comp-score'),
              StatisticRoomScreen: createURL('/room/statistic/:roomId'),
              EnterCodeRoomScreen: createURL('/code'),
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  );
}
