import { View } from 'react-native';
import { Button } from '@my/ui';
import { Plus } from '@tamagui/feather-icons';
import { StyleSheet } from 'react-native';
import { useRouter } from 'solito/router';

interface PathCreateButton {
  to: string;
}

export default function CreateButton({ to: path }: PathCreateButton) {
  const { push } = useRouter();
  const navigateTo = () => {
    push(path);
  };

  return (
    <View style={styles.createButton}>
      <Button icon={Plus} size="$6" onPress={navigateTo}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '5%',
  },
});
