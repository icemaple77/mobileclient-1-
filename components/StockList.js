import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  Button,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import { useStocksContext } from "../contexts/StocksContext";

import AddWatchList from "./AddToWatchList";

function CheckButton(watchList, symbol) {
  //console.log("shabi");
  let check = false;
  let watch_list = [];
  watch_list = watchList;
  watch_list.map((x) => {
    if (x.symbol == symbol) {
      //console.log("watchlist" + x.symbol);
      //console.log("symbol" + symbol);
      check = true;
    }
  });
  return check;

  // for (let i = 0; i < watchList.length; i++) {
  //   if (watchList[i] == symbol) {
  //     console.log(watchList);
  //     console.log(symbol);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}

async function CheckButton2(watchList, stocklist) {
  //console.log("shabi");
  //let check = false;
  let watch_list = [];
  let stocklist_checked = [];
  watch_list = await watchList;
  //console.log("Check" + watchList);
  //console.log("Check1 " + stocklist);
  stocklist.map((y) => {
    watch_list.map((x) => {
      if (y.symbol == x.symbol) {
        //console.log("watchlist" + x.symbol);
        //console.log("symbol" + symbol);
        //console.log("y " + y.symbol);
        stocklist_checked.push({
          symbol: y.symbol,
          name: y.name,
          check: true,
        });
      } else {
        stocklist_checked.push({
          symbol: y.symbol,
          name: y.name,
          check: false,
        });
      }
    });
  });
  return stocklist_checked;
}

// async function getStock(stocklist, watch_list) {
//   // const url = `${ServerURL}/api/symbol`;
//   const wa = watch_list;
//   let res = await CheckButton(stocklist, wa);

//   //stocks.queryStock.map
//   return stocks.map((stock) => {
//     return {
//       symbol: stock.symbol,
//       name: stock.name,
//     };
//   });
// }

export default function StockList(props) {
  const [stockList, setStockList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [Statue, setStatue] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToWatchlist, getWatchlist, removeFromWatchlist, watchList } =
    useStocksContext();
  let state = false;
  let stocklist = [];
  stocklist = props.stockData;
  let abc = props.watch_list;
  //console.log("abc" + stocklist);
  //setGetWatchList(props.watch_list);

  let watch_list = [];

  watch_list = watchList;

  async function checkStocklist(stocklist, watch_list) {
    let status;
    let stocklist_checked = [];
    stocklist.map((y) => {
      status = watch_list.some((x) => {
        if (y.symbol == x.symbol) {
          return true;
        } else {
          return false;
        }
      });
      stocklist_checked.push({
        symbol: y.symbol,
        name: y.name,
        check: status,
      });
    });
    return stocklist_checked;
  }

  useEffect(() => {
    async () => {
      try {
        setStockList(await checkStocklist(stocklist, watch_list));
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
  }, [stocklist, watch_list]);

  //checkStocklist(stocklist, watch_list);

  console.log(stockList);
  if (loading) {
    return (
      <View>
        <Button />
      </View>
    );
  }
  return stockList.map((stock, i) => (
    <SafeAreaView key={i}>
      <ScrollView key={i}>
        <View key={i} style={styles.container}>
          {/* bottomDivider container */}
          <ListItem containerStyle={styles.listitem}>
            <ListItem.Content>
              <ListItem.Title style={styles.symbol}>
                {stock.symbol}
              </ListItem.Title>
              <ListItem.Subtitle numberOfLines={1} style={styles.name}>
                {stock.name}
              </ListItem.Subtitle>
            </ListItem.Content>
            {stock.check ? (
              <Button
                title="Delete"
                style={styles.button}
                color="black"
                onPress={() => {
                  //addToWatchlist(stock.symbol);
                  clicked ? setClicked(false) : setClicked(true),
                    removeFromWatchlist(stock.symbol),
                    alert("Has been removed from watchlist!");
                }}
              />
            ) : (
              <Button
                title="Add"
                style={styles.button}
                color="black"
                onPress={() => {
                  clicked ? setClicked(false) : setClicked(true),
                    props.setAddSymbol(stock.symbol),
                    //addToWatchlist(stock.symbol),
                    alert("Has been added to watchlist!");
                }}
              />
            )}

            {/* <Button
              title={CheckButton(watchList, stock.symbol) ? "Delete" : "Add"}
              style={styles.button}
              color="black"
              onPress={() => {
                //addToWatchlist(stock.symbol);
                CheckButton(watchList, stock.symbol)
                  ? () => {
                      removeFromWatchlist(stock.symbol),
                        alert("Has been removed from watchlist!");
                    }
                  : () => {
                      addToWatchlist(stock.symbol),
                        alert("Has been added to watchlist!");
                    };
              }}
              // onPress={() => {
              //   // props.setSymbolData(stock.symbol);
              //   AddToWatchList(props.email, stock.symbol);
              //   alert("Has been added to watchlist!");
              // }}
            /> */}
          </ListItem>
          <Text style={styles.br}>{/* <br /> */}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

    // <View style={styles.container} key={i}>
    //   <View>
    //     <Text style={styles.stocklist}>{stock.symbol}</Text>
    //     <Text style={styles.stocklist}>{stock.name}</Text>
    //   </View>
    //   <Button></Button>
    // </View>
  ));
}

//   return (
//     <View style={styles.container}>
//       <ListofStocks />
//     </View>
//   );

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", color: "white", borderRadius: 10 },
  listitem: {
    backgroundColor: "black",
    borderRadius: 10,
    borderBottomColor: "white",
  },
  symbol: {
    // backgroundColor: "white",
    color: "white",
    padding: 5,
    borderRadius: 10,
    borderBottomColor: "white",
    margin: 2,
  },
  name: {
    // backgroundColor: "white",
    color: "#808080",
    padding: 5,
    borderRadius: 10,
    borderBottomColor: "white",
    margin: 2,
  },
  br: {
    height: 1,
    backgroundColor: "#808080",
  },
});
