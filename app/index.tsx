import type { EventSubscription } from "expo-modules-core";
import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] =
    useState<EventSubscription | null>(null);



  /* wenn Handy geschüttelt wird, steigt die acceleration
  minus 1, weil Handy in Ruhezustand 1g misst, den muss man abziehen
  */
  /* Array um die letzte Werte speichern */
  const [samples, setSamples] = useState<number[]>([]);
  /* Datenmenge begrenzen */


  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((data) => {
        setData(data);
        Accelerometer.setUpdateInterval(150);
        const magnitude = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
        const acceleration = Math.abs(magnitude - 1);
        setSamples(prev => [...prev, acceleration].slice(-100));
      })
    );
  };

  const _unsubscribe = () => {
    subscription?.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>

          <Pressable
            onPress={subscription ? _unsubscribe : _subscribe}
            
            style={({ pressed }) => [
              styles.link,
              pressed && styles.linkPressed
            ]}
          >
            <Text>{subscription ? "On" : "Off"}</Text>
          </Pressable>
      <LineChart
        data={{
          labels: [],
          datasets: [{ data: samples.length ? samples : [0] }],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        withDots={false}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={true}
        fromZero={false}
        segments={6}
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: () => "blue",
          labelColor: () => "black",
          propsForBackgroundLines: {
            stroke: "transparent",
          },
          propsForLabels: {
            fontSize: 10,
          },
          propsForDots: {
            r: "0",
          },
        }}
        bezier={false}
        style={{
          borderWidth: 1,
          borderColor: "black",
          paddingRight: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    zIndex: 10,
    backgroundColor: "#098bd6",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android
    elevation: 4,
  },
  linkPressed: {
    backgroundColor: '#065583',
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
})