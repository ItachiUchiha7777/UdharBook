import { StatusBar } from "expo-status-bar";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { IconButton, Button, Text, MD3Colors, List } from "react-native-paper";

const data = [
  { id: "1", title: "Rohit", direction: "In", amount: 10, status: 0 },
  { id: "2", title: "Ishan", direction: "In", amount: 10, status: 0 },
  { id: "3", title: "Batra", direction: "In", amount: 10, status: 0 },
  { id: "3", title: "Batra", direction: "In", amount: 10, status: 0 },
  { id: "3", title: "Batra", direction: "In", amount: 10, status: 0 },
  { id: "3", title: "Batra", direction: "In", amount: 10, status: 0 },
  { id: "3", title: "Batra", direction: "In", amount: 10, status: 0 },
  { id: "3", title: "Batra", direction: "In", amount: 10, status: 0 },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>
        UdharBook
      </Text>
      <View style={styles.buttonContainer}>
        <Button icon="" mode="elevated" onPress={() => console.log("Pressed")}>
          IN
        </Button>
        <Button icon="" mode="elevated" onPress={() => console.log("Pressed")}>
          OUT
        </Button>
        <Button icon="" mode="elevated" onPress={() => console.log("Pressed")}>
          OLD
        </Button>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => alert(`Selected: ${item.title}`)}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.detail}>Direction: {item.direction}</Text>
              <Text style={styles.detail}>Amount: ${item.amount}</Text>
              <Text style={styles.detail}>
                Status: {item.status === 0 ? "Pending" : "Completed"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <List.Item
        title="First Item"
        description="Item description"
        left={(props) => <List.Icon {...props} icon="folder" />}
      />
      <Button
        icon=""
        style={{ padding: 10 }}
        mode="elevated"
        onPress={() => console.log("Pressed")}
      >
        ADD NEW
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    marginLeft: 20,
    marginTop: 35,
    marginBottom: 20,
    fontFamily: "",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Adjusts spacing between buttons
    width: "100%", // Ensures the buttons use full width available
    maxWidth: 600, // Optional: Limit max width for better UI on larger screens
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
