import { Anchor, Button, H1, Paragraph, Separator, Sheet, XStack, YStack } from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/feather-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import { View, Text, StyleSheet } from 'react-native'
import { CreateButton } from 'app/components/createButton'
import globalStyles from "../../../assets/global_style"

export function CreateRoom() {

    return (
        <View style={globalStyles.container}>
            <Text>wave</Text>
            <CreateButton />
        </View>
    )
}
