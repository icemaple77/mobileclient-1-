import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY_ALPHA = "B1KZDEJUQYTKCG65";
//B1KZDEJUQYTKCG65
//50BLSQ5WEKLRU6IZ

async function getHistory(clickedsymbol) {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${clickedsymbol}&outputsize=compact&apikey=${API_KEY_ALPHA}`;
  //let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=compact&apikey=${API_KEY_ALPHA}`;
  let res = await fetch(url);
  let data = await res.json();
  data = Object.entries(data)[1][1];
  let histories = Object.entries(data);

  console.log(clickedsymbol);
  console.log(histories);
  return histories.map((history) => {
    return {
      date: history[0],
      open: history[1]["1. open"],
      high: history[1]["2. high"],
      low: history[1]["3. low"],
      close: history[1]["4. close"],
      volume: history[1]["5. volume"],
    };
  });
}

export default function UseNewHistories(clickedsymbol, fromdate) {
  const [HistoryData, setRowHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [api_symbol, setApi_Symbol] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setRowHistoryData(await getHistory(clickedsymbol));
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
  }, [clickedsymbol]);

  return { loading, HistoryData, error };
}
