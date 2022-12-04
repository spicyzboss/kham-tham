import { Card, H2 } from '@my/ui';
import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

interface CodeRoom {
  code: string
}

export default function ContainerShowCode({ code }: CodeRoom) {
  return (
    <Card theme="dark" elevate>
      <Card.Header padded>
        <H2 ta="center" theme="white_Text">
          {code}
        </H2>
        <H2 ta="center" theme="white_Text">
          or
        </H2>
        <Image
          style={styles.image}
          source={{
            uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${code}`,
          }}
        />
      </Card.Header>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    aspectRatio: 1 / 1,
    marginTop: 10
  },
});
