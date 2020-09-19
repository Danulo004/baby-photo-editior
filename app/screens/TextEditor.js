import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Slider,
  PanResponder,
  Animated,
  TextInput,
  Dimensions,
} from "react-native";
import Btn from "../components/Btn";
import { SliderHuePicker } from "react-native-slider-color-picker";
import {
  State,
  TouchableWithoutFeedback,
  RotationGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import FontPicker from "../components/FontPicker";
import BackArrowHeader from "../components/BackArrowHeader";
import { HSVtoRGB } from "../functions";
import { connect } from "react-redux";
import SquareSlider from "../components/SquareSlider";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height - 160;

function TextEditor({ route, navigation, ...props }) {
  const [text, setText] = useState("Text");
  const [font, setFont] = useState("AlegreyaSansSC-Light");
  const [fontSize] = useState(30);
  const [textColor, setTextColor] = useState("#fff");
  const [opacity, setOpacity] = useState(1);

  const aspectRatio =
    props.photo_data.height > props.photo_data.width
      ? windowHeight / props.photo_data.height
      : windowWidth / props.photo_data.width;
  const surfaceHeight = props.photo_data.height * aspectRatio;
  const surfaceWidth = props.photo_data.width * aspectRatio;

  //Rotation
  const _rotate = new Animated.Value(0);
  const _rotateStr = _rotate.interpolate({
    inputRange: [-100, 100],
    outputRange: ["-100rad", "100rad"],
  });
  let _lastRotate = 0;

  const _onRotateGestureEvent = Animated.event(
    [{ nativeEvent: { rotation: _rotate } }],
    { useNativeDriver: false }
  );
  const _onRotateHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastRotate += event.nativeEvent.rotation;
      _rotate.setOffset(_lastRotate);
      _rotate.setValue(0);
    }
  };

  //Dragging
  const point = useRef(
    new Animated.ValueXY({ x: surfaceWidth / 2, y: surfaceHeight / 2 })
  ).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      Animated.spring(point, {
        toValue: { x: gestureState.moveX - 60, y: gestureState.moveY - 60 },
        useNativeDriver: false,
      }).start();
    },
  });

  //Scaling
  const _baseScale = new Animated.Value(30);
  const _pinchScale = new Animated.Value(1);
  const _scale = new Animated.multiply(_baseScale, _pinchScale);
  let _lastScale = 30;
  const _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: _pinchScale } }],
    {
      useNativeDriver: false,
    }
  );

  const _onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastScale *= event.nativeEvent.scale;
      _baseScale.setValue(_lastScale);
      _pinchScale.setValue(1);
    }
  };

  const cancelTextEditing = () => {
    navigation.goBack();
  };

  const [fontPicker, setFontPicker] = useState(false);
  const openFontPicker = () => {
    setFontPicker(true);
  };
  const closeFontPicker = (font) => {
    setFontPicker(false);
    setFont(font);
  };

  const saveText = () => {
    navigation.push("Save", {
      text: text,
      font: font,
      color: textColor,
      _scale: _scale,
      opacity: opacity,
      point: point,
      _rotateStr: _rotateStr,
      surfaceHeight: surfaceHeight,
      surfaceWidth: surfaceWidth,
    });
  };

  return (
    <View style={styles.container}>
      <BackArrowHeader navigation={navigation} />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#aaa",
        }}
      >
        <ImageBackground
          source={{
            uri: props.photo_uri,
          }}
          style={{
            width: surfaceWidth,
            height: surfaceHeight,
          }}
        >
          <Animated.View style={{ flex: 1 }}>
            <PinchGestureHandler
              onGestureEvent={_onPinchGestureEvent}
              onHandlerStateChange={_onPinchHandlerStateChange}
            >
              <Animated.View style={{ flex: 1 }}>
                <RotationGestureHandler
                  onGestureEvent={_onRotateGestureEvent}
                  onHandlerStateChange={_onRotateHandlerStateChange}
                >
                  <Animated.View style={{ flex: 1 }}>
                    <Animated.View
                      style={[
                        styles.box,
                        {
                          position: "relative",
                          transform: [
                            { translateX: -50 },
                            { translateY: -50 },
                            { rotate: _rotateStr },
                          ],
                        },
                        point.getLayout(),
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={styles.crossBtn}>
                          <TouchableWithoutFeedback
                            onPressIn={() => {
                              cancelTextEditing();
                            }}
                          >
                            <Entypo
                              name="cross"
                              size={24}
                              style={{ color: "#fff" }}
                              color="black"
                            />
                          </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.fontStyles}>
                          <TouchableWithoutFeedback
                            onPress={() => {
                              openFontPicker();
                            }}
                          >
                            <Text style={styles.fontText}>T</Text>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                      <Animated.View {...panResponder.panHandlers}>
                        <Animated.View style={styles.borderBox}>
                          <Animated.Text
                            style={{
                              fontFamily: font,
                              color: textColor,
                              fontSize: _scale,
                              opacity: opacity,
                              zIndex: 100,
                              alignSelf: "center",
                            }}
                          >
                            {text}
                          </Animated.Text>
                        </Animated.View>
                        <TextInput
                          editable
                          maxLength={20}
                          style={{
                            fontFamily: font,
                            fontSize: fontSize,
                            opacity: 0,
                            zIndex: 110,
                            position: "relative",
                            top: "-50%",
                            alignSelf: "center",
                          }}
                          value={text}
                          onChangeText={(value) => {
                            setText(value);
                          }}
                        />
                      </Animated.View>
                    </Animated.View>
                  </Animated.View>
                </RotationGestureHandler>
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </ImageBackground>
      </View>

      {fontPicker ? (
        <View
          style={{
            zIndex: 50,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
        >
          <FontPicker func={closeFontPicker} font={font}></FontPicker>
        </View>
      ) : null}

      <View style={(styles.footer, { zIndex: 20 })}>
        <View style={styles.sliderCont}>
          <Btn
            func={() => {
              navigation.goBack();
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
            value={opacity}
            onValueChange={(value) => setOpacity(value)}
          />
          <Btn
            func={() => {
              saveText();
            }}
            type={"MaterialIcons"}
            name={"done"}
            size={30}
          />
        </View>
        <View style={styles.hueSliderCont}>
          <SquareSlider
            active_color={textColor}
            func={(color) => {
              setTextColor(color);
            }}
          />
          {/* <SliderHuePicker
            trackStyle={[{ height: 12 }]}
            onColorChange={(value) => {
              const color = HSVtoRGB(value.h, 1, 1);
              setTextColor(`rgb(${color.r},${color.g},${color.b})`);
            }}
          /> */}
        </View>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(TextEditor);

function mapStateToProps(state) {
  return {
    photo_uri: state.photo_uri,
    photo_data: state.photo_data,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    bottom: 0,
  },
  borderBox: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
  },
  box: {
    alignSelf: "baseline",
  },
  fontStyles: {
    position: "relative",
    zIndex: 6,
    width: 25,
    height: 25,
    top: 12.5,
    left: 12.5,
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#9665CE",
    backgroundColor: "#fff",
  },
  crossBtn: {
    position: "relative",
    zIndex: 6,
    width: 25,
    height: 25,
    top: 12.5,
    left: -12.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#9665CE",
  },
  fontText: {
    fontSize: 16,
    color: "#9665CE",
    fontWeight: "bold",
  },
  sliderCont: {
    height: 60,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  hueSliderCont: {
    height: 60,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
});
