import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Button, List } from 'react-native-paper'; 

const data = [
    { id: 1, title: "Rohit", direction: "In", amount: 15, status: 0 },
    { id: 2, title: "Ishan", direction: "Out", amount: 20, status: 1 },
    { id: 3, title: "Batra", direction: "In", amount: 25, status: 0 },
    { id: 4, title: "Aditi", direction: "Out", amount: 30, status: 1 },
    { id: 5, title: "Sahil", direction: "In", amount: 35, status: 0 },
    { id: 6, title: "Nikita", direction: "Out", amount: 40, status: 1 },
    { id: 7, title: "Karan", direction: "In", amount: 45, status: 0 },
    { id: 8, title: "Priya", direction: "Out", amount: 50, status: 1 },
  ];
  

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
     
      <View style={styles.buttonContainer}>
        <Button icon="" mode="elevated" onPress={() => console.log("IN Pressed")}>
          IN
        </Button>
        <Button icon="" mode="elevated" onPress={() => console.log("OUT Pressed")}>
          OUT
        </Button>
        <Button icon="" mode="elevated" onPress={() => console.log("OLD Pressed")}>
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
              <Text style={styles.detail}>{item.direction}</Text>
              <Text style={styles.detail}>${item.amount}</Text>
              {/* <Text style={styles.detail}>
                Status: {item.status === 0 ? "Pending" : "Completed"}
              </Text> */}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* <List.Item
        title="First Item"
        description="Item description"
        left={(props) => <List.Icon {...props} icon="camera" />}
      /> */}
      <Button
        icon=""
        style={styles.addButton}
        mode="elevated"
        onPress={() => navigation.navigate('modal')}
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    maxWidth: 600,
    margin: 5,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    padding: 10,
  },
});
