import React, { useRef, useState } from "react";
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
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheetContent from "./BottomSheetContent";
//import { SafeAreaView } from "react-native-web";

export default function OpenBottomSheet(props) {
  const [data, setData] = useState();
  const refRBSheet = useRef();
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        {/* <Button
          title="OPEN BOTTOM SHEET"
          onPress={() => refRBSheet.current.open()}
        /> */}
        <RBSheet
          ref={props.refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={500}
          //   openDuration={250}

          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "white",
            },
            container: {
              minHeight: "20%",
              maxHeight: "80%",
              backgroundColor: `rgb( 28, 28, 28 )`,
            },
          }}
        >
          {/* <Text>Hello</Text> */}
          <BottomSheetContent />
        </RBSheet>
      </View>
    </SafeAreaView>
  );
}
