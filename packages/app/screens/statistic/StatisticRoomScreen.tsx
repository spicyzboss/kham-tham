import { useState } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function StatisticRoomScreen() {
  const data = {
    labels: ['January', 'February'],
    datasets: [
      {
        data: [20, 45],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: 'red',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View>
      <BarChart
        chartConfig={chartConfig}
        yAxisLabel=""
        yAxisSuffix=""
        data={data}
        height={400}
        width={400}
      />
    </View>
  );
}
