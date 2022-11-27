import { Button, H2, Paragraph, YStack, VisuallyHidden, Text, Card } from '@my/ui';
import { ChevronLeft } from '@tamagui/feather-icons';
import React, { useState } from 'react';
import { createParam } from 'solito';
import { useLink } from 'solito/link';
const { useParam } = createParam<{ id: string }>();

export default function QuestionScreen() {
  const [id] = useParam('id');
  const sumQuestion = useState(null);
  const linkProps = useLink({ href: '/login' });
  const choice = useState(null);

  return (
    <YStack f={1} backgroundColor="black">
      <H2 color="#FFFCFC" margin="$5" fow="800">
        คำถามที่ {`${id}`} / {`${sumQuestion[0]}`}{' '}
      </H2>
      <YStack h="80%" jc="center" ai="center">
        <YStack h="50%" fd="row">
          <Card
            backgroundColor={'$red11Dark'}
            w="45%"
            animation="bouncy"
            size="$4"
            scale={0.95}
            pressStyle={{ scale: 0.875 }}
            jc="center"
            ai="center"
          >
            <Text>ข้อ 1 </Text>
          </Card>
          <Card
            backgroundColor={'$green11Dark'}
            w="45%"
            animation="bouncy"
            size="$4"
            scale={0.95}
            pressStyle={{ scale: 0.875 }}
            jc="center"
            ai="center"
          >
            <Text>ข้อ 2 </Text>
          </Card>
        </YStack>
        <YStack h="50%" fd="row">
          <Card
            backgroundColor={'$blue11Dark'}
            w="45%"
            animation="bouncy"
            size="$4"
            scale={0.95}
            pressStyle={{ scale: 0.875 }}
            jc="center"
            ai="center"
          >
            <Text>ข้อ 3 </Text>
          </Card>
          <Card
            backgroundColor={'$yellow6Light'}
            w="45%"
            animation="bouncy"
            size="$4"
            scale={0.95}
            pressStyle={{ scale: 0.875 }}
            jc="center"
            ai="center"
          >
            <Text>ข้อ 4 </Text>
          </Card>
        </YStack>
      </YStack>
    </YStack>
  );
}
