type GameMode = 'Competitive' | 'Cooperative';

type Choice = string[];

interface Question {
  score: number;
  choices: Choice;
  showQuestion: number;
  answerQuestion: number;
}

type KhamThamScreen = {
  HomeScreen: undefined;
  UserDetailScreen: {
    id: string;
  };
  LoginScreen: undefined;
  CreateRoomScreen: undefined;
  SignUpScreen: undefined;
  UserRoomScreen: undefined;
  ShowRoomScreen: {
    roomId: string;
  };
  SelectModeRoomScreen: undefined;
  QuestionScreen: {
    roomId: string;
    order: number;
  };
  CreateQuestionScreen: {
    roomId: string;
    mode: string;
  };
  EnterCodeRoomScreen: undefined;
  WaitingRoomScreen: {
    roomId: string;
  };
  CompetitiveScoreScreen: {
    roomId: string;
  };
  StatisticRoomScreen: {
    roomId: string;
  };
};
