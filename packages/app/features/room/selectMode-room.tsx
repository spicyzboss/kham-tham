import { Button, H2, YStack } from "@my/ui";
import { useLink } from 'solito/link'

export function SelectModeRoom() {
    const competitive = useLink({ href: '/create-question' })
    const cooperative = useLink({ href: '/create-question' })
    return (
        <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
            <H2 color="#FFFCFC">โหมด</H2>
            <Button backgroundColor="#F76190" w={245} {...competitive}>
                Competitive
            </Button>
            <Button backgroundColor="#C4F042" w={245} {...cooperative}>
                Cooperative
            </Button>
        </YStack>
    )
}