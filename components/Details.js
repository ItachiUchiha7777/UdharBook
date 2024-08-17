// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={[styles.detail, item.direction === 'In' ? styles.in : styles.out]}>
        Direction: {item.direction}
      </Text>
      <Text style={styles.detail}>Amount: ₹{item.amount}</Text>
      <Text style={styles.detail}>
        Status: {item.status === 0 ? 'Pending' : 'Completed'}
      </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  in: {
    color: 'green',
  },
  out: {
    color: 'red',
  },
});
