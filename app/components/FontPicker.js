import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { RadioButton } from "react-native-paper";

const DATA = [
  "ADayWithoutSun ",
  "BadScriptRegular ",
  "Bristol ",
  "BudmoJiggler ",
  "LemonTuesday ",
  "London ",
  "MarckScriptRegular ",
  "Mateur ",
  "Phorssa ",
  "SolenaRegular ",
  "Stripe ",
  "VelesRegular ",
  "CFJackStory-Regular",
  "daniel ",
  "danielbd ",
  "danielbk ",
  "REIS-Regular",
  // "AlegreyaSansSC-Black",
  //   "AlegreyaSansSC-Light",
  //   "Almendra-Bold",
  //   "Almendra-Italic",
  // "Amaranth-BoldItalic",
  "CevicheOne-Regular",
  "LibreBaskerville-Regular",
  "Lobster-Regular",
  "Oregano-Regular",
  "RobotoCondensed-Light",
];

export default function FontPicker({ func, font }) {
  const [checked, setChecked] = useState(font);
  const setFontFamily = (font_name) => {
    setChecked(font_name);
    func(font_name);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={{ fontFamily: item, fontSize: 20, width: "80%" }}>
        {item}
      </Text>
      <RadioButton
        value={item}
        status={checked === item ? "checked" : "unchecked"}
        onPress={() => setFontFamily(item)}
      />
    </View>
  );

  return (
    <View style={styles.fontContainer}>
      <View style={styles.pickerCont}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fontContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  pickerCont: {
    height: Dimensions.get("window").height * 0.9,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 5,
  },
  item: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
});
