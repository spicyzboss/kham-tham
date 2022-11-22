import { View } from 'react-native';
import { Button, YStack } from '@my/ui';
import { Plus } from '@tamagui/feather-icons';
import { StyleSheet } from 'react-native';
import { useLink } from 'solito/link';

interface PathCreateBottomButton {
  to: string;
  name: string;
}

export default function CreateBottomButton({ to: path, name }: PathCreateBottomButton) {
  const linkProps = useLink({
    href: path,
  });

  return (
    <YStack mb={'-5%'} w={'100%'} style={styles.createButton}>
      <Button size="$6">{name}</Button>
    </YStack>
  );
}

const styles = StyleSheet.create({
  createButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
