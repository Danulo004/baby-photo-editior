import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import StikersList from "../components/StikersList";
import BackArrowHeader from "../components/BackArrowHeader";
const { stickersData } = require("../../assets/data");

export default function StikersScreen({ navigation }) {
  const [active, setActive] = useState(0);

  const footerStikerItemName = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          setActive(item.id);
        }}
      >
        <View style={styles.footerStikerItemName}>
          <Text
            style={[
              styles.footerTextItem,
              {
                color: active == item.id ? "#9665CE" : "#AB9CBE",
              },
            ]}
          >
            {item.title.toUpperCase()}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <BackArrowHeader navigation={navigation} />

      <View style={{ flex: 1 }}>
        <StikersList
          data={stickersData[active]}
          navigation={navigation}
        ></StikersList>
      </View>

      <View>
        <FlatList
          horizontal={true}
          data={stickersData}
          renderItem={footerStikerItemName}
          keyExtractor={(item) => item.title}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  footerStikerItemName: {
    height: 60,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  footerTextItem: {
    fontFamily: "Mateur ",
    textAlign: "center",
  },
  stikerItem: {
    width: Dimensions.get("window").width * 0.333,
    height: Dimensions.get("window").width * 0.333,
    justifyContent: "center",
    alignItems: "center",
  },
});
