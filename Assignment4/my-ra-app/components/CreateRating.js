import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";

export default function CreateRating(props) {
  const verify = (song, artist, rating) => {
    if (props.ratedSongs.includes(song)) {
      alert("Song already rated.");
    } else if (artist == "" || song == "" || rating == "") {
      alert("All fields are required.");
    } else if (![1, 2, 3, 4, 5].includes(parseFloat(rating))) {
      alert("A rating could only be a integer from 1 to 5.");
    } else {
      console.log(
        "Add a new rating to db",
        song,
        artist,
        rating,
        props.curUsername
      ); //path('add-rating/) Eliza
      setSong("");
      setArtist("");
      setRating("");
      Alert.alert("Success", "New rating successfully submitted.");
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
            verify(song.trim(), artist.trim(), rating.trim());
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
