import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
} from "react-native";

import SearchBar from "../components/SearchBar";
import SearchApiQuote from "../components/QuoteFetch";
import OpenBottomSheet from "../components/BottomSheet";
import StockList from "../components/StockList";
import GetGlobalItem from "../components/GetGlobalItem";

const API_KEY = "58cd6a31bd2bcaed4420ce5a8ed32031";
//58cd6a31bd2bcaed4420ce5a8ed32031

// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

export default function SearchScreen({ navigation }) {
  //const { ServerURL, addToWatchlist } = useStocksContext();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const [watchlist, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Fetch database watchlist
  // https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}
  async function getWatchList() {
    const url = `http://localhost:3000/api/watchlist_symbol`;
    //const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`;
    let res = await fetch(url);
    let stocks = await res.json();

    //stocks.queryStock.map
    return stocks.queryWatchList.map((stock) => {
      return {
        symbol: stock.symbol,
        email: stock.email,
      };
    });
  }

  useEffect(() => {
    (async () => {
      try {
        console.log("111" + watchlist);
        setWatchList(await getWatchList());
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  let stocklist = [];
  watchlist.map((stocks) => {
    stocklist.push({
      symbol: stocks.symbol,
      email: stocks.email,
    });
  });

  const searchedData = stocklist.filter((data) => {
    if (data.email.includes("hello")) {
      return data;
    }
  });
  //Fetch database watchlist -- END

  const symbol_watchlist = searchedData.map((e) => {
    return e.symbol;
  });

  console.log("list_test_shabi " + symbol_watchlist.toString());

  let test = symbol_watchlist.toString();
  const { rowQuoteData } = SearchApiQuote(test);

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Programming Languages</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <OpenBottomSheet />

      {/* <List
        searchPhrase={searchPhrase}
        data={fakeData}
        setClicked={setClicked}
      /> */}
    </SafeAreaView>
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
