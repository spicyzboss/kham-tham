import { View } from 'react-native';
import { Card, H2, H4, CardProps } from '@my/ui';
import { useRouter } from 'solito/router';
import { GameMode } from "@prisma/client"

interface KhamTham extends CardProps {
  name: string;
  amountQuestions: number;
  mode: GameMode;
  roomId: number;
}

export default function CardKhamTham({ name, amountQuestions, mode, roomId }: KhamTham) {

  const { push } = useRouter()

  const navigateToStatistocRoom = () => {
    push(`/room/statistic/${roomId}`)
  }

  const bg = mode == 'Competitive' ? '#F76190' : '#C4F042';

  return (
    <View style={[{ marginTop: 10 }]}>
      <Card backgroundColor={bg} elevate size="$4" onPress={navigateToStatistocRoom}>
        <Card.Header padded>
          <H2>{name}</H2>
          <H4>มีทั้งหมด {amountQuestions} คำถาม</H4>
        </Card.Header>
      </Card>
    </View>
  );
}
