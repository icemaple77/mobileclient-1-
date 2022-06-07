import * as React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import BottomSheetContent from "./components/BottomSheetContent";
import WatchList from "./components/WatchList";
import UseNewHistories from "./components/HistoryFetch";
import getDataQuote from "./components/QuoteFetch";
import GraphContent from "./components/GraphContent";
import TableContent from "./components/TableContent";
import { StocksProvider } from "./contexts/StocksContext";
import "react-native-gesture-handler";
import { DeviceEventEmitter } from "react-native";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <View style={styles.container}>
      <StocksProvider>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="BottomSheet" component={BottomSheetContent} />
            <Stack.Screen name="GraphContent" component={GraphContent} />
            <Stack.Screen name="TableContent" component={TableContent} />
            <Stack.Screen name="WatchList" component={WatchList} />
            <Stack.Screen name="FetchHistory" component={UseNewHistories} />
            <Stack.Screen name="FetchQuote" component={getDataQuote} />
          </Stack.Navigator>
        </NavigationContainer>
      </StocksProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
