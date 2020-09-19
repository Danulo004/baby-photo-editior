import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

export default function SquareSlider({ func, active_color }) {
  const [active, setActive] = useState(active_color);

  const colorSquareItem = (item) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => console.log(item.item)}
        onPressIn={() => {
          setActive(item.item);
          func(item.item);
        }}
        onPressOut={() => {}}
      >
        <View>
          <View
            style={[
              {
                width: 11,
                height: 11,
                backgroundColor: item.item,
                borderColor: "#9665CE",
                borderWidth: 1,
                opacity: active == item.item ? 1 : 0,
              },
            ]}
          ></View>
          <View
            style={{
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 5,
              borderRightWidth: 5,
              borderTopWidth: 5,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: "#9665CE",
              opacity: active == item.item ? 1 : 0,
            }}
          ></View>
          <View
            style={[
              {
                width: 11,
                height: 40,
                backgroundColor: item.item,
              },
            ]}
          ></View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <FlatList
      horizontal={true}
      data={colors}
      renderItem={colorSquareItem}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({});

const colors = [
  "#fff",
  "#ccc",
  "#999",
  "#666",
  "#333",
  "#000",
  "#CAFF64",
  "#FED701",
  "#DAA61D",
  "#BB840D",
  "#999A00",
  "#666502",
  "#ABFE31",
  "#00FA9C",
  "#01FE80",
  "#04FD02",
  "#31CD33",
  "#3BB373",
  "#99CCCC",
  "#69CBCC",
  "#329A99",
  "#649B99",
  "#056466",
  "#FBCDCC",
  "#FF969A",
  "#FB6866",
  "#FF0030",
  "#CD0130",
];
