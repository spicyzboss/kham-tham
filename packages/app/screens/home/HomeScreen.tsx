import { Anchor, Button, H1, Paragraph, Separator, Sheet, XStack, YStack } from '@my/ui';
import { ChevronDown, ChevronUp } from '@tamagui/feather-icons';
import React, { useState } from 'react';
import { useLink } from 'solito/link';

export default function HomeScreen() {
  const linkProps = useLink({
    href: '/show-room',
  });
  const login = useLink({
    href: '/login',
  });
  const competitiveScore = useLink({
    href: '/comp-score',
  });
  const linkUserRoom = useLink({
    href: '/user-room',
  });
  const linkEnterCodeRoom = useLink({
    href: '/code',
  });

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native. ddss
        </Paragraph>

        <Separator />
        <Paragraph ta="center">
          Tamagui is made by{' '}
          <Anchor href="https://twitter.com/natebirdman" target="_blank">
            Nate Wienert
          </Anchor>
          , give it a star{' '}
          <Anchor href="https://github.com/tamagui/tamagui" target="_blank" rel="noreferrer">
            on Github
          </Anchor>
          .
        </Paragraph>
      </YStack>

      <XStack>
        <Button {...linkProps}>Link to Show Room</Button>
      </XStack>
      <XStack>
        <Button {...login}>Link to Login</Button>
      </XStack>
      <XStack>
        <Button {...competitiveScore}>comp-question</Button>
      </XStack>
      <XStack>
        <Button {...linkUserRoom}>user-room</Button>
      </XStack>
      <XStack>
        <Button {...linkEnterCodeRoom}>enter-code-room</Button>
      </XStack>

      <SheetDemo />
    </YStack>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false);
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}