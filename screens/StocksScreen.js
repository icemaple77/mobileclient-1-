import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
  DeviceEventEmitter,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { StocksProvider } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";
import WatchList from "../components/WatchList";
import GetGlobalItem from "../components/GetGlobalItem";
import SearchApiQuote from "../components/QuoteFetch";
import useNewHistories from "../components/HistoryFetch";
import AddToWatchList from "../components/AddToWatchList";
import { ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

const API_KEY = "58cd6a31bd2bcaed4420ce5a8ed32031";

// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)

export default function StocksScreen({ route }) {
  const { watchList } = useStocksContext();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [symbolList, setSymbolList] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  // const [quoteData, setQuoteData] = useState([]);
  const [currentEmail, setCurrentEmail] = useState();

  const refRBSheet = useRef();

  const email1 = GetGlobalItem("@storage_email");

  // const watchList_arr = [];
  // watchList_arr = watchList;
  const watchlist_map = [];
  console.log(watchList);
  watchList.map((x) => watchlist_map.push(x.symbol));

  // for (let i = 0; i < watchList.length; i++) {
  //   console.log(i);
  //   watchlist_map = watchList[i];
  //   console.log(watchlist_map);
  // }

  let symbollist_fetch = watchlist_map.toString();

  //Fetch symbol quote
  const { loadingQ, rowDataQ, errorQ } = SearchApiQuote(symbollist_fetch);
  const { loading, HistoryData, error } = useNewHistories("AAPL");

  const watchlist_info = rowDataQ.map((x) => x);
  // const history_info = HistoryData.map((x) => x);
  // console.log(history_info);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.scrollview}>
            <WatchList
              stockData={watchlist_info}
              searchPhrase={searchPhrase}
              email={email1}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <View style={styles.container}>
    //     <Searchbar />
    //   </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    // marginTop: 20,
    // fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  scrollview: {
    width: "95%",
  },
  // use scaleSize(x) to adjust sizes for small/large screens
});
