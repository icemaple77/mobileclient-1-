import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component-2";

import GetGlobalItem from "../components/GetGlobalItem";
import useNewHistories from "../components/HistoryFetch";
import SearchApiQuote from "../components/QuoteFetch";
import Graph from "./GraphContent";

//const API_KEY_ALPHA = "50BLSQ5WEKLRU6IZ";

export default function TableContent() {
  const quote = GetGlobalItem("@storage_quote");
  //const { loading, HistoryData, error } = useNewHistories(quote);
  const { loadingQ, rowDataQ, errorQ } = SearchApiQuote(quote);
  //const [quoteInfo, setQuoteInfo] = useState([]);

  //const history_info = HistoryData.map((x) => x);
  //console.log(history_info);
  let quote_info = [];
  rowDataQ.map((x) => {
    quote_info = x;
  });

  //   let a = [];
  //   for (let i = 0; i < rowDataQ.length; i++) {
  //     console.log(i);
  //     a = rowDataQ[i];
  //     console.log("for " + rowDataQ[i].name);
  //     console.log("for " + rowDataQ[i].price);
  //   }

  //   console.log("map " + rowDataQ);
  //   console.log("maparray " + quote_info);
  //   console.log("fuck " + rowDataQ.name);
  //   console.log("aaaaa " + a.name);
  //console.log("bbbbb " + quote_info.name);

  let state = {
    tableHead: [`${quote_info.name}`],
    tableData: [
      [`AUD ${quote_info.price}`],
      ["Open", `${quote_info.open}`, "Year High", `${quote_info.yearhigh}`],
      [
        "Day High",
        `${quote_info.dayhigh}`,
        "Year Low",
        `${quote_info.yearlow}`,
      ],
      ["Day Low", `${quote_info.daylow}`, "Volume", `${quote_info.volume}`],
    ],
  };

  //   let state = {
  //     tableHead: [quote_info.name],
  //     tableColHead: ["Open", "Close", "Volume"],
  //     tableColHead2: ["Low", "High"],
  //     tableData: [[quote_info.open], [quote_info.close], [quote_info.volume]],
  //     tableData2: [[quote_info.daylow], [quote_info.dayhigh]],
  //   };

  // const test = quote.map((x) => x);
  //console.log(JSON.stringify(test));
  return (
    <SafeAreaView style={styles.container}>
      <Table borderStyle={{ border: "1px", borderColor: "#696969" }}>
        <Row
          data={state.tableHead}
          style={styles.head}
          textStyle={styles.header}
        />
        <Text style={styles.br}></Text>
        <Rows data={state.tableData} textStyle={styles.text} />
        <Text style={styles.br}></Text>
      </Table>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  head: { height: 40, fontSize: 20 },
  header: { margin: 6, color: "white", fontSize: 30 },
  text: { margin: 6, color: "white", fontSize: 15 },
  br: {
    height: 1,
    backgroundColor: "#808080",
  },
});
