import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from 'app/screens/home/HomeScreen';
import UserDetailScreen from 'app/screens/user/UserDetailScreen';
import LoginScreen from 'app/screens/login/LoginScreen';
import CreateRoomScreen from 'app/screens/room/CreateRoomScreen';
import SignUpScreen from 'app/screens/login/SignUpScreen';
import UserRoomScreen from 'app/screens/room/UserRoomScreen';
import ShowRoomScreen from 'app/screens/room/ShowRoomScreen';
import SelectModeRoomScreen from 'app/screens/room/SelectModeRoomScreen';
import QuestionScreen from 'app/screens/question/QuestionScreen';
import CreateQuestionScreen from 'app/screens/question/CreateQuestionScreen';
import EnterCodeRoomScreen from 'app/screens/player/EnterCodeRoomScreen';
import WaitingRoomScreen from 'app/screens/player/WaitingRoomScreen';
import CompetitiveScoreScreen from 'app/screens/question/CompetitiveScoreScreen';
import StatisticRoomScreen from 'app/screens/statistic/StatisticRoomScreen';

const Stack = createNativeStackNavigator<KhamThamScreen>();

export default function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
