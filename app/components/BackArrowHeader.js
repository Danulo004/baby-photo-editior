import React from "react";
import { StyleSheet, View } from "react-native";
import Btn from "../components/Btn";

export default function BackArrowHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <Btn
        func={() => {
          navigation.goBack();
        }}
        type="Ionicons"
        name="ios-arrow-back"
        size={36}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    zIndex: 30,
  },
});
