import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";

const fetchFonts = () => {
  return Font.loadAsync({
    "ADayWithoutSun ": require("./assets/fonts/0_ADayWithoutSun.otf"),
    "BadScriptRegular ": require("./assets/fonts/0_BadScriptRegular.ttf"),
    "Bristol ": require("./assets/fonts/0_Bristol.otf"),
    "BudmoJiggler ": require("./assets/fonts/0_BudmoJiggler.otf"),
    "LemonTuesday ": require("./assets/fonts/0_LemonTuesday.otf"),
    "London ": require("./assets/fonts/0_London.otf"),
    "MarckScriptRegular ": require("./assets/fonts/0_MarckScriptRegular.ttf"),
    "Mateur ": require("./assets/fonts/0_Mateur.ttf"),
    "Phorssa ": require("./assets/fonts/0_Phorssa.ttf"),
    "SolenaRegular ": require("./assets/fonts/0_SolenaRegular.otf"),
    "Stripe ": require("./assets/fonts/0_Stripe.ttf"),
    "VelesRegular ": require("./assets/fonts/0_VelesRegular.otf"),
    "CFJackStory-Regular": require("./assets/fonts/1_CFJackStory-Regular.ttf"),
    "daniel ": require("./assets/fonts/1_daniel.ttf"),
    "danielbd ": require("./assets/fonts/1_danielbd.ttf"),
    "danielbk ": require("./assets/fonts/1_danielbk.ttf"),
    "REIS-Regular": require("./assets/fonts/1_REIS-Regular.ttf"),
    "AlegreyaSansSC-Black": require("./assets/fonts/AlegreyaSansSC-Black.ttf"),
    "AlegreyaSansSC-Light": require("./assets/fonts/AlegreyaSansSC-Light.ttf"),
    "Almendra-Bold": require("./assets/fonts/Almendra-Bold.ttf"),
    "Almendra-Italic": require("./assets/fonts/Almendra-Italic.ttf"),
    "Amaranth-BoldItalic": require("./assets/fonts/Amaranth-BoldItalic.ttf"),
    "CevicheOne-Regular": require("./assets/fonts/CevicheOne-Regular.ttf"),
    "LibreBaskerville-Regular": require("./assets/fonts/LibreBaskerville-Regular.ttf"),
    "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
    "Oregano-Regular": require("./assets/fonts/Oregano-Regular.ttf"),
    "RobotoCondensed-Light": require("./assets/fonts/RobotoCondensed-Light.ttf"),
  });
};

const initialState = {
  photo_uri: null,
  photo_data: null,
  photo_width: null,
  photo_height: null,
  original_photo: null,
  hue: 0,
  blur: 0,
  sepia: 0,
  sharpen: 0,
  negative: 0,
  contrast: 1,
  saturation: 1,
  brightness: 1,
  temperature: 6500,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORIGINAL_VALUES":
      return {
        ...state,
        hue: 0,
        blur: 0,
        sepia: 0,
        sharpen: 0,
        negative: 0,
        contrast: 1,
        saturation: 1,
        brightness: 1,
        temperature: 6500,
      };
    case "SET_PHOTO_URI":
      return { ...state, photo_uri: action.uri };
    case "SET_ORIGINAL_PHOTO":
      return { ...state, original_photo: action.uri };
    case "SET_PHOTO_DATA":
      return { ...state, photo_data: action.data };
    case "SET_PHOTO_WIDTH":
      return { ...state, photo_width: action.width };
    case "SET_PHOTO_HEIGHT":
      return { ...state, photo_height: action.height };
    case "CHANGE_FILTER_VALUE":
      switch (action.name) {
        case "hue":
          return { ...state, hue: action.value };
        case "blur":
          return { ...state, blur: action.value };
        case "sepia":
          return { ...state, sepia: action.value };
        case "sharpen":
          return { ...state, sharpen: action.value };
        case "negative":
          return { ...state, negative: action.value };
        case "contrast":
          return { ...state, contrast: action.value };
        case "saturation":
          return { ...state, saturation: action.value };
        case "brightness":
          return { ...state, brightness: action.value };
        case "temperature":
          return { ...state, temperature: action.value };
      }
  }
  return state;
};
const store = createStore(reducer);

import MainScreen from "./app/screens/MainScreen";
import EditorScreen from "./app/screens/EditorScreen";
import StikersScreen from "./app/screens/StikersScreen";
import FiltersScreen from "./app/screens/FiltersScreen";
import SliderScreen from "./app/screens/SliderScreen";
import TextEditor from "./app/screens/TextEditor";
import SaveScreen from "./app/screens/SaveScreen";
import StickersEditor from "./app/screens/StickersEditor";
import FiltersPresetsScreen from "./app/screens/FiltersPresetsScreen";
import RotationScreen from "./app/screens/RotationScreen";
import { AppLoading } from "expo";
RotationScreen;
const Stack = createStackNavigator();

export default function App() {
  const [loading, setloading] = useState(true);
  if (loading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setloading(false);
        }}
      />
    );
  }
  fetchFonts();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Editor" component={EditorScreen} />
          <Stack.Screen name="Stikers" component={StikersScreen} />
          <Stack.Screen name="StickersEditor" component={StickersEditor} />
          <Stack.Screen name="Filters" component={FiltersScreen} />
          <Stack.Screen name="Slider" component={SliderScreen} />
          <Stack.Screen name="TextEditor" component={TextEditor} />
          <Stack.Screen name="RotationEditor" component={RotationScreen} />
          <Stack.Screen name="Save" component={SaveScreen} />
          <Stack.Screen
            name="FiltersPresets"
            component={FiltersPresetsScreen}
          />
        </Stack.Navigator>
        <StatusBar hidden={true} />
      </NavigationContainer>
    </Provider>
  );
}
