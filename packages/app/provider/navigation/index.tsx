import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { useNavigationContainerRef } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import { ReactNode, useMemo } from 'react';

type NavigationProviderProps = {
  children: ReactNode;
};

export default function NavigationProvider({ children }: NavigationProviderProps) {
  const navigationContainerRef = useNavigationContainerRef<KhamThamScreen>();

  const linking: LinkingOptions<KhamThamScreen> = useMemo(
    () => ({
      prefixes: [createURL('/')],
      config: {
        initialRouteName: 'HomeScreen',
        screens: {
          HomeScreen: '/home',
          UserDetailScreen: '/users/:id',
          SignUpScreen: '/sign-up',
          LoginScreen: '/login',
          UserRoomScreen: '/room/user',
          CreateRoomScreen: '/room/create',
          SelectModeRoomScreen: '/room/mode',
          ShowRoomScreen: '/room/:roomId',
          WaitingRoomScreen: '/room/:roomId/waiting',
          CreateQuestionScreen: '/question/:mode/:roomId',
          QuestionScreen: '/question/:roomId/:order',
          CompetitiveScoreScreen: '/:roomId/comp-score',
          StatisticRoomScreen: '/room/statistic/:roomId',
          EnterCodeRoomScreen: '/code',
        },
      },
    }),
    []
  );

  return (
    <NavigationContainer ref={navigationContainerRef} linking={linking}>
      {children}
    </NavigationContainer>
  );
}
