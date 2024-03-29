import React, { useState, useContext } from "react";
import axios from "axios";
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
import { AppContext } from "../context";

export default function CreateRating(props) {
  const { curUsername } = useContext(AppContext);
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState("");
  const submit = (song, artist, rating) => {
    if (song === "" || artist === "") {
      Alert.alert("Song name and artist couldn't be empty.");
      return;
    }
    if (!["1", "2", "3", "4", "5"].includes(rating)) {
      Alert.alert("Rating needs to be 1-5. Please enter a valid rating.");
      return;
    }
    axios
      .post(
        "http://127.0.0.1:8000/rater/add-rating/" +
          song +
          "/" +
          artist +
          "/" +
          rating +
          "/" +
          curUsername
      )
      .then((res) => {
        if (res.data["status"] === "ok") {
          console.log("Add a new rating to db", song, artist, rating);
          Alert.alert("New rating successfully submitted.");
          setSong("");
          setArtist("");
          setRating("");
        } else if (res.data["status"] === "rating exists") {
          Alert.alert(
            "You already rated this song. You can modify a rating in the 'Your Ratings' tab."
          );
        }
      });
  };

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
          value={song}
        />
        <Text style={{ fontSize: 20, marginBottom: 5 }}>Artist</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Artist"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(newText) => setArtist(newText)}
          value={artist}
        />

        <Text style={{ fontSize: 20, marginBottom: 5 }}>Rating</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Rating"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(newText) => setRating(newText)}
          value={rating}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            submit(song.trim(), artist.trim(), rating.trim());
          }}
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
