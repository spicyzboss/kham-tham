import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CreateButton } from 'app/components/createButton'
import globalStyles from "../../../assets/global_style"
import { H1, Input, XStack, Button } from '@my/ui'
import { CardKhamTham } from '../../components/room/cardKhamTham'

interface KhamTham {
    id: number;
    name: string;
    amountQuestions: number;
    mode: string;
}

export function UserRoom() {

    const [khamThams, setKhamThams] = useState<KhamTham[]>([{
        id: 1,
        name: "wave",
        amountQuestions: 1,
        mode: "competitive"
    }, {
        id: 2,
        name: "test",
        amountQuestions: 5,
        mode: "cooperative"
    }])
    const [inputFilter, setInputFilter] = useState<string>("")
    const [filterByCompetitive, setFilterByCompetitive] = useState<boolean>(false)
    const [filterByCooperative, setFilterByCooperative] = useState<boolean>(false)

    let filterKhamThams = khamThams.filter(khamTham => khamTham.name.includes(inputFilter))
    if (filterByCompetitive) filterKhamThams = filterKhamThams.filter(khamThams => khamThams.mode == "competitive")
    if (filterByCooperative) filterKhamThams = filterKhamThams.filter(khamThams => khamThams.mode == "cooperative")
    const amountFilterKhamThams = filterKhamThams.length

    const filterByMode = (mode: string) => {
        if (mode == "competitive") {
            setFilterByCompetitive(prev => !prev)
            setFilterByCooperative(false)
        }
        if (mode == "cooperative") {
            setFilterByCooperative(prev => !prev)
            setFilterByCompetitive(false)
        }
    }

    return (
        <View style={[globalStyles.container, globalStyles.padding10]}>
            <H1>Kham Tham ({amountFilterKhamThams})</H1>
            <Input onChangeText={text => setInputFilter(text)}></Input>
            <XStack justifyContent='center'>
                <Button style={globalStyles.mt10} backgroundColor={filterByCompetitive ? "$red11Light" : "grey"} onPress={() => filterByMode("competitive")}>Competitive</Button>
                <Button style={globalStyles.mt10} backgroundColor={filterByCooperative ? "$green11Light" : "grey"} onPress={() => filterByMode("cooperative")}>Cooperative</Button>
            </XStack>
            {filterKhamThams.map((khamTham, index) => {
                return (
                    <CardKhamTham
                        key={index}
                        animation="bouncy"
                        size="$4"
                        w={'100%'}
                        scale={1}
                        pressStyle={{ scale: 0.95 }}
                        name={khamTham.name}
                        amountQuestions={khamTham.amountQuestions}
                        mode={khamTham.mode}></CardKhamTham>
                )
            })}
            <CreateButton to='/create-room' />
        </View>
    )
}
