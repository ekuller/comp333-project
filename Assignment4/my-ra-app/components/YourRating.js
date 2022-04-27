import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function YourRating(props) {
  const { artist, song, rating } = props.rating;
  return (
    <View style={(styles.container, { flex: 1 })}>
      <Text style={styles.text}>
        {song.toUpperCase()} — {rating}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 16 }}>{artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: () => ({
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 12,
  }),
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
});
