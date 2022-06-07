import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createTwoButtonAlert from "../components/Alert";
import EnterBar from "../../../Client/components/EnterBar";
import { NavigationContainer } from "@react-navigation/native";

async function RegisterUser(ServerURL, email, username, password, navigation) {
  console.log(password);
  try {
    let res = await fetch(`${ServerURL}/api/register`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    let data = await res.json();
    console.log(data);
    console.log(data.error);

    if (!data.error) {
      navigation.navigate("Login");
    }
  } catch (error) {
    //alert 待处理
    console.log("register_shabi");
  }
}

// check valid email input
function verifyEmail(email) {
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    console.log("Invalid email");
    return false;
  } else {
    console.log("Valid email");
    return true;
  }
}

// check valid password (combination of letters and number)
function verifyPassword(password) {
  if (!password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/)) {
    console.log("Invalid password");
    return false;
  } else {
    console.log("Valid password");
    return true;
  }
}

//check re-enter password
function verifyReenterPassword(password, repassword) {
  if (password === repassword) {
    return true;
  } else {
    return false;
  }
}

function checkRegister(email, password, repassword) {
  if (!verifyEmail(email)) {
    alert("Invalid Email!");
    return false;
  } else if (!verifyPassword(password)) {
    alert("Invalid Password format!");
    return false;
  } else if (!verifyReenterPassword(password, repassword)) {
    alert("Passwords must match!");
    return false;
  } else {
    return true;
  }
}

export default function Register({ navigation }) {
  const { ServerURL, watchList } = useStocksContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [username, setUsername] = useState("");
  const ServerURL = "http://localhost:3000";

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
  }, []);

  return (
    <View style={styles.container}>
      <EnterBar
        name="mail"
        placeholder="Enter your email address"
        value={email}
        setValue={setEmail}
      />
      <EnterBar
        name="user"
        placeholder="Enter your username"
        value={username}
        setValue={setUsername}
      />
      <EnterBar
        name="key"
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
      />
      <EnterBar
        name="lock"
        placeholder="Re-Enter your password"
        value={repassword}
        setValue={setRePassword}
      />

      <Button
        title="Register"
        onPress={() => {
          //RegisterUser(ServerURL, email, username, password, navigation);
          checkRegister(email, password, repassword)
            ? RegisterUser(ServerURL, email, username, password, navigation)
            : console.log("Fail to register!");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
