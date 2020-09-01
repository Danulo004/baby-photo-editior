import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Slider,
  ImageBackground,
  PanResponder,
  Animated,
} from "react-native";
import Btn from "../components/Btn";
import BackArrowHeader from "../components/BackArrowHeader";
import { SliderHuePicker } from "react-native-slider-color-picker";
import { HSVtoRGB } from "../functions";
import { connect } from "react-redux";
import {
  State,
  RotationGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";

function StickersEditor({ route, navigation, ...props }) {
  const { sticker, colorable } = route.params;

  const [color, setColor] = useState(colorable ? "rgb(255,255,255)" : null);
  const [opacity, setOpacity] = useState(1);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight =
    Dimensions.get("window").height - (colorable ? 160 : 100);

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
  const _baseScale = new Animated.Value(1);
  const _pinchScale = new Animated.Value(1);
  const _scale = new Animated.multiply(_baseScale, _pinchScale);
  let _lastScale = 1;
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

  const saveSticker = () => {
    navigation.push("Save", {
      sticker: sticker,
      color: color,
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
          alignItems: "center",
          justifyContent: "center",
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
                    <Animated.Image
                      source={sticker}
                      {...panResponder.panHandlers}
                      style={[
                        {
                          width: 50,
                          height: 50,
                          transform: [
                            { scale: _scale },
                            { rotate: _rotateStr },
                            { translateX: 0 },
                            { translateY: 0 },
                          ],
                          opacity: opacity,
                        },
                        point.getLayout(),
                      ]}
                      tintColor={color}
                    />
                  </Animated.View>
                </RotationGestureHandler>
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </ImageBackground>
      </View>

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
              saveSticker();
            }}
            type={"MaterialIcons"}
            name={"done"}
            size={30}
          />
        </View>
        {colorable ? (
          <View style={styles.hueSliderCont}>
            <SliderHuePicker
              trackStyle={[{ height: 12 }]}
              onColorChange={(value) => {
                const color = HSVtoRGB(value.h, 1, 1);
                setColor(`rgb(${color.r},${color.g},${color.b})`);
              }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(StickersEditor);

function mapStateToProps(state) {
  return {
    photo_uri: state.photo_uri,
    photo_data: state.photo_data,
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
  footer: {
    bottom: 0,
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
