import React, { useRef, useState } from "react";
import { StyleSheet, View, ImageBackground, Animated } from "react-native";
import { connect } from "react-redux";
import ViewShot from "react-native-view-shot";
import AwesomeAlert from "react-native-awesome-alerts";
import Btn from "../components/Btn";
import BackArrowHeader from "../components/BackArrowHeader";

function SaveScreen({ route, navigation, ...props }) {
  const {
    text,
    sticker,
    font,
    color,
    _scale,
    opacity,
    point,
    _rotateStr,
    surfaceHeight,
    surfaceWidth,
  } = route.params;
  const [showAlert, setShowAlert] = useState(false);

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
        }}
      >
        <ViewShot
          ref={captureFrame}
          options={{ format: "jpg", quality: 0.9 }}
          style={{
            width: surfaceWidth,
            height: surfaceHeight,
          }}
        >
          <ImageBackground
            source={{
              uri: props.photo_uri,
            }}
            style={{
              flex: 1,
              width: surfaceWidth,
              height: surfaceHeight,
            }}
          >
            {text !== undefined ? (
              <Animated.Text
                style={[
                  {
                    fontFamily: font,
                    color: color,
                    fontSize: _scale,
                    transform: [
                      { translateX: -50 },
                      { translateY: -25 },
                      { rotate: _rotateStr },
                    ],
                    opacity: opacity,
                  },
                  point.getLayout(),
                ]}
              >
                {text}
              </Animated.Text>
            ) : null}

            {sticker !== undefined ? (
              <Animated.Image
                source={sticker}
                style={[
                  {
                    width: 50,
                    height: 50,
                    transform: [
                      { scale: _scale },
                      { translateX: 0 },
                      { translateY: 0 },
                      { rotate: _rotateStr },
                    ],
                    opacity: opacity,
                  },
                  point.getLayout(),
                ]}
                tintColor={color}
              />
            ) : null}
          </ImageBackground>
        </ViewShot>
      </View>

      <View style={styles.sliderCont}>
        <Btn
          func={() => {
            navigation.goBack();
          }}
          type={"MaterialIcons"}
          name={"cancel"}
          size={30}
          style={{ borderRadius: 50 }}
        />
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
  );
}

function mapStateToProps(state) {
  return {
    photo_uri: state.photo_uri,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPhotoUri: (uri) => dispatch({ type: "SET_PHOTO_URI", uri: uri }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SaveScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f88",
  },
  sliderCont: {
    height: 50,
    width: "100%",
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
