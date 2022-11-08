import { View, StyleSheet } from 'react-native'
import { Card, H2, H4, Paragraph, XStack, Button, CardProps } from "@my/ui"
import { useLink } from 'solito/link'

interface KhamTham extends CardProps {
    name: string;
    amountQuestions: number;
    mode: string;
    roomId: number;
}

export const CardKhamTham = (props: KhamTham) => {

    const name = props.name
    const amountQuestions = props.amountQuestions
    const mode = props.mode
    const roomId = props.roomId

    const linkProps = useLink({
        href: `/${roomId}/statistic-room`,
    })

    const bg = mode == "competitive" ? "#F76190" : "#C4F042"
    return (
        <View style={[{ marginTop: 10 }]}>
            <Card backgroundColor={bg} elevate size="$4" {...props} {...linkProps}>
                <Card.Header padded>
                    <H2>{name}</H2>
                    <H4>มีทั้งหมด {amountQuestions} คำถาม</H4>
                </Card.Header>
            </Card>
        </View>

    )
}
