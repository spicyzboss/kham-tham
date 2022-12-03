import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Button, YStack, H2, H1 } from '@my/ui';
import { ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';

export default function StatisticRoomScreen() {

  const { push } = useRouter()
  const { useParam } = createParam()

  const roomId = useParam("roomId")


  const [data, setData] = useState([[{
    name: "ตอบถูก",
    amountAnswer: 20,
    color: "#C4F042",
    legendFontColor: "white",
    legendFontSize: 16
  },
  {
    name: "ตอบผิด",
    amountAnswer: 30,
    color: "#FFF7ED",
    legendFontColor: "white",
    legendFontSize: 16
  },], [{
    name: "ตอบถูก",
    amountAnswer: 40,
    color: "#C4F042",
    legendFontColor: "white",
    legendFontSize: 16
  },
  {
    name: "ตอบผิด",
    amountAnswer: 20,
    color: "#FFF7ED",
    legendFontColor: "white",
    legendFontSize: 16
  },]])

  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

  };

  const startTheRoom = () => {

    push(`/room/${roomId}`)

  }

  const screenWidth = Dimensions.get("window").width

  return (
    <>
      {data.length != 0 ? (
        <YStack backgroundColor="black" f={1}>
          <ScrollView>
            <YStack jc="center" ai="center" space="$3" mt="$6" mb="$15" >
              {data.map((amountAnswer, index) => (
                <View key={index}>
                  <H2 theme="crimson_Text" ta="center">ข้อที่ {index + 1}</H2>
                  <PieChart
                    data={amountAnswer}
                    width={screenWidth}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"amountAnswer"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                  />
                </View>
              ))}

            </YStack>
          </ScrollView>
        </YStack>
      ) : (
        <YStack backgroundColor="black" f={1} jc="center">
          <H1 ta="center" theme="crimson_Text">No Statistic</H1>
        </YStack>
      )}
      <View style={styles.bottomButton}>
        <Button theme="dark_Button" size="$6" onPress={startTheRoom}>
          เริ่มเล่น
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '5%',
  },
})