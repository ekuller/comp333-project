import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React, { useState } from "react";

export default function YourRating(props) {
  const { artist, song, rating } = props.rating;
  return (
    <View style={styles.container(props.idx)}>
      <Text style={styles.text}>
        {song.toUpperCase()} — {rating}
      </Text>

      <Text>{artist}</Text>
    </View>
  );
}
const colors = [
  "#fbf8cc",
  "#fde4cf",
  "#ffcfd2",
  "#f1c0e8",
  "#cfbaf0",
  "#a3c4f3",
  "#90dbf4",
  "#8eecf5",
  "#98f5e1",
  "#b9fbc0",
];
const colorPicker = (id) => colors[id % 10];

const styles = StyleSheet.create({
  container: (id) => ({
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 8,
    backgroundColor: colorPicker(id),
  }),
  text: {
    fontSize: 20,
  },
});
