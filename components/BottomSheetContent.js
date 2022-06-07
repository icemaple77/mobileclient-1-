import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StocksContext, useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { State } from "react-native-gesture-handler";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

import useNewHistories from "../components/HistoryFetch";
import SearchApiQuote from "../components/QuoteFetch";
import Graph from "./GraphContent";
import TableContent from "./TableContent";
import GraphContent from "./GraphContent";
import GraphTest from "./GraphTest";
import GetGlobalItem from "../components/GetGlobalItem";

//const API_KEY_ALPHA = "50BLSQ5WEKLRU6IZ";

export default function BottomSheetContent() {
  const quote = GetGlobalItem("@storage_quote");
  return (
    <View>
      {/* <View style={{ color: "white" }}>{quote}</View> */}
      <TableContent />
      <GraphContent />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     color: "white",
//     flex: scaleSize(1),
//     paddingTop: scaleSize(22),
//   },
//   item: {
//     fontSize: scaleSize(20),
//     height: scaleSize(40),
//     padding: scaleSize(10),
//     color: "white",
//   },
//   TextInput: {
//     backgroundColor: "#b5b5b5",
//     width: "80%",
//     height: "20%",
//   },
//   head: {
//     height: scaleSize(50),
//   },
//   text: {
//     margin: scaleSize(3),
//     color: "white",
//     textAlign: "center",
//   },
//   wrapper: {
//     flexDirection: "row",
//   },
// });
