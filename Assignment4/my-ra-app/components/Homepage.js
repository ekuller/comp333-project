import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dialog from "react-native-dialog";
import YourRating from "./YourRating";
import AllRating from "./AllRating";
import CreateRating from "./CreateRating";

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

const yourRatings = {
  //from user-ratings/<str:user> Eliza
  ratings: [
    {
      id: "1",
      artist: "Avril Lavigne",
      song: "Complicated",
      rating: 4,
    },
    {
      id: "4",
      artist: "Duncan Laurence",
      song: "Arcade",
      rating: 5,
    },
    { id: "5", artist: "Ed Sheeran", song: "2Step", rating: 3 },
    {
      id: "6",
      artist: "Fall Out Boy",
      song: "Centuries",
      rating: 4,
    },
  ],
};

const allRatings = {
  //from summary-all-ratings/<str:user>' Eliza
  //we probly don't need the rating: <user's rating, none/null if not rated» field
  //since they won't be able to rate songs from the social tab
  ratings: [
    {
      id: "1",
      artist: "Avril Lavigne",
      song: "Complicated",
      average: 3,
    },
    {
      id: "2",
      artist: "Bea Miller",
      song: "burning brides",
      average: 4.5,
    },
    {
      id: "3",
      artist: "Charlie Puth",
      song: "Light Switch",
      average: 1,
    },
    {
      id: "4",
      artist: "Duncan Laurence",
      song: "Arcade",
      average: 5,
    },
    { id: "5", artist: "Ed Sheeran", song: "2Step", average: 3.5 },
    {
      id: "6",
      artist: "Fall Out Boy",
      song: "Centuries",
      average: 2.3,
    },
    {
      id: "7",
      artist: "Greyson Chance",
      song: "shut up",
      average: 2.9,
    },
  ],
};

function NewRatingScreen(props) {
  //the new rating tab
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CreateRating
        curUsername={props.curUsername}
        ratedSongs={yourRatings.ratings.map((x) => x.song)}
      />
    </View>
  );
}

function YourRatingsScreen({ route, navigation }) {
  //the initial screen of the second (your ratings ) tab
  return (
    <ScrollView style={{ marginHorizontal: 0, marginTop: 50 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {yourRatings.ratings.map((x, idx) => (
          <View key={-x.id} style={styles.container(idx)}>
            <YourRating key={x.id} rating={x} idx={idx} />
            <Button
              title="Edit"
              onPress={() => {
                navigation.navigate("Details", {
                  rating: x,
                });
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const InputDialog = (props) => {
  //a popup dialog that allows user edit their rating
  const [visible, setVisible] = useState(false);
  const { stateChanger, myStyle, textContent, validator } = props;
  const [tempTextContent, setTempTextContent] = useState(textContent);

  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleSubmit = () => {
    if (tempTextContent !== textContent) {
      if (validator(tempTextContent) === "Pass") {
        stateChanger(tempTextContent);
      } else {
        alert(validator(tempTextContent));
      }
    }
    setVisible(false);
  };
  return (
    <View>
      <Pressable onPress={() => showDialog()}>
        <Text style={[myStyle]}>{textContent}</Text>
      </Pressable>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Edit</Dialog.Title>
        <Dialog.Description>
          Enter the new value and hit submit!
        </Dialog.Description>
        <Dialog.Input onChangeText={(newText) => setTempTextContent(newText)} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Submit" onPress={handleSubmit} />
      </Dialog.Container>
    </View>
  );
};

function DetailsScreen({ route, navigation }) {
  //the "Edit" screen on "Your Ratings " tab
  const { id } = route.params.rating;
  const [artist, setArtist] = useState(route.params.rating.artist);
  const [song, setSong] = useState(route.params.rating.song);
  const [rating, setRating] = useState(route.params.rating.rating);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 50,
        }}
      >
        <Text style={styles.text}>You rated</Text>
        <InputDialog
          myStyle={[
            styles.text,
            {
              color: "midnightblue",
              fontWeight: "bold",
              fontFamily: "Georgia",
              marginVertical: 10,
            },
          ]}
          validator={(x) => {
            if (x.length === 0) {
              return "Song name is required.";
            }
            return yourRatings.ratings.filter((r) => r.song === x).length === 0
              ? "Pass"
              : "Sorry, you've already rated this song.";
          }}
          stateChanger={setSong}
          textContent={song}
        />

        <Text style={styles.text}>by</Text>
        <InputDialog
          myStyle={[
            styles.text,
            {
              color: "darkgreen",
              marginVertical: 10,
              fontFamily: "Tamil Sangam MN",
            },
          ]}
          validator={(x) =>
            x.length > 0 ? "Pass" : "Artist name can't be empty"
          }
          stateChanger={setArtist}
          textContent={artist}
        />
        <InputDialog
          myStyle={[
            styles.text,
            { color: "darkorange", marginBottom: 20, fontSize: 40 },
          ]}
          validator={(x) =>
            [1, 2, 3, 4, 5].includes(parseFloat(x))
              ? "Pass"
              : "Sorry, a rating could only be a integer from 1 to 5."
          }
          stateChanger={setRating}
          textContent={"★".repeat(rating)}
        />

        <Button
          title="Confirm"
          onPress={() => {
            console.log("A put request to update this review"); //I think it'd be nice if we merge edit-rating & edit-song-artist into just one API call Eliza
            console.log("edit-review", id, artist, song, rating);
            navigation.navigate("Your Ratings");
          }}
        />

        <Button
          title="Delete"
          color="#ff5c5c"
          onPress={() => {
            console.log("A delete request to delete this review"); //Eliza
            console.log("delete-rating", id);
            navigation.navigate("Your Ratings");
          }}
        />
      </View>
    </View>
  );
}

function SetYourRatingsScreen() {
  //the second (your ratings ) tab: combine YourRatingsScreen and DetailsScreen
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Your Ratings" component={YourRatingsScreen} />
      <SettingsStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "Detail",
          headerRight: () => (
            <Button
              onPress={() =>
                Alert.alert(
                  "Help",
                  "Click on the parts you want to edit. (Note: the rating is a interger 1 ~ 5)"
                )
              }
              title="Help"
            />
          ),
        }}
      />
    </SettingsStack.Navigator>
  );
}

function SocialScreen({ route, navigation }) {
  //the third tab
  return (
    <ScrollView style={{ marginHorizontal: 0, marginTop: 50 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {allRatings.ratings.map((x, idx) => (
          <AllRating key={x.id} rating={x} idx={idx} />
        ))}
      </View>
    </ScrollView>
  );
}

export default function Homepage(props) {
  const { curUsername } = props;
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
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="New Rating"
          options={{
            title: "New Rating",
          }}
          curUsername={curUsername}
          children={() => <NewRatingScreen curUsername={curUsername} />}
        />

        <Tab.Screen
          name="Your Ratings "
          component={SetYourRatingsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Social"
          component={SocialScreen}
          options={{
            headerRight: () => (
              <Button
                color="#ff5c5c"
                onPress={() => props.handleLogout(false)}
                title="Logout   "
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
    marginBottom: 12,
    backgroundColor: colorPicker(id),
  }),
  text: {
    fontSize: 30,
  },
});
