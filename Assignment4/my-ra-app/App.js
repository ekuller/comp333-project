import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const [login, setLogin] = useState(false);
  if (login) {
    return <Homepage />;
  } else {
    return (
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Login loginChanger={setLogin} />
        </SafeAreaView>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
