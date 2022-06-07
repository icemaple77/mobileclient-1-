import React, { useState, useRef } from "react";
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
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddWatchList from "./AddToWatchList";
import OpenBottomSheet from "../components/BottomSheet";

export default function WatchList(props) {
  const [data, setData] = useState();
  let stocklist = props.stockData;
  const refRBSheet = useRef();
  let test1 = "hahahah";

  async function setGlobalValue(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // save error
    }
  }
  // console.log(JSON.stringify(data));
  // let abc = JSON.stringify(data);
  // console.log("abc " + data);
  setGlobalValue("@storage_quote", data);
  return (
    <SafeAreaView>
      <ScrollView>
        {stocklist.map((item, i) => (
          <View key={i} style={styles.container}>
            {/* bottomDivider container */}
            <ListItem
              containerStyle={styles.listitem}
              onPress={() => {
                setData(item.symbol);
                refRBSheet.current.open();
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={styles.symbol}>
                  {item.symbol}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} style={styles.name}>
                  {item.name}
                </ListItem.Subtitle>
              </ListItem.Content>
              <View style={{ flex: 1, width: "auto", maxWidth: "25%" }}>
                <Text style={styles.righttext}>
                  {"$" + item.price.toFixed(2)}
                </Text>
                <View>
                  <Button
                    title={item.percentage.toFixed(2) + "%"}
                    color={item.percentage > 0 ? "#228B22" : "#B22222"}
                  />
                  <OpenBottomSheet refRBSheet={refRBSheet} />
                </View>
              </View>
            </ListItem>
            <Text style={styles.br}>{/* <br /> */}</Text>
          </View>

          // <View style={styles.container} key={i}>
          //   <View>
          //     <Text style={styles.stocklist}>{stock.symbol}</Text>
          //     <Text style={styles.stocklist}>{stock.name}</Text>
          //   </View>
          //   <Button></Button>
          // </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  //   return (
  //     <View style={styles.container}>
  //       <ListofStocks />
  //     </View>
  //   );
}

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
  righttext: {
    textAlign: "right",
    color: "white",
  },
});
