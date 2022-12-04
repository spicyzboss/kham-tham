import React, { useState } from 'react';
import { View } from 'react-native';
import CreateButton from 'app/components/CreateButton';
import globalStyles from '../../../assets/global_style';
import { H1, Input, XStack, Button } from '@my/ui';
import CardKhamTham from '../../components/room/CardKhamTham';
import LoadingSpinner from 'app/components/LoadingSpinner';
import useSWR from 'swr';
import { GameMode } from '@prisma/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface KhamTham {
  id: number;
  roomId: number;
  name: string;
  amountQuestions: number;
  mode: GameMode;
}

export default function UserRoomScreen() {
  const [khamThams, setKhamThams] = useState<KhamTham[]>([]);
  const [inputFilter, setInputFilter] = useState<string>('');
  const [filterByCompetitive, setFilterByCompetitive] = useState<boolean>(false);
  const [filterByCooperative, setFilterByCooperative] = useState<boolean>(false);
  const [token, setToken] = useState('');

  let filterKhamThams = khamThams.filter((khamTham) => khamTham.name.includes(inputFilter));
  if (filterByCompetitive)
    filterKhamThams = filterKhamThams.filter((khamThams) => khamThams.mode == 'COMPETITIVE');
  if (filterByCooperative)
    filterKhamThams = filterKhamThams.filter((khamThams) => khamThams.mode == 'COOPERATIVE');
  const amountFilterKhamThams = filterKhamThams.length;

  const filterByMode = (mode: string) => {
    if (mode === 'COMPETITIVE') {
      setFilterByCompetitive((prev) => !prev);
      setFilterByCooperative(false);
    } else {
      setFilterByCooperative((prev) => !prev);
      setFilterByCompetitive(false);
    }
  };

  const checkHasToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setToken(token);
    }
  };

  const fetchRooms = (url: string) => {
    return fetch(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => res.json());
  };

  const { data, error } = useSWR('/room/owner', fetchRooms);

  if (error) return <Button>error</Button>;

  if (!data) return <LoadingSpinner />;

  setKhamThams(data);

  return (
    <View style={[globalStyles.container, globalStyles.padding10]}>
      <H1 theme="white_Text">Kham Tham ({amountFilterKhamThams})</H1>
      <Input
        borderColor={'$blue11Dark'}
        placeholderTextColor={'$gray9Light'}
        backgroundColor={'$blue3Light'}
        onChangeText={(text) => setInputFilter(text)}
      />
      <XStack justifyContent="center" w={'100%'} mt="$2">
        <Button
          w={'50%'}
          theme={filterByCompetitive ? 'crimson_Button' : 'light'}
          onPress={() => filterByMode('COMPETITIVE')}
        >
          COMPETITIVE
        </Button>
        <Button
          w={'50%'}
          theme={filterByCooperative ? 'lime_Button' : 'light'}
          onPress={() => filterByMode('COOPERATIVE')}
        >
          COOPERATIVE
        </Button>
      </XStack>
      {filterKhamThams.map((khamTham, index) => {
        return (
          <CardKhamTham
            animation="bouncy"
            w={'100%'}
            scale={1}
            pressStyle={{ scale: 0.95 }}
            key={khamTham.id}
            roomId={khamTham.roomId}
            name={khamTham.name}
            amountQuestions={khamTham.amountQuestions}
            mode={khamTham.mode}
          ></CardKhamTham>
        );
      })}
      <CreateButton to="/room/mode" />
    </View>
  );
}
