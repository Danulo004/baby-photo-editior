import React, { useState, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Btn from "../components/Btn";
import { Surface } from "gl-react-expo";
import ImageFilters from "react-native-gl-image-filters";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import AwesomeAlert from "react-native-awesome-alerts";
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height - 100;

function EditorScreen({ navigation, ...props }) {
  const [showAlert, setShowAlert] = useState(false);
  const viewShot = useRef();

  const saveToLibrary = async () => {
    const permissionResult = await MediaLibrary.getPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    viewShot.current.capture().then((uri) => {
      MediaLibrary.saveToLibraryAsync(uri);
      setShowAlert(true);
    });
  };

  const shareImage = async () => {
    const permissionResult = await MediaLibrary.getPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    viewShot.current.capture().then((uri) => {
      Sharing.shareAsync(uri);
    });
  };

  const aspectRatio =
    props.photo_height > props.photo_width
      ? windowHeight / props.photo_height
      : windowWidth / props.photo_width;
  const surfaceHeight = props.photo_height * aspectRatio;
  const surfaceWidth = props.photo_width * aspectRatio;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeftSide}>
          <Btn
            func={() => {
              navigation.goBack();
            }}
            type="SimpleLineIcons"
            name="camera"
            size={36}
          />
          <Btn
            func={() => {
              props.setOriginalValues();
              props.setPhotoUri(props.original_photo);
            }}
            type="SimpleLineIcons"
            name="trash"
            size={36}
          />
        </View>

        <View style={styles.headerRightSide}>
          <Btn
            func={() => {
              shareImage();
            }}
            type="SimpleLineIcons"
            name="share"
            size={36}
          />
          <Btn
            func={() => {
              saveToLibrary();
            }}
            type="FontAwesome"
            name="save"
            size={36}
          />
        </View>
      </View>
      <AwesomeAlert
        show={showAlert}
        title="Saved to gallery"
        message="Do you like our editor?"
        closeOnTouchOutside={true}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Not really"
        confirmText="Yes exactly"
        cancelButtonColor="#ce6583"
        confirmButtonColor="#65ce9b"
        onCancelPressed={() => {
          setShowAlert(false);
          navigation.navigate("Home");
        }}
        onConfirmPressed={() => {
          setShowAlert(false);
          navigation.navigate("Home");
        }}
        onDismiss={() => {
          setShowAlert(false);
          navigation.navigate("Home");
        }}
        titleStyle={{ color: "#9665CE" }}
        messageStyle={{ color: "#AB9CBE" }}
        contentContainerStyle={{ borderRadius: 0 }}
      />
      <ViewShot
        ref={viewShot}
        options={{ format: "jpg", quality: 0.9 }}
        style={{
          width: surfaceWidth,
          height: surfaceHeight,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Surface
          style={{
            width: surfaceWidth,
            height: surfaceHeight,
          }}
        >
          <ImageFilters
            hue={props.hue}
            blur={props.blur}
            sepia={props.sepia}
            sharpen={props.sharpen}
            negative={props.negative}
            contrast={props.contrast}
            saturation={props.saturation}
            brightness={props.brightness}
            temperature={props.temperature}
          >
            {{ uri: props.photo_uri }}
          </ImageFilters>
        </Surface>
      </ViewShot>

      <View style={styles.footer}>
        <View style={styles.footerBtns}>
          <Btn
            func={() => {
              navigation.push("Stikers");
            }}
            type="MaterialCommunityIcons"
            name="sticker"
            size={40}
          />
          <Btn
            func={() => {
              navigation.push("FiltersPresets");
            }}
            type="FontAwesome"
            name="magic"
            size={40}
            FiltersPresets
          />
          <Btn
            func={() => {
              navigation.push("Filters");
            }}
            type="Feather"
            name="sliders"
            size={40}
          />
          <Btn
            func={() => {
              navigation.push("TextEditor");
            }}
            type="MaterialCommunityIcons"
            name="format-text"
            size={42}
          />
          <Btn
            func={() => {
              navigation.push("RotationEditor");
            }}
            type="Feather"
            name="rotate-cw"
            size={38}
          />
        </View>
      </View>
    </View>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorScreen);
function mapDispatchToProps(dispatch) {
  return {
    setPhotoUri: (uri) => dispatch({ type: "SET_PHOTO_URI", uri: uri }),
    // setPhotoData: (data) => dispatch({ type: "SET_PHOTO_DATA", data: data }),
    setOriginalValues: () => dispatch({ type: "SET_ORIGINAL_VALUES" }),
  };
}

function mapStateToProps(state) {
  return {
    photo_uri: state.photo_uri,
    photo_data: state.photo_data,
    photo_width: state.photo_width,
    photo_height: state.photo_height,
    original_photo: state.original_photo,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  headerLeftSide: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
  },
  headerRightSide: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footer: {
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
  },
  footerBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
});
