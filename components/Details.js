// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={[styles.detail, item.direction === 'In' ? styles.in : styles.out]}>
        Direction: {item.direction}
      </Text>
      <Text style={styles.detail}>Amount: ₹{item.amount}</Text>
      <Text style={styles.detail}>Date: {item.date}</Text>

      <Text style={styles.detail}>Details: {item.description}</Text>

      

      <Text style={styles.detail}>
        Status: {item.status === 0 ? 'Pending' : 'Completed'}
      </Text>
      <Button
        icon=""
        style={styles.completeButton}
        mode="elevated"
        onPress={() => navigation.navigate('Add')}
      >
       Complete
      </Button>
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
  },completeButton:{
    marginTop:450,
    padding:20
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
