import { useState } from "react";
import { View } from "react-native";
import { BarChart } from 'react-native-chart-kit'

export const StatisticRoom = () => {

    const data = {
        labels: ['January', 'February'],
        datasets: [
            {
                data: [20, 45]
            },
        ]
    }

    const chartConfig = {
        backgroundColor: '#e26a00',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    }

    return (
        <View>
            <BarChart chartConfig={chartConfig} yAxisLabel="" yAxisSuffix="" data={data} width={300} height={400}></BarChart>
        </View>
    );

}

