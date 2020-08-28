import React from "react";
import { StyleSheet, View, FlatList, Dimensions, Image } from "react-native";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function StikersList({ data, navigation }) {
  let stikersArray = [];
  for (let i = 0; i < data.arr.length; ) {
    stikersArray.push({
      id_0: i,
      path_0: data.arr[i++],
      id_1: i,
      path_1: data.arr[i++],
      id_2: i,
      path_2: data.arr[i++],
    });
  }
  const stikerItem = ({ item }) => {
    return (
      <View style={styles.stikerItemRow}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.push("StickersEditor", {
              sticker: item.path_0,
              colorable: data.colorable,
            });
          }}
        >
          <View style={styles.stikerItem}>
            <Image source={item.path_0} style={styles.image} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.push("StickersEditor", {
              sticker: item.path_1,
              colorable: data.colorable,
            });
          }}
        >
          <View style={styles.stikerItem}>
            <Image source={item.path_1} style={styles.image} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.push("StickersEditor", {
              sticker: item.path_2,
              colorable: data.colorable,
            });
          }}
        >
          <View style={styles.stikerItem}>
            <Image source={item.path_2} style={styles.image} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={stikersArray}
        renderItem={stikerItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  stikerItemRow: {
    flexDirection: "row",
  },
  stikerItem: {
    width: Dimensions.get("window").width * 0.333,
    height: Dimensions.get("window").width * 0.333,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
  },
});
