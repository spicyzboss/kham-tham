import { View, StyleSheet } from 'react-native';
import { Card, H2, H4, Paragraph, XStack, Button, CardProps } from '@my/ui';
import { useLink } from 'solito/link';

interface KhamTham extends CardProps {
  name: string;
  amountQuestions: number;
  mode: GameMode;
  roomId: number;
}

export default function CardKhamTham({ name, amountQuestions, mode, roomId }: KhamTham) {
  const linkProps = useLink({
    href: `/${roomId}/statistic-room`,
  });

  const bg = mode == 'Competitive' ? '#F76190' : '#C4F042';

  return (
    <View style={[{ marginTop: 10 }]}>
      <Card backgroundColor={bg} elevate size="$4">
        <Card.Header padded>
          <H2>{name}</H2>
          <H4>มีทั้งหมด {amountQuestions} คำถาม</H4>
        </Card.Header>
      </Card>
    </View>
  );
}
