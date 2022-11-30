import { useState, useEffect } from "react";
import { YStack, Progress, Image, H2, H3, Paragraph } from '@my/ui';
import { useRouter } from "solito/router";
import { createParam } from "solito";
export default function BossGetDamaged() {

    const { push } = useRouter()
    const { useParam } = createParam()

    const [bossHP, setBossHP] = useState(100)
    const [damage, setDamage] = useState(120)
    const [bossAlive, setBossAlive] = useState(true)

    const [order] = useParam("order")
    const [roomId] = useParam("roomId")

    useEffect(() => {
        setTimeout(() => {
            if (bossHP - damage < 0) {
                setBossHP(0)
                setBossAlive(false)
                setTimeout(() => {
                    push(`/room/${roomId}/resultBossHP`)
                }, 2000)
            } else {
                setBossHP(bossHP - damage)
                setTimeout(() => {
                    push(`/room/${roomId}/question/${Number(order) + 1}`)
                }, 2000)
            }
        }, 2000)
    }, [])

    return (
        <YStack flex={1} jc="center" ai="center" backgroundColor="black" space="$3">
            <Image src={bossAlive ? require('../../../assets/BossAlive.png') : require('../../../assets/BossDie.png')} width="70%" height="auto" aspectRatio={1 / 1} resizeMode="contain" />
            <Progress size="$6" value={bossHP} mt="$5" backgroundColor="white">
                <Progress.Indicator backgroundColor="$red10Light" animation="lazy" />
            </Progress>
            {bossAlive ? (
                <H3 theme="white_Text">ยังเหลืออีก <H3 theme="crimson_Text">3</H3> รอบ สู้ๆ นะ</H3>
            ) : (
                <H3 theme="white_Text">บอส <H3 theme="crimson_Text">ตาย</H3> แล้ว เก่งมากกก</H3>
            )}
            <Paragraph theme="white_Text">ผลรวมพลังโจมตีรอบนี้</Paragraph>
            <H3 theme="yellow_Text">{damage}</H3>
        </YStack>
    )
}
