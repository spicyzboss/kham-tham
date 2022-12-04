import { Card, H2 } from '@my/ui';
import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import global_style from '../../../assets/global_style';

export default function ContainerShowCode() {
  const [codeRoom, setCodeRoom] = useState('ABC123');

  return (
    <Card theme="dark" elevate>
      <Card.Header padded>
        <H2 ta="center" theme="white_Text">
          {codeRoom}
        </H2>
        <H2 ta="center" theme="white_Text">
          or
        </H2>
        <Image
          style={styles.image}
          source={{
            uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${codeRoom}`,
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
  },
});
