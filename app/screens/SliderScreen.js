import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  Slider,
} from "react-native";
import { connect } from "react-redux";
import Icon from "../components/Icon";
import Btn from "../components/Btn";
const windowWidth = Dimensions.get("window").width;

function SliderScreen({ route, navigation, ...props }) {
  const { name, minValue, maxValue, type, icon, original_value } = route.params;
  const [leftValue] = useState(new Animated.Value(windowWidth));
  const [opacityValue] = useState(new Animated.Value(1));

  Animated.sequence([
    Animated.timing(leftValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }),
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }),
  ]).start();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { left: leftValue }]}>
        <Btn
          func={() => {
            navigation.goBack();
          }}
          type="Ionicons"
          name="ios-arrow-back"
          size={36}
        />
        <Btn
          func={() => {
            props.changeParam(name, original_value);
            navigation.goBack();
          }}
          type="SimpleLineIcons"
          name="trash"
          size={36}
        />
      </Animated.View>

      <Animated.View style={[styles.title, { opacity: opacityValue }]}>
        <Text style={styles.titleText}>{name}</Text>
      </Animated.View>

      <View style={styles.sliderCont}>
        <Icon type={type} name={icon} size={32} touched={false} />
        <Slider
          width={"60%"}
          minimumValue={minValue}
          maximumValue={maxValue}
          minimumTrackTintColor={"#9665CE"}
          maximumTrackTintColor={"#AB9CBE"}
          thumbTintColor={"#9665CE"}
          value={props[name]}
          onValueChange={(value) => {
            props.changeParam(name, value);
          }}
        />
        <Icon type={type} name={icon} size={32} touched={false} />
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(SliderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sliderCont: {
    height: 60,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  titleText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 40,
  },
});
