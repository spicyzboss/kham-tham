import { Button, H2, Paragraph, YStack, VisuallyHidden, Text, Card } from '@my/ui';
import { ChevronLeft } from '@tamagui/feather-icons';
import React, { useState } from 'react';
import { createParam } from 'solito';
import { useLink } from 'solito/link';
import CreateBottomButton from 'app/components/CreateBottomButton';

export default function CompetitiveScoreScreen() {
  return (
    <YStack f={1} backgroundColor="black">
      <YStack margin="$5">
        <H2 color="#FFFCFC" fow="800">
          Leader Board
        </H2>
        <Paragraph color="#FFFCFC">คะแนนรวมคำถาม</Paragraph>
        <YStack jc="center" ai="center" />
      </YStack>
      <CreateBottomButton to="/login" name="ออกห้อง" />
    </YStack>
  );
}
