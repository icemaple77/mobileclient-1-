import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createTwoButtonAlert from "../components/Alert";
import EnterBar from "../../../Client/components/EnterBar";

async function VerifyLogin(
  ServerURL,
  email,
  password,
  navigation,
  setStatus,
  watchList
) {
  try {
    let res = await fetch(`${ServerURL}/api/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email: email, password: password }),
    });

    let data = await res.json();

    console.log(data);

    data.error ? (setStatus(false), alert(data.message)) : setStatus(true);
    setGlobalValue("@storage_token", data.token);
    setGlobalValue("@storage_email", email);
  } catch (data) {
    alert(
      "404 Server is under maintaince! We are working on it! You can make money after 24 hours!"
    );
  }
}

async function setGlobalValue(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
  }
}

export default function Login({ navigation }) {
  const { getWatchlist, watchList } = useStocksContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const ServerURL = "http://localhost:3000";
  //AsyncStorage.removeItem("@storage_token");
  //AsyncStorage.removeItem("@storage_email");
  // can put more code here

  const watchlist_map = [];

  watchList.map((x) => watchlist_map.push(x.symbol));

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
    if (status) {
      getWatchlist();

      setGlobalValue("@storage_watchlist", JSON.stringify(watchlist_map));
      navigation.navigate("Home");
    }
  }, [status]);

  return (
    <View style={styles.container}>
      <EnterBar
        name="mail"
        placeholder="Enter your email address"
        value={email}
        setValue={setEmail}
      />
      <EnterBar
        name="key"
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
      />

      <Button
        title="Login"
        onPress={() => {
          VerifyLogin(
            ServerURL,
            email,
            password,
            navigation,
            setStatus,
            watchList
          );
        }}
      />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
