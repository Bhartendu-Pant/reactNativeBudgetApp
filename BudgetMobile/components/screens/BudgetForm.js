import { View } from "react-native";
import React, { useState } from "react";
import { TextInput, AppBar, Button, Stack } from "@react-native-material/core";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb");

const BudgetForm = ({ navigation }) => {
  const saveData = () => {
    console.log(category, plannedBudget, amountSpent);
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO budget (category, plannedBudget, amountSpent) VALUES (?,?,?)",
        [category, plannedBudget, amountSpent],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert("Sucess");
          } else alert("Failed");
        },
        (error) => {
          console.log(error);
        }
      );
    });
  };

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS budget (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), plannedBudget VARCHAR(50), amountSpent VARCHAR(100))"
    );
    console.log("created");
  });

  const [category, setCategory] = useState("");
  const [plannedBudget, setplannedBudget] = useState("");
  const [amountSpent, setamountSpent] = useState("");
  return (
    <View>
      <AppBar
        title="Budget entry"
        centerTitle={true}
        style={{ marginTop: "5%" }}
      />
      <TextInput
        variant="outlined"
        placeholder="Category"
        value={category}
        style={{ margin: 16, paddingTop: 10 }}
        onChangeText={(txt) => setCategory(txt)}
      />
      <TextInput
        variant="outlined"
        placeholder="Allocated budget"
        value={plannedBudget}
        style={{ margin: 16 }}
        onChangeText={(txt) => setplannedBudget(txt)}
      />
      <TextInput
        variant="outlined"
        placeholder="Actual Expenditure"
        value={amountSpent}
        style={{ margin: 16 }}
        onChangeText={(txt) => setamountSpent(txt)}
      />
      <Stack center spacing={4}>
        <Button
          title="Save"
          onPress={() => {
            saveData();
          }}
        />
        <Button
          title="Show Items"
          onPress={() => navigation.navigate("BudgetList")}
        />
      </Stack>
    </View>
  );
};

export default BudgetForm;
