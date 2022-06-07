import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStocksContext } from "../contexts/StocksContext";
import { HeaderStyleInterpolators } from "@react-navigation/stack";

// import GetGlobalItem from "../components/GetGlobalItem";

export default async function AddWatchList(email, symbol) {
  const { ServerURL } = useStocksContext();

  try {
    let res = await fetch(`${ServerURL}/api/watchlist`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        symbol: symbol,
      }),
    });

    let data = await res.json();

    if (!data.error) {
      console.log("成功");
    }
  } catch (error) {
    //alert 待处理
    console.log("register_shabi");
  }
}
