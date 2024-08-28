import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DATA_KEY = 'transactions';


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

const InScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      const filteredData = fetchedData.filter(item => item.direction === 'Out');
      setData(filteredData);
    };

    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button icon="" mode="elevated" onPress={() => navigation.navigate('Credit/In')}>
          IN
        </Button>
        <Button icon="" mode="elevated" style={styles.outButton} onPress={() => navigation.navigate('Out')}>
          OUT
        </Button>
        <Button icon="" mode="elevated" onPress={() => navigation.navigate('Old')}>
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
                <Text style={[styles.detail, styles.out]}>
                  {item.direction}
                </Text>
              </View>
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
    </SafeAreaView>
  );
};

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
  outButton:{
    
      backgroundColor: '#b08cb8',
    
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  out: {
   color: "red"
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
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

export default InScreen;
