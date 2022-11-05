import { Button, H1, Input, Paragraph, YStack } from '@my/ui'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import globalStyles from "../../../assets/global_style"
import { ContainerConfirmOTP } from 'app/components/confirmOTP'
export function SignUpScreen() {
    const Login = useLink({ href: '/login' })


    const [email, setEmail] = useState('')
    const [isNullemail, setIsNullemail] = useState(false)
    const [password, setPassword] = useState('')
    const [isNullpassword, setIsNullpassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isNullConfirmPassword, setIsNullConfirmPassword] = useState(false)
    const [tel, setTel] = useState('')
    const [isNullTel, setIsNullTel] = useState(false)

    return (
        <YStack backgroundColor="black" f={1} jc="center" ai="center" space>
            <H1 ta="center" color="#FFFCFC">Kham Tham</H1>
            <YStack>
                <Paragraph color="#CD1D8D" ta="left" >Email</Paragraph>
                <Input value={email} onChangeText={setEmail} w={245} color="#FFFCFC" size="$4" borderWidth={2} />
            </YStack>

            <YStack>
                <Paragraph color="#CD1D8D" ta="left" >Password</Paragraph>
                <Input value={password} onChangeText={setPassword} w={245} color="#FFFCFC" size="$4" borderWidth={2} />
            </YStack>

            <YStack>
                <Paragraph color="#CD1D8D" ta="left" >Confirm Password</Paragraph>
                <Input value={confirmPassword} onChangeText={setConfirmPassword} w={245} color="#FFFCFC" size="$4" borderWidth={2} />
            </YStack>

            <YStack>
                <Paragraph color="#CD1D8D" ta="left" >Tel</Paragraph>
                <Input value={tel} onChangeText={setTel} w={245} color="#FFFCFC" size="$4" borderWidth={2} />
            </YStack>

            <YStack w={245}>
                <Button {...Login}>
                    Confirm Sign Up
                </Button>
            </YStack>
        </YStack>
    )

}
