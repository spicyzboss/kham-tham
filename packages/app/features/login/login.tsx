import { Button, H1, Input, Paragraph, YStack } from '@my/ui'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import globalStyles from "../../../assets/global_style"

export function LoginScreen({ navigation }) {
    const Login = useLink({ href: '/' })
    const SignUp = useLink({ href: '/signUp' })

    const [email, setEmail] = useState('')
    const [isNullemail, setIsNullemail] = useState(false)
    const [password, setPassword] = useState('')
    const [isNullpassword, setIsNullpassword] = useState(false)
    return (
        <YStack backgroundColor="black" f={1} jc="center" >
            <YStack ai="center" space>
                <H1 ta="center" color="#FFFCFC">Kham Tham</H1>
                <YStack>
                    <Input value={email} onChangeText={setEmail} w={245} color="#FFFCFC" placeholderTextColor="#CD1D8D" placeholder="email" size="$4" borderWidth={2} />
                    {isNullemail ? <Paragraph color={"#FFFCFC"} ta="right">null email</Paragraph> : null}
                </YStack>

                <YStack>
                    <Input value={password} onChangeText={setPassword} w={245} color="#FFFCFC" placeholderTextColor="#CD1D8D" placeholder="password" size="$4" borderWidth={2} />
                    {isNullpassword ? <Paragraph color={"#FFFCFC"} ta="right">null password</Paragraph> : null}
                </YStack>

                <Button w={245} color="#341711" backgroundColor="$yellow11Dark"
                    onPress={
                        () => {
                            email == null || email == '' ? setIsNullemail(true) : setIsNullemail(false)
                            password == null || password == '' ? setIsNullpassword(true) : setIsNullpassword(false)
                            if (!(email == null || email == '' || password == null || password == '')) {
                                navigation.navigate('home')
                            }
                        }
                    }> Sign In
                </Button>
                <YStack w={245} ai="flex-end" >
                    <Paragraph color={'$gray10Light'} {...SignUp}>
                        Sign Up
                    </Paragraph>
                </YStack>
            </YStack>

            <Button {...Login}>
                Go Home
            </Button>
        </YStack>
    )


}