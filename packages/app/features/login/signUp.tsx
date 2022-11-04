import { Button, H1, Input, Paragraph, YStack } from '@my/ui'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import globalStyles from "../../../assets/global_style"

export function SignUpScreen() {
    const Login = useLink({ href: '/login' })

    const [email, setEmail] = useState('')
    const [isNullemail, setIsNullemail] = useState(false)
    const password = useState('')
    const [isNullpassword, setIsNullpassword] = useState(false)


    return (
        <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
            <H1 ta="center" color="#FFFCFC">Kham Tham</H1>
            <Input w={245} color="#FFFCFC" placeholderTextColor="#CD1D8D" placeholder="email" size="$4" borderWidth={2} />
            <Input w={245} color="#FFFCFC" placeholderTextColor="#CD1D8D" placeholder="password" size="$4" borderWidth={2} />
            <Button color="#341711" backgroundColor="$yellow11Dark"
                onPress={
                    () => {
                        console.log("check")
                    }
                }> Sign In
            </Button>
            <Button {...Login}>
                Go Login
            </Button>
        </YStack>
    )


}
