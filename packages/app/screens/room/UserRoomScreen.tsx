import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CreateButton from 'app/components/CreateButton';
import globalStyles from '../../../assets/global_style';
import { H1, Input, XStack, Button } from '@my/ui';
import CardKhamTham from '../../components/room/CardKhamTham';
import LoadingSpinner from 'app/components/LoadingSpinner';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserRoomScreen() {
  const [inputFilter, setInputFilter] = useState<string>('');
  const [filterByCompetitive, setFilterByCompetitive] = useState<boolean>(false);
  const [filterByCooperative, setFilterByCooperative] = useState<boolean>(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    checkHasToken();
  }, []);

  const checkHasToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setToken(token);
    }
  };

  const fetchRooms = (url: string) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => res.json());
  };

  const { data, error } = useSWR(token ? 'http://10.0.119.37:3000/room/owner' : null, fetchRooms);

  if (error) return <Button>error</Button>;

  if (!data) return <LoadingSpinner />;

  return (
    <View style={[globalStyles.container, globalStyles.padding10]}>
      <H1 theme="white_Text">Kham Tham ({data.length})</H1>
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
          onPress={() => {
            setFilterByCompetitive(!filterByCompetitive);
            setFilterByCooperative(false);
          }}
        >
          COMPETITIVE
        </Button>
        <Button
          w={'50%'}
          theme={filterByCooperative ? 'lime_Button' : 'light'}
          onPress={() => {
            setFilterByCompetitive(false);
            setFilterByCooperative(!filterByCooperative);
          }}
        >
          COOPERATIVE
        </Button>
      </XStack>
      {data
        .filter(
          (v) =>
            ((filterByCompetitive && v.mode === 'COMPETITIVE') ||
              (filterByCooperative && v.mode === 'COOPERATIVE') ||
              (!filterByCompetitive && !filterByCooperative)) &&
            v.name.includes(inputFilter.toLowerCase())
        )
        .map((khamTham) => (
          <CardKhamTham
            animation="bouncy"
            w={'100%'}
            scale={1}
            pressStyle={{ scale: 0.95 }}
            key={khamTham.id}
            roomId={khamTham.id}
            name={khamTham.name}
            amountQuestions={khamTham.RoomQuestion.length}
            mode={khamTham.mode}
          />
        ))}
      <CreateButton to="/room/mode" />
    </View>
  );
}
