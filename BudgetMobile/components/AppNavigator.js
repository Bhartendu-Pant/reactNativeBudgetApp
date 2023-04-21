import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BudgetForm from "./screens/BudgetForm";
import BudgetList from "./screens/BudgetList";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer initialRouteName={BudgetForm}>
      <Stack.Navigator>
        <Stack.Screen
          name="BudgetForm"
          component={BudgetForm}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BudgetList"
          component={BudgetList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
