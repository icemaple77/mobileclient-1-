import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheetContent from "../components/BottomSheetContent";

const StocksContext = React.createContext();

export function useStocksContext() {
  return useContext(StocksContext);
}

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const ServerURL = "http://localhost:3000";

  // can put more code here

  async function addToWatchlist(symbol) {
    const token = await AsyncStorage.getItem("@storage_token");

    let res = await fetch(`${ServerURL}/api/addwatchlist`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        symbol: symbol,
      }),
    });

    let data = await res.json();
    console.log(data);
    console.log(data.error);

    if (!data.error) {
      console.log("成功");
    }
  }

  async function getWatchlist() {
    const token = await AsyncStorage.getItem("@storage_token");

    try {
      let res = await fetch(`${ServerURL}/api/getwatchlist`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let data = await res.json();
      if (data.error == false) {
        setWatchList(data.watchList);
        //return data.watchList;
      } else {
        alert("No Symbol in the watchlist");
      }

      //const symbolslist = res.data.watchlist.toString();

      // if (!data.error) {
      //   console.log("成功");
      // }

      // //return symbolslist;
      // console.log("Watchlist" + data);
    } catch (error) {
      //alert 待处理
      console.log("getwatchlist_shabi");
    }
  }

  async function removeFromWatchlist(symbol) {
    const token = await AsyncStorage.getItem("@storage_token");
    console.log(symbol);
    try {
      let res = await fetch(`${ServerURL}/api/removewatchlist`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          symbol: symbol,
        }),
      });

      let data = await res.json();
      console.log(data);
      console.log(data.error);

      if (!data.error) {
        console.log("成功");
      }
    } catch (error) {
      //alert 待处理
      console.log("register_shabi");
    }
  }

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    //const watchlist = getWatchlist();
    //setWatchList(watchlist);
  }, []);

  return (
    <StocksContext.Provider
      value={{ addToWatchlist, getWatchlist, removeFromWatchlist, watchList }}
    >
      {children}
    </StocksContext.Provider>
  );
};
