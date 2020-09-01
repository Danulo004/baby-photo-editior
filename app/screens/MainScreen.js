import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function MainScreen({ navigation, ...props }) {
  const [touchedCamera, setTouchedCamera] = useState(false);
  const [touchedGallery, setTouchedGallery] = useState(false);
  const [posValCameraBtn] = useState(new Animated.Value(windowHeight));
  const [posValGalleryBtn] = useState(new Animated.Value(windowHeight));
  const [posValFooter] = useState(new Animated.Value(60));

  props.setOriginalValues();

  const openCameraPicker = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    processImage(pickerResult);
  };
  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    processImage(pickerResult);
  };

  const processImage = (pickerResult) => {
    if (pickerResult.cancelled == false) {
      props.setPhotoData(pickerResult);
      props.setPhotoUri(pickerResult.uri);
      props.setOriginalPhoto(pickerResult.uri);
      props.setPhotoWidth(pickerResult.width);
      props.setPhotoHeight(pickerResult.height);
      navigation.push("Editor");
    }
  };

  const DownUpAnimation = () => {
    Animated.sequence([
      Animated.timing(posValCameraBtn, {
        toValue: 0,
        duration: 750,
        useNativeDriver: false,
        easing: Easing.sin,
      }),
      Animated.timing(posValGalleryBtn, {
        toValue: 0,
        duration: 750,
        useNativeDriver: false,
        easing: Easing.sin,
      }),
      Animated.timing(posValFooter, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
        easing: Easing.sin,
      }),
    ]).start();
  };
  DownUpAnimation();
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Animated.View style={{ top: posValCameraBtn }}>
          <TouchableWithoutFeedback
            onPress={() => openCameraPicker()}
            onPressIn={() => setTouchedCamera(true)}
            onPressOut={() => setTouchedCamera(false)}
          >
            <View style={touchedCamera ? styles.btnPressed : styles.btn}>
              <SimpleLineIcons
                name="camera"
                size={84}
                color={touchedCamera ? "#fff" : "#AB9CBE"}
              />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View style={{ marginTop: 20, top: posValGalleryBtn }}>
          <TouchableWithoutFeedback
            onPress={() => openImagePicker()}
            onPressIn={() => setTouchedGallery(true)}
            onPressOut={() => setTouchedGallery(false)}
          >
            <View style={touchedGallery ? styles.btnPressed : styles.btn}>
              <SimpleLineIcons
                name="picture"
                size={84}
                color={touchedGallery ? "#fff" : "#AB9CBE"}
              />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>

      <Animated.View style={[styles.footer, { top: posValFooter }]}>
        <Text style={styles.link}>Privacy Policy</Text>
        <TouchableWithoutFeedback onPress={() => {}}>
          <SimpleLineIcons name="settings" size={32} color={"#AB9CBE"} />
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    setPhotoUri: (uri) => dispatch({ type: "SET_PHOTO_URI", uri: uri }),
    setPhotoData: (data) => dispatch({ type: "SET_PHOTO_DATA", data: data }),
    setOriginalValues: () => dispatch({ type: "SET_ORIGINAL_VALUES" }),
    setOriginalPhoto: (uri) =>
      dispatch({ type: "SET_ORIGINAL_PHOTO", uri: uri }),
    setPhotoWidth: (width) =>
      dispatch({ type: "SET_PHOTO_WIDTH", width: width }),
    setPhotoHeight: (height) =>
      dispatch({ type: "SET_PHOTO_HEIGHT", height: height }),
  };
}
export default connect(null, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    borderColor: "#AB9CBE",
    borderWidth: 1,
    borderRadius: 150,
    padding: 35,
  },
  btnPressed: {
    borderColor: "#9665CE",
    borderWidth: 1,
    borderRadius: 150,
    padding: 35,
    backgroundColor: "#9665CE",
  },
  footer: {
    width: windowWidth,
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: 18,
    color: "#555",
  },
});
