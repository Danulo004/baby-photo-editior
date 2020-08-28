import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Slider } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import BackArrowHeader from "../components/BackArrowHeader";
import Btn from "../components/Btn";
import { connect } from "react-redux";
const { presets } = require("../../assets/data");

function FiltersPresetsScreen({ route, navigation, ...props }) {
  const [intensity, setIntensity] = useState(1);
  const [openSlider, setOpenSlider] = useState(false);
  const [filters, setFilteres] = useState({});

  const updateFilters = () => {
    props.changeParam("hue", 0 + filters.hue * intensity);
    props.changeParam("blur", 0 + filters.blur * intensity);
    props.changeParam("sepia", 0 + filters.sepia * intensity);
    props.changeParam("sharpen", 0 + filters.sharpen * intensity);
    props.changeParam("negative", 0 + filters.negative * intensity);
    props.changeParam("contrast", 1 + filters.contrast * intensity);
    props.changeParam("saturation", 1 + filters.saturation * intensity);
    props.changeParam("brightness", 1 + filters.brightness * intensity);
    props.changeParam("temperature", 6500 + filters.temperature * intensity);
  };
  const resetFilters = () => {
    props.changeParam("hue", 0);
    props.changeParam("blur", 0);
    props.changeParam("sepia", 0);
    props.changeParam("sharpen", 0);
    props.changeParam("negative", 0);
    props.changeParam("contrast", 1);
    props.changeParam("saturation", 1);
    props.changeParam("brightness", 1);
    props.changeParam("temperature", 6500);
  };

  const filterItem = ({ item }) => {
    return (
      <View style={styles.filterItem}>
        <TouchableWithoutFeedback
          onPress={() => {
            setFilteres({
              hue: item.filters.hue,
              blur: item.filters.blur,
              sepia: item.filters.sepia,
              sharpen: item.filters.sharpen,
              negative: item.filters.negative,
              contrast: item.filters.contrast,
              saturation: item.filters.saturation,
              brightness: item.filters.brightness,
              temperature: item.filters.temperature,
            });

            setIntensity(1);
            props.changeParam("hue", 0 + item.filters.hue * intensity);
            props.changeParam("blur", 0 + item.filters.blur * intensity);
            props.changeParam("sepia", 0 + item.filters.sepia * intensity);
            props.changeParam("sharpen", 0 + item.filters.sharpen * intensity);
            props.changeParam(
              "negative",
              0 + item.filters.negative * intensity
            );
            props.changeParam(
              "contrast",
              1 + item.filters.contrast * intensity
            );
            props.changeParam(
              "saturation",
              1 + item.filters.saturation * intensity
            );
            props.changeParam(
              "brightness",
              1 + item.filters.brightness * intensity
            );
            props.changeParam(
              "temperature",
              6500 + item.filters.temperature * intensity
            );

            setOpenSlider(true);
          }}
        >
          <Image
            source={item.image}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackArrowHeader navigation={navigation} />
      <View style={{ flex: 1 }}></View>
      {openSlider ? (
        <View style={styles.sliderCont}>
          <Btn
            func={() => {
              resetFilters();
              setOpenSlider(false);
            }}
            type={"MaterialIcons"}
            name={"cancel"}
            size={30}
          />

          <Slider
            width={"60%"}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            minimumTrackTintColor={"#9665CE"}
            maximumTrackTintColor={"#AB9CBE"}
            thumbTintColor={"#9665CE"}
            value={intensity}
            onValueChange={(value) => {
              setIntensity(value);
              updateFilters();
            }}
          />
          <Btn
            func={() => {
              navigation.goBack();
            }}
            type={"MaterialIcons"}
            name={"done"}
            size={30}
          />
        </View>
      ) : (
        <View style={styles.filters}>
          <FlatList
            horizontal={true}
            data={presets}
            renderItem={filterItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

function mapStateToProps(state) {
  return {
    hue: state.hue,
    blur: state.blur,
    sepia: state.sepia,
    sharpen: state.sharpen,
    negative: state.negative,
    contrast: state.contrast,
    saturation: state.saturation,
    brightness: state.brightness,
    temperature: state.temperature,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeParam: (name, value) =>
      dispatch({ type: "CHANGE_FILTER_VALUE", name: name, value: value }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersPresetsScreen);

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
  sliderCont: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
