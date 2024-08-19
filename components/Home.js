// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for AsyncStorage
const DATA_KEY = 'transactions';

// Demo data
const demoData = [
  { id: '1', name: "Rohit", direction: "In", amount: 15, status: 0 },
  { id: '2', name: "Ishan Chaudhary", direction: "Out", amount: 20, status: 1 },
  { id: '3', name: "Divya ", direction: "In", amount: 25, status: 0 },
  { id: '4', name: "Ekterina ", direction: "Out", amount: 30, status: 1 },
  { id: '5', name: "Nihrarika ", direction: "In", amount: 35, status: 0 },
  { id: '6', name: "Aahana", direction: "Out", amount: 40, status: 1 },
  { id: '7', name: "Karan", direction: "In", amount: 45, status: 0 },
  { id: '8', name: "Priya", direction: "Out", amount: 50, status: 1 },
];

const getDirectionStyle = (direction) => {
  return direction === 'In' ? styles.in : styles.out;
  
};
const initializeDemoData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DATA_KEY);
    
    if (jsonValue == null) {
      await AsyncStorage.setItem(DATA_KEY, JSON.stringify(demoData));
    }
  } catch (e) {
    console.error('Failed to initialize data:', e);
  }
};

const fetchData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch data:', e);
    Alert.alert('Error', 'Failed to load data');
    return [];
  }
};

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await initializeDemoData(); // Ensure demo data is set
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    loadData();
  }, [navigation]);

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
            onPress={() => navigation.navigate('Details', { item })}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{item.name}</Text>
             
              <View>
              <Text style={styles.detail}>₹{item.amount}</Text>
              <Text style={[styles.detail, getDirectionStyle(item.direction)]}>
                {item.direction}
              </Text>
              </View>
              {/* <Text style={styles.detail}>{item.status === 0 ? "Pending" : "Completed"}</Text> */}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button
        icon=""
        style={styles.addButton}
        mode="elevated"
        onPress={() => navigation.navigate('Add')}
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
    justifyContent: "space-between",
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
  out:{
    color:"red"
  },
  in:{
    color:"green"
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent:'center'
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
