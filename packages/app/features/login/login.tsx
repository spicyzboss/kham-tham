import { Button, H1, Input, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/feather-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'

export function LoginScreen() {
    const LoginScreen = useLink({ href: '/' })
    const email = useState('')
    const password = useState('')
    const signIn = ({ navigation }) => {
        return (
            <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
                <H1 ta="center" color="#FFFCFC">Kham Tham</H1>
                <Input w={245} placeholder="email" size="$4" borderWidth={2} />
                <Input w={245} placeholder="password" size="$4" borderWidth={2} />
                <Button backgroundColor="$yellow11Dark"
                    onPress={
                        () =>
                            navigation.navigate('SignIn', { email: email, password: password })
                    }> Sign In</Button>
                <Button {...LoginScreen}>
                    Go Home
                </Button>
            </YStack>
        )
    }


}
