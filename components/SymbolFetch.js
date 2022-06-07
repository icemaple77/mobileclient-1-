import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "58cd6a31bd2bcaed4420ce5a8ed32031";
//58cd6a31bd2bcaed4420ce5a8ed32031
//9bdf814120dd203b072c0828821bd0e2
//5f952ebacc0873075202833d2ef2c97d

async function getStock() {
  // const url = `${ServerURL}/api/symbol`;
  const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`;
  let res = await fetch(url);
  let stocks = await res.json();

  //stocks.queryStock.map
  return stocks.map((stock) => {
    return {
      symbol: stock.symbol,
      name: stock.name,
    };
  });
}

export default function FetchStock() {
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [api_symbol, setApi_Symbol] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setStockList(await getStock());
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  return { loading, stockList, error };
}
