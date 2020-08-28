import React, { useState, useRef } from "react";
import { StyleSheet, View, Dimensions, Animated, Alert } from "react-native";
import Btn from "../components/Btn";
import BackArrowHeader from "../components/BackArrowHeader";
import { connect } from "react-redux";
import ViewShot from "react-native-view-shot";
import AwesomeAlert from "react-native-awesome-alerts";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height - 100;
function rotationScreen({ route, navigation, ...props }) {
  const horizontalHeight =
    props.photo_height > props.photo_width
      ? windowHeight
      : (windowWidth / props.photo_width) * props.photo_height;
  const horizontalWidth =
    props.photo_height > props.photo_width
      ? (windowHeight / props.photo_height) * props.photo_width
      : windowWidth;

  const [surfaceHeight, setSurfaceHeight] = useState(horizontalHeight);
  const [surfaceWidth, setSurfaceWidth] = useState(horizontalWidth);

  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const [showAlert, setShowAlert] = useState(false);

  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-360deg", "0deg", "360deg"],
  });

  const captureFrame = useRef();
  const savePhoto = async () => {
    captureFrame.current.capture().then((uri) => {
      props.setPhotoUri(uri);

      setShowAlert(true);
      setInterval(() => {
        setShowAlert(false);
      }, 1000);
    });
  };
  return (
    <View style={styles.container}>
      <BackArrowHeader navigation={navigation} />
      <AwesomeAlert
        show={showAlert}
        title="Saved"
        message="You can continue editing!"
        closeOnTouchOutside={true}
        onDismiss={() => {
          navigation.navigate("Editor");
        }}
        titleStyle={{ color: "#9665CE" }}
        messageStyle={{ color: "#AB9CBE" }}
        contentContainerStyle={{ borderRadius: 0 }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#aaa",
        }}
      >
        <ViewShot
          ref={captureFrame}
          options={{ format: "jpg", quality: 0.9 }}
          style={{
            width: surfaceWidth,
            height: surfaceHeight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={{
              uri: props.photo_uri,
            }}
            style={{
              width: surfaceWidth,
              height: surfaceHeight,
              transform: [
                {
                  rotate: spin,
                },
                { scaleX },
                { scaleY },
              ],
            }}
          />
        </ViewShot>
        <View style={{ height: 40 }}></View>
        <View style={styles.footer}>
          <View style={styles.sliderCont}>
            <Btn
              func={() => {
                // rotateLeft();
              }}
              type={"Feather"}
              name={"rotate-ccw"}
              size={30}
            />

            <Btn
              func={() => {
                // rotateRight();
              }}
              type={"Feather"}
              name={"rotate-cw"}
              size={30}
            />
            <Btn
              func={() => {
                setScaleX(scaleX * -1);
              }}
              type={"MaterialCommunityIcons"}
              name={"reflect-horizontal"}
              size={30}
            />
            <Btn
              func={() => {
                setScaleY(scaleY * -1);
              }}
              type={"MaterialCommunityIcons"}
              name={"reflect-vertical"}
              size={30}
            />
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Btn
                func={() => {
                  savePhoto();
                }}
                type={"MaterialIcons"}
                name={"done"}
                size={30}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    photo_uri: state.photo_uri,
    photo_data: state.photo_data,
    photo_width: state.photo_width,
    photo_height: state.photo_height,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setPhotoUri: (uri) => dispatch({ type: "SET_PHOTO_URI", uri: uri }),
    setPhotoData: (data) => dispatch({ type: "SET_PHOTO_DATA", data: data }),
    setPhotoWidth: (width) =>
      dispatch({ type: "SET_PHOTO_WIDTH", width: width }),
    setPhotoHeight: (height) =>
      dispatch({ type: "SET_PHOTO_HEIGHT", height: height }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(rotationScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
  footer: {
    position: "absolute",
    bottom: 0,
  },
  sliderCont: {
    width: Dimensions.get("window").width,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
