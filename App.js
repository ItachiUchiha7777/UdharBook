import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContactScreen from "./components/contacts";
import HomeScreen from "./components/Home";
import DetailsScreen from "./components/Details";
import OldScreen from "./components/Old";
import InScreen from "./components/In";
import OutScreen from "./components/Out";
// import ModalScreen from "./components/Modal";
import AddScreen from "./components/Add";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "UdharBook",
            headerStyle: {
              // backgroundColor: "#f4511e",
              // fontSize: 30,
              // fontWeight: "bold",
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Old" component={OldScreen} />
        <Stack.Screen
          name="Credit/In"
          component={InScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen name="Out" component={OutScreen} />

        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{
            presentation: "modal",
            // Header styles for the 'Add' screen only
            headerStyle: {
              backgroundColor: "#faf1f8", // Set the background color for the header
            },
            headerTintColor: "#333", // Set the color of header text here (optional)
          }}
        />
      <Stack.Screen
          name="Contacts"
          component={ContactScreen}
          options={{
            presentation: 'modal',
            headerShown: false, // Hide the header if you don't need it
            cardStyle: { backgroundColor: 'transparent' }, // Make the background transparent
            contentStyle: { flex: 1, justifyContent: 'flex-end' } // Align content to the bottom
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Add any additional styles here if needed
});
