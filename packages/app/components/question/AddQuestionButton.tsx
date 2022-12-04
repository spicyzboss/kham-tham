import { View } from 'react-native';
import { Button } from '@my/ui';
import { Plus } from '@tamagui/feather-icons';
import { StyleSheet } from 'react-native';
import { useLink } from 'solito/link';

interface AddQuestionButtonProps {
  handler: () => void;
}

export default function AddQuestionButton({ handler }: AddQuestionButtonProps) {
  return (
    <View style={styles.addQuestionButton}>
      <Button theme="dark_Button" icon={Plus} size="$6" onPress={() => handler()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  addQuestionButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '5%',
  },
});
