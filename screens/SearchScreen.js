import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button /* include other react native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";
import GetGlobalItem from "../components/GetGlobalItem";
import FetchStock from "../components/SymbolFetch";
import AddToWatchList from "../components/AddToWatchList";
import { ScrollView } from "react-native-gesture-handler";

const API_KEY = "5f952ebacc0873075202833d2ef2c97d";
//58cd6a31bd2bcaed4420ce5a8ed32031
//9bdf814120dd203b072c0828821bd0e2

// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

export default function SearchScreen({ navigation }) {
  const { addToWatchlist, getWatchlist, removeFromWatchlist, watchList } =
    useStocksContext();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [stockData, setStockData] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addSymbol, setAddSymbol] = useState("");
  const [watch_list, setWatch_List] = useState([]);
  const { loading, stockList, errorQ } = FetchStock();

  const email = GetGlobalItem("@storage_email");
  //console.log(addSymbol);

  let stocklist = [];
  stockList.map((stocks) => {
    stocklist.push({
      symbol: stocks.symbol,
      name: stocks.name,
    });
  });

  const searchedData = stocklist.filter((data) => {
    if (searchPhrase === "") return data;
    else if (data.symbol.toUpperCase().includes(searchPhrase.toUpperCase())) {
      return data;
    }
  });

  useEffect(() => {
    const _watchlist = getWatchlist();
    setWatch_List(_watchlist);
  }, [addSymbol]);

  useEffect(() => {
    if (addSymbol != "") {
      addToWatchlist(addSymbol);
    }
    //AsyncStorage.mergeItem("@storage_watchlist", JSON.stringify(addSymbol));
  }, [addSymbol]);

  //stocklist to component
  // let stocklist = [{ symbol: "", name: "" }];
  // AddToWatchList(email, symbolData);
  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Programming Languages</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      <ScrollView style={styles.scrollview}>
        <StockList
          stockData={searchedData}
          searchPhrase={searchPhrase}
          email={email}
          setAddSymbol={setAddSymbol}
          watch_list={watchList}
        />
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
