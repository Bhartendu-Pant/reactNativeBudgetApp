import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AppBar } from "@react-native-material/core";
import { useIsFocused } from "@react-navigation/native";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb");

const BudgetList = () => {
  const isFocused = useIsFocused();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM budget", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setUserList(temp);
      });
    });
  };

  console.log(userList + "    hi");

  return (
    <View>
      <AppBar
        title="Budget entry listing"
        centerTitle={true}
        style={{ marginTop: "5%" }}
      />

      <FlatList
        data={userList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={{ margin: 10, backgroundColor: "white" }}>
              <Text style={{ fontSize: 17 }}>
                {"Category: " + item.category}
              </Text>
              <Text style={{ fontSize: 17 }}>
                {"Allocated Budget: " + item.plannedBudget}
              </Text>
              <Text style={{ fontSize: 17 }}>
                {"Actual Expenditure: " + item.amountSpent}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default BudgetList;
