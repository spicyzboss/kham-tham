import { Button, H2, Paragraph, YStack, VisuallyHidden, Text, Card } from '@my/ui'
import { ChevronLeft } from '@tamagui/feather-icons'
import React, { useState } from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'

export function CompetitiveScore() {

    return (
        <YStack f={1} backgroundColor="black">
            <YStack margin="$5">
                <H2 color="#FFFCFC" fow="800">Leader Board</H2>
                <Paragraph color="#FFFCFC">คะแนนรวมคำถาม</Paragraph>
                <YStack jc="center" ai="center">
                </YStack>
            </YStack>
        </YStack>
    )
}