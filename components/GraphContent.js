// import React, { useState, useEffect, useContext } from "react";
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   Text,
//   TouchableOpacity,
//   Button,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Dimensions,
// } from "react-native";

// import { scaleSize } from "../constants/Layout";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";

// import GetGlobalItem from "./GetGlobalItem";
// import UseNewHistories from "./HistoryFetch";
// import SearchApiQuote from "./QuoteFetch";
// import Graph from "./GraphContent";
import { scaleSize } from "../constants/Layout";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import GetGlobalItem from "./GetGlobalItem";
import UseNewHistories from "./HistoryFetch";
import SearchApiQuote from "./QuoteFetch";
import Graph from "./GraphContent";

// //const API_KEY_ALPHA = "50BLSQ5WEKLRU6IZ";

export default function GraphContent() {
  const quote = GetGlobalItem("@storage_quote");
  console.log(quote);
  const { loading, HistoryData, error } = UseNewHistories(quote);
  console.log(HistoryData);
  const history_info = HistoryData.map((x) => x);

  const chartdate = HistoryData.map((x) => x.date);
  const chartclose = HistoryData.map((x) => x.close);
  const chartopen = HistoryData.map((x) => x.open);
  const charthigh = HistoryData.map((x) => x.high);
  const chartlow = HistoryData.map((x) => x.low);
  const chartvolume = HistoryData.map((x) => x.volume);

  let history_date = [];
  for (let i = 0; i < chartdate.length; i = i + 20) {
    history_date.push(chartdate[i]);
  }
  console.log(history_date);

  const graphData = {
    labels: history_date.reverse(),
    datasets: [
      // set data
      {
        data: chartclose.reverse(),
        // data: [
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        //   Math.random() * 100,
        // ],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // line color
      },
    ],
  };

  const chartConfig = {
    //backgroundColor: "#000000",
    backgroundGradientFrom: "#000000",
    backgroundGradientTo: "#424949",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    fillShadowGradientFrom: `rgba(49, 95, 59)`,
    fillShadowGradientTo: `rgba(28, 30, 29)`,
    fillShadowGradientOpacity: 0.5,
    useShadowColorFromDataset: true,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "1",
      strokeWidth: "2",
      stroke: "#7FFF00",
    },
    style: {
      marginVertical: 8,
      borderRadius: 16,
    },

    // backgroundColor: "#e26a00",
    // backgroundGradientFrom: "#1b1c1e",
    // backgroundGradientTo: "#1b1c1e",
    // fillShadowGradient: "#FFFFF0",
    // decimalPlaces: 2,
    // //color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // style: {
    //   borderRadius: 16,
    //   marginVertical: 8,
    // },
    // propsForDots: {
    //   r: "3",
    //   strokeWidth: "2",
    //   stroke: "#ADFF2F",
    // },
  };

  return (
    <View style={{ marginTop: 20 }}>
      <LineChart
        data={graphData}
        width={Dimensions.get("window").width - 16}
        height={220}
        withDots={false} //error
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
      />
    </View>
    // <SafeAreaView>
    //   <View>
    //     <LineChart
    //       data={graphData}
    //       width={Dimensions.get("window").width - 16} // from react-native, set width size
    //       height={scaleSize(120)}
    //       yAxisLabel="$"
    //       withDots={true} //error
    //       chartConfig={chartConfig}
    //       style={{
    //         marginVertical: scaleSize(8),
    //         borderRadius: scaleSize(16),
    //       }}
    //       bezier
    //     />
    //   </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: scaleSize(1),
  //   justifyContent: "center",
  //   alignItems: "center",
  //   textAlign: "center",
  //   padding: 10,
  //   color: "white",
  // },
  // header: {
  //   textAlign: "center",
  //   fontSize: scaleSize(18),
  //   padding: scaleSize(16),
  //   marginTop: scaleSize(16),
  // },
});

// export default function MyChart() {
//   const { loading, HistoryData, error } = UseNewHistories("AAPL");

//   console.log("rowDataQ", HistoryData);
//   const open = HistoryData.map((x) => x.open);

//   return (
//     <SafeAreaView>
//       <View>
//         <LineChart
//           width={Dimensions.get("window").width - 16} // from react-native, set width size
//           height={scaleSize(120)}
//           withDots={false}
//           chartConfig={{
//             backgroundColor: "#ffffff",
//             backgroundGradientFrom: "#eff3ff",
//             backgroundGradientTo: "#efefef",

//             decimalPlaces: 2,
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//           }}
//           style={{
//             marginVertical: scaleSize(8),
//             borderRadius: scaleSize(16),
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }
