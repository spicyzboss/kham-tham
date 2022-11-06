import { View, StyleSheet } from 'react-native'
import { Card, H2, H4, Paragraph, XStack, Button, CardProps } from "@my/ui"

interface KhamTham extends CardProps {
    name: string;
    amountQuestions: Number;
    mode: string;
}

export const CardKhamTham = (props: KhamTham) => {

    const name = props.name
    const amountQuestions = props.amountQuestions
    const mode = props.mode
    const bg = props.mode == "competitive" ? "#F76190" : "#C4F042"
    return (
        <View style={[{ marginTop: 10 }]}>
            <Card backgroundColor={bg} elevate size="$4" {...props}>
                <Card.Header padded>
                    <H2>{name}</H2>
                    <H4>มีทั้งหมด {amountQuestions} คำถาม</H4>
                </Card.Header>
            </Card>
        </View>

    )
}
