import { useState, useEffect } from "react";
import { YStack, Progress, Image, H2, H3, H1, Paragraph, Button } from '@my/ui';
import { useRouter } from "solito/router";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ResultCooperativeScreen() {

    const { push } = useRouter()

    const [bossHP, setBossHP] = useState(100)
    const [totalDamage, setTotalDamage] = useState(120)
    const [bossAlive, setBossAlive] = useState(false)


    useEffect(() => {

    }, [])

    const leaveTheRoom = async () => {
        await AsyncStorage.removeItem("playerToken")
        push("/home")
    }

    return (
        <>
            <YStack flex={1} jc="center" ai="center" backgroundColor="black" space="$3">
                <Image src={bossAlive ? require('../../../assets/BossAlive.png') : require('../../../assets/BossDie.png')} width="70%" height="auto" aspectRatio={1 / 1} resizeMode="contain" />
                <Progress size="$6" value={bossHP} mt="$5" backgroundColor="white">
                    <Progress.Indicator backgroundColor="$red10Light" animation="lazy" />
                </Progress>
                {!bossAlive ? (
                    <H1 theme="white_Text" ta="center">ทีมคุณปราบบอส <H1 theme="lime_Text" ta="center">{"\n"}สำเร็จ</H1></H1>
                ) : (
                    <H1 theme="white_Text" ta="center">ทีมคุณปราบบอส <H1 theme="crimson_Text" ta="center">{"\n"}ล้มเหลว</H1></H1>
                )}
                <Paragraph theme="white_Text">ผลรวมพลังโจมตีทั้งหมด</Paragraph>
                <H3 theme="yellow_Text">{totalDamage}</H3>
                <Button theme="dark_Button" size="$6" onPress={leaveTheRoom}>Leave the Room</Button>

            </YStack>
        </>
    )
}
