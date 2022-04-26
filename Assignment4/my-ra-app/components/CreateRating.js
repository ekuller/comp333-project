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

export default function CreateRating(props) {
  const verify = (song, artist, rating) => {
    if (song !== "alreadyExist") {
      console.log("Add a new rating to db", song, artist, rating);
      Alert.alert("New rating successfully submitted.");
    }
  };

  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState("");

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 35,
          }}
        >
          Create a New Rating
        </Text>
      </View>

      <View
        style={{
          flex: 3,

          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 5 }}>Song Name</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Song Name"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(newText) => setSong(newText)}
        />
        <Text style={{ fontSize: 20, marginBottom: 5 }}>Artist</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Artist"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(newText) => setArtist(newText)}
        />

        <Text style={{ fontSize: 20, marginBottom: 5 }}>Rating</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Rating"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(newText) => setRating(newText)}
        />
        <Pressable
          style={styles.button}
          onPress={() => verify(song, artist, rating)}
        >
          <Text style={styles.text}>Submit</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
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
