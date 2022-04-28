import { StyleSheet, SafeAreaView } from "react-native";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppContext } from "./context";

export default function App() {
  const [curUsername, setCurUsername] = useState("me");
  const [login, setLogin] = useState(false);

  if (login) {
    const ThemeContext = React.createContext(curUsername);
    return (
      <AppContext.Provider value={{ curUsername }}>
        <Homepage curUsername={curUsername} handleLogout={setLogin} />
      </AppContext.Provider>
    );
  } else {
    return (
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Login
            loginChanger={setLogin}
            userChanger={setCurUsername}
            curUsername={curUsername}
          />
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
