import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from "react-native";
import { TextInput, Checkbox, IconButton, Button } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA_KEY = 'transactions';

const saveTransaction = async (transaction) => {
  try {
    const existingData = await AsyncStorage.getItem(DATA_KEY);
    const data = existingData ? JSON.parse(existingData) : [];
    data.push(transaction);
    await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
    console.log('Transaction saved successfully');
  } catch (e) {
    console.error('Failed to save transaction:', e);
    Alert.alert('Error', 'Failed to save transaction');
  }
};

export default function AddScreen({ navigation }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [moneyInChecked, setMoneyInChecked] = useState(false);
  const [moneyOutChecked, setMoneyOutChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const openContacts = async () => {
    try {
      const permission = await Contacts.requestPermission();
      if (permission === 'authorized') {
        Contacts.getAll().then(contacts => {
          // For simplicity, assuming the first contact is selected.
          if (contacts.length > 0) {
            setContact(contacts[0].displayName);
          }
        });
      } else {
        Alert.alert("Permission denied", "Unable to access contacts");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load contacts");
    }
  };

  const toggleMoneyIn = () => {
    setMoneyInChecked(true);
    setMoneyOutChecked(false);
  };

  const toggleMoneyOut = () => {
    setMoneyInChecked(false);
    setMoneyOutChecked(true);
  };

  const handleSave = async () => {
    if (!name || !amount || !date) {
      Alert.alert('Missing Information', 'Please fill out all required fields');
      return;
    }

    const transaction = {
      name,
      contact,
      amount: parseFloat(amount),
      direction: moneyInChecked ? 'Money In' : moneyOutChecked ? 'Money Out' : '',
      status: 'pending', // Assuming status is 'pending' initially
      date: date.toISOString(), // Store date as an ISO string
      description
    };

    await saveTransaction(transaction);

    // Optionally, reset the form or navigate to another screen
    setName('');
    setContact(null);
    setAmount('');
    setDescription('');
    setMoneyInChecked(false);
    setMoneyOutChecked(false);
    setDate(new Date());

    Alert.alert('Success', 'Transaction saved successfully');
    // navigation.goBack(); // Uncomment if you want to go back to the previous screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={[styles.input, styles.rounded]}
      />
      <TouchableOpacity onPress={openContacts} style={styles.input}>
        <View style={styles.inputContent}>
          <IconButton icon="account" size={24} onPress={openContacts} />
          <Text style={styles.label}>{contact || "Select Contact"}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={moneyInChecked ? "checked" : "unchecked"}
          onPress={toggleMoneyIn}
          color="#4CAF50"
        />
        <Text style={styles.checkboxLabel}>Money In</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={moneyOutChecked ? "checked" : "unchecked"}
          onPress={toggleMoneyOut}
          color="#F44336"
        />
        <Text style={styles.checkboxLabel}>Money Out</Text>
      </View>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <View style={styles.inputContent}>
          <IconButton icon="calendar" size={24} onPress={() => setShowDatePicker(true)} />
          <Text style={styles.label}>{date.toDateString()}</Text>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        label="Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        style={[styles.input, styles.rounded]}
        left={<TextInput.Affix text="₹" />}
        keyboardType="numeric"
      />

      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={[styles.input, styles.description, styles.rounded]}
        multiline
      />

      <Button mode="contained" style={styles.button} onPress={handleSave}>
        Save
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  input: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  description: {
    height: 100,
  },
  rounded: {
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
});
