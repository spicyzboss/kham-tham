enum TypeSelect {
  SingleSelect = "SingleSelect",
  MultipleSelect = "MultipleSelect",
  TypeSelect = "TypeSelect",
}
type CreateQuestion4Question = {
  question: string
  choice1: string
  choice2: string
  choice3: string
  choice4: string
  answer: Int
  timeDisplayQuestion: Int
  timeAnswerQuestion: Int
  type: string
  score: Float
}
type CreateMultiSelectQuestion = {
  question: string
  choice1: string
  choice2: string
  choice3: string
  choice4: string
  answer: JSONArray
  timeDisplayQuestion: Int
  timeAnswerQuestion: Int
  type: string
  score: Float
}

type CreateTypeQuestion = {
  question: string
  answer: string
  timeDisplayQuestion: Int
  timeAnswerQuestion: Int
  type: string
  score: Float
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
  BossGetDamaged: {
    roomId: string;
    order: string;
  };
  ResultCooperativeScreen: {
    roomId: string;
  };
};
