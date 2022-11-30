import { Spinner, YStack } from '@my/ui';
export default function LoadingSpinner() {
    return (
        <YStack f={1} jc="center" ai="center" backgroundColor="black">
            <Spinner size="large" color="white" />
        </YStack>
    )
}