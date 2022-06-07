import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);
  const [watchList, setWatchList] = useState("");

  // can put more code here

  async function addToWatchlist(symbol) {
    const token = await AsyncStorage.getItem("@storage_token");
    console.log(symbol);
    try {
      let res = await fetch(`${ServerURL}/api/addwatchlist`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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

  async function getWatchlist() {
    const token = await AsyncStorage.getItem("@storage_token");

    try {
      let res = await fetch(`${ServerURL}/api/getwatchlist`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      let data = await res.json();
      if (data.error == false) {
        console.log(data.watchList);
        setState(data.watchList);
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
          authorization: `Bearer ${token}`,
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
    const watchlist = getWatchlist();
    setWatchList(watchlist);
  }, []);

  return {
    ServerURL: "http://localhost:3000",
    addToWatchlist,
    removeFromWatchlist,
    watchList,
  };
};
