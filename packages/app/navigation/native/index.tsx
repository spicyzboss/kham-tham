import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from 'app/features/home/HomeScreen';
import UserDetailScreen from 'app/features/user/UserDetailScreen';
import LoginScreen from 'app/features/login/LoginScreen';
import CreateRoomScreen from 'app/features/room/CreateRoomScreen';
import SignUpScreen from 'app/features/login/SignUpScreen';
import UserRoomScreen from 'app/features/room/UserRoomScreen';
import ShowRoomScreen from 'app/features/room/ShowRoomScreen';
import SelectModeRoomScreen from 'app/features/room/SelectModeRoomScreen';
import QuestionScreen from 'app/features/question/QuestionScreen';
import CreateQuestionScreen from 'app/features/question/CreateQuestionScreen';
import EnterCodeRoomScreen from 'app/features/player/EnterCodeRoomScreen';
import WaitingRoomScreen from 'app/features/player/WaitingRoomScreen';
import CompetitiveScoreScreen from 'app/features/question/CompetitiveScoreScreen';
import StatisticRoomScreen from 'app/features/statistic/StatisticRoomScreen';

const Stack = createNativeStackNavigator<KhamThamScreen>();

export default function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: 'SignUp',
        }}
      />
      <Stack.Screen
        name="CreateRoomScreen"
        component={CreateRoomScreen}
        options={{
          title: 'CreateRoom',
        }}
      />
      <Stack.Screen
        name="UserRoomScreen"
        component={UserRoomScreen}
        options={{
          title: 'UserRoom',
        }}
      />
      <Stack.Screen
        name="ShowRoomScreen"
        component={ShowRoomScreen}
        options={{
          title: 'ShowRoom',
        }}
      />
      <Stack.Screen
        name="SelectModeRoomScreen"
        component={SelectModeRoomScreen}
        options={{
          title: 'SelectModeRoom',
        }}
      />
      <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{
          title: 'Question',
        }}
      />
      <Stack.Screen
        name="CreateQuestionScreen"
        component={CreateQuestionScreen}
        options={{
          title: 'CreateCompQuestion',
        }}
      />
      <Stack.Screen
        name="EnterCodeRoomScreen"
        component={EnterCodeRoomScreen}
        options={{
          title: 'EnterCodeRoom',
        }}
      />
      <Stack.Screen
        name="WaitingRoomScreen"
        component={WaitingRoomScreen}
        options={{
          title: 'WaitingRoom',
        }}
      />
      <Stack.Screen
        name="CompetitiveScoreScreen"
        component={CompetitiveScoreScreen}
        options={{
          title: 'CompetitiveScore',
        }}
      />
      <Stack.Screen
        name="StatisticRoomScreen"
        component={StatisticRoomScreen}
        options={{
          title: 'StatisticRoom',
        }}
      />
    </Stack.Navigator>
  );
}
