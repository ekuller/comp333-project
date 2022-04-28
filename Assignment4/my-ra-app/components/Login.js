import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  Pressable,
  SafeAreaView,
} from "react-native";

export default function Login(props) {
  const verify = (user) => {
    if (user.trim() === "") {
      Alert.alert("Enter a username that you like.");
      return;
    }
    props.loginChanger(true);
    props.userChanger(user);
  };

  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 35,
          }}
        >
          Music Rater
        </Text>
      </View>

      <View
        style={{
          flex: 1.5,
          backgroundColor: "white",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 35 }}>Username</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Username"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(newText) => props.userChanger(newText)}
        />

        {/* <Text style={{ fontSize: 20, marginBottom: 5 }}>Password</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Password"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(newText) => setPassword(newText)}
        /> */}
        <Pressable
          style={styles.button}
          onPress={() => verify(props.curUsername)}
        >
          <Text style={styles.text}>Enter</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: 100,
    marginBottom: 280,
  },

  inputContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: 240,
    padding: 15,
    marginBottom: 15,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
});
