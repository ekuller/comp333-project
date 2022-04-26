import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import YourRating from "./YourRating";
import AllRating from "./AllRating";
import CreateRating from "./CreateRating";

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

function NewRatingScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CreateRating />
    </View>
  );
}

const fakeAllRatings = {
  ratings: [
    {
      id: "1",
      artist: "Avril Lavigne",
      song: "Complicated",
      rating: 4,
      user: "me",
    },
    {
      id: "2",
      artist: "Bea Miller",
      song: "burning brides",
      rating: 3,
      user: "bot",
    },
    {
      id: "3",
      artist: "Charlie Puth",
      song: "Light Switch",
      rating: 5,
      user: "bot",
    },
    {
      id: "4",
      artist: "Duncan Laurence",
      song: "Arcade",
      rating: 4,
      user: "me",
    },
    { id: "5", artist: "Ed Sheeran", song: "2Step", rating: 3, user: "me" },
    {
      id: "6",
      artist: "Fall Out Boy",
      song: "Centuries",
      rating: 4,
      user: "me",
    },
    {
      id: "7",
      artist: "Greyson Chance",
      song: "shut up",
      rating: 2,
      user: "bot",
    },
  ],
};

function YourRatingsScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {fakeAllRatings.ratings
        .filter((r) => r.user === "me")
        .map((x, idx) => (
          <YourRating key={x.id} rating={x} idx={idx} />
        ))}
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  //   const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function SetYourRatingsScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Your Ratings" component={YourRatingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

function SocialScreen({ route, navigation }) {
  return (
    <ScrollView style={{ marginHorizontal: 0, marginTop: 50 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {fakeAllRatings.ratings.map((x, idx) => (
          <AllRating key={x.id} rating={x} idx={idx} />
        ))}
      </View>
    </ScrollView>
  );
}

export default function Homepage() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "New Rating") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Your Ratings ") {
              iconName = focused ? "star" : "star-half";
            } else if (route.name === "Social") {
              iconName = focused ? "happy" : "people";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="New Rating"
          component={NewRatingScreen}
          options={{
            title: "New Rating",
          }}
        />
        <Tab.Screen
          name="Your Ratings "
          component={SetYourRatingsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Social" component={SocialScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
