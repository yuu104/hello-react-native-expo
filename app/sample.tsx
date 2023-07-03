import { Link } from "expo-router";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";

export default function Sample() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", position: "relative" }}>
        <View
          style={{
            width: 100,
            height: 200,
            borderWidth: 1,
            borderColor: "#d3d3d3",
            borderLeftWidth: 0,
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              backgroundColor: "#00bfff",
              width: 100,
              height: 100,
              position: "absolute",
              top: 20,
              right: 0,
              zIndex: 2,
            }}
          >
            テキスト
          </Text>
        </View>
        <View
          style={{
            width: 100,
            height: 200,
            borderWidth: 1,
            borderColor: "#d3d3d3",
            borderLeftWidth: 0,
            backgroundColor: "#fff",
            position: "relative",
            zIndex: 1,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boxContainer: {
    flex: 1,
    flexDirection: "row",
  },
  textBox: {
    position: "relative",
    width: 100,
    height: 200,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    backgroundColor: "#fff",
  },
  textContainer: {
    // position: "absolute",
    // top: 0,
  },
  text: {
    width: 190,
    backgroundColor: "#00bfff",
  },
  link: {
    fontSize: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    padding: 5,
    borderRadius: 6,
  },
});
