import React from "react";
import { StyleSheet, View } from "react-native";
import Btn from "../components/Btn";
import { FlatList } from "react-native-gesture-handler";
import BackArrowHeader from "../components/BackArrowHeader";

export default function FiltersScreen({ navigation }) {
  const filterItem = ({ item }) => {
    return (
      <View style={styles.filterItem}>
        <Btn
          func={() => {
            navigation.push("Slider", {
              name: item.name,
              minValue: item.minValue,
              maxValue: item.maxValue,
              type: item.type,
              icon: item.icon,
              original_value: item.original_value,
            });
          }}
          type={item.type}
          name={item.icon}
          size={30}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackArrowHeader navigation={navigation} />
      <View style={{ flex: 1 }}></View>
      <View style={styles.filters}>
        <FlatList
          data={filters}
          renderItem={filterItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filters: {
    height: 60,
    backgroundColor: "#fff",
  },
  filterItem: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

const filters = [
  {
    id: "108",
    name: "brightness",
    maxValue: 5.0,
    icon: "sun",
    type: "Feather",
    original_value: 1,
  },
  {
    id: "106",
    name: "contrast",
    maxValue: 2.0,
    icon: "ios-contrast",
    type: "Ionicons",
    original_value: 1,
  },
  {
    id: "101",
    name: "hue",
    minValue: -1.0,
    maxValue: 1,
    icon: "palette-outline",
    type: "MaterialCommunityIcons",
    original_value: 0,
  },
  {
    id: "102",
    name: "blur",
    maxValue: 2.0,
    icon: "drop",
    type: "SimpleLineIcons",
    original_value: 0,
  },
  {
    id: "109",
    name: "temperature",
    minValue: 1000.0,
    maxValue: 40000.0,
    icon: "temperature-high",
    type: "FontAwesome5",
    original_value: 6500,
  },
  {
    id: "103",
    name: "sepia",
    maxValue: 5.0,
    icon: "alpha-s-circle-outline",
    type: "MaterialCommunityIcons",
    original_value: 0,
  },
  {
    id: "105",
    name: "negative",
    maxValue: 2.0,
    icon: "alpha-n-circle-outline",
    type: "MaterialCommunityIcons",
    original_value: 0,
  },
  {
    id: "107",
    name: "saturation",
    maxValue: 2.0,
    icon: "alpha-s-circle-outline",
    type: "MaterialCommunityIcons",
    original_value: 1,
  },
  {
    id: "104",
    name: "sharpen",
    maxValue: 15,
    icon: "triangle-down",
    type: "Entypo",
    original_value: 0,
  },
];
