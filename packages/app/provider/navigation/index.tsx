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
          CreateQuestionScreen: '/room/createQuestion/:roomName/:mode',
          QuestionScreen: '/room/:roomId/question/:order',
          CompetitiveScoreScreen: '/room/:roomId/leaderBoard/:order',
          StatisticRoomScreen: '/room/statistic/:roomId',
          EnterCodeRoomScreen: '/code',
          BossGetDamaged: '/room/:roomId/bossHP/:order',
          ResultCooperativeScreen: '/room/:roomId/resultBossHP',
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
