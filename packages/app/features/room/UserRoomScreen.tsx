import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CreateButton from 'app/components/CreateButton';
import globalStyles from '../../../assets/global_style';
import { H1, Input, XStack, Button } from '@my/ui';
import CardKhamTham from '../../components/room/CardKhamTham';
import useSWR from 'swr';
import axios from 'axios';

interface KhamTham {
  id: number;
  name: string;
  amountQuestions: number;
  mode: GameMode;
}

export default function UserRoomScreen() {
  const [khamThams, setKhamThams] = useState<KhamTham[]>([]);
  const [inputFilter, setInputFilter] = useState<string>('');
  const [filterByCompetitive, setFilterByCompetitive] = useState<boolean>(false);
  const [filterByCooperative, setFilterByCooperative] = useState<boolean>(false);

  let filterKhamThams = khamThams.filter((khamTham) => khamTham.name.includes(inputFilter));
  if (filterByCompetitive)
    filterKhamThams = filterKhamThams.filter((khamThams) => khamThams.mode == 'Competitive');
  if (filterByCooperative)
    filterKhamThams = filterKhamThams.filter((khamThams) => khamThams.mode == 'Cooperative');
  const amountFilterKhamThams = filterKhamThams.length;

  const filterByMode = (mode: string) => {
    if (mode == 'competitive') {
      setFilterByCompetitive((prev) => !prev);
      setFilterByCooperative(false);
    }
    if (mode == 'cooperative') {
      setFilterByCooperative((prev) => !prev);
      setFilterByCompetitive(false);
    }
  };

  const fetchRooms = (url) => axios.get(url).then((r) => r.data);

  const { data, error } = useSWR('/room', fetchRooms);

  if (!data && !error) return <Button>Loading . . .</Button>;

  return (
    <View style={[globalStyles.container, globalStyles.padding10]}>
      <H1 color="#FFFCFC">Kham Tham ({amountFilterKhamThams})</H1>
      <Input
        borderColor={'$blue11Dark'}
        placeholderTextColor={'$gray9Light'}
        placeholder=""
        backgroundColor={'$blue3Light'}
        color={'#17151F'}
        onChangeText={(text) => setInputFilter(text)}
      ></Input>
      <XStack justifyContent="center" w={'100%'}>
        <Button
          w={'50%'}
          style={globalStyles.mt10}
          theme={filterByCompetitive ? 'crimson_Button' : 'light'}
          onPress={() => filterByMode('competitive')}
        >
          Competitive
        </Button>
        <Button
          w={'50%'}
          style={globalStyles.mt10}
          theme={filterByCooperative ? 'lime_Button' : 'light'}
          onPress={() => filterByMode('cooperative')}
        >
          Cooperative
        </Button>
      </XStack>
      {filterKhamThams.map((khamTham, index) => {
        return (
          <CardKhamTham
            key={index}
            roomId={3}
            animation="bouncy"
            size="$4"
            w={'100%'}
            scale={1}
            pressStyle={{ scale: 0.95 }}
            name={khamTham.name}
            amountQuestions={khamTham.amountQuestions}
            mode={khamTham.mode}
          ></CardKhamTham>
        );
      })}
      <CreateButton to="/create-room" />
    </View>
  );
}
