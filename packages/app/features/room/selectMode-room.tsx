import { Button, Paragraph, YStack } from "@my/ui";


export function SelectModeRoom() {
    return (
        <YStack f={1} jc="center" ai="center" space>
            <Paragraph>โหมด</Paragraph>

            <Button w={245}>
                Competitive
            </Button>
            <Button w={245}>
                Cooperative
            </Button>
        </YStack>
    )
}