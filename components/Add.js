import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from "react-native";
import { TextInput, Checkbox, IconButton, Button } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Contacts from 'expo-contacts'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA_KEY = 'transactions';

const saveTransaction = async (transaction) => {
  try {
    const existingData = await AsyncStorage.getItem(DATA_KEY);
    const data = existingData ? JSON.parse(existingData) : [];
    data.push(transaction);
    await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
    console.log('Transaction saved successfully:', data);
  } catch (e) {
    console.error('Failed to save transaction:', e);
    Alert.alert('Error', 'Failed to save transaction');
  }

};

export default function AddScreen({ navigation }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
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
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        console.log('Contacts data:', data); // Log data to verify structure

        if (data && Array.isArray(data) && data.length > 0) {
          const contactList = data.map(contact => ({
            name: contact.name,
            phoneNumbers: contact.phoneNumbers.map(phone => phone.number),
          }));

          Alert.alert(
            'Select a Contact',
            'Choose a contact from the list',
            contactList.map(contact => ({
              text: contact.name,
              onPress: () => {
                setContact(contact.name);
                setPhoneNumber(contact.phoneNumbers[0] || 'No phone number');
              },
            })).concat([{ text: 'Cancel', style: 'cancel' }])
          );
        } else {
          Alert.alert('No Contacts', 'No contacts found.');
        }
      } else {
        Alert.alert("Permission Denied", "Unable to access contacts");
      }
    } catch (error) {
      Alert.alert("Error", `Failed to load contacts: ${error.message}`);
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
      // contact,
      phoneNumber,
      amount: parseFloat(amount),
      direction: moneyInChecked ? 'In' : moneyOutChecked ? 'Out' : '',
      status: 'pending',
      date: date.toISOString(),
      description
    };

    await saveTransaction(transaction);

    setName('');
    setContact(null);
    setPhoneNumber(null);
    setAmount('');
    setDescription('');
    setMoneyInChecked(false);
    setMoneyOutChecked(false);
    setDate(new Date());

    Alert.alert('Success', 'Transaction saved successfully');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View contentContainerStyle={styles.container}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={[styles.input, styles.rounded]}
        />
        {/* <TouchableOpacity onPress={openContacts} style={styles.input}>
          <View style={styles.inputContent}>
            <IconButton icon="account" size={24} />
            <View style={styles.contactInfo}>
              <Text style={styles.label}>{contact || "Select Contact"}</Text>
              <Text style={styles.label}>{phoneNumber || ""}</Text>
            </View>
          </View>
        </TouchableOpacity> */}
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
            <IconButton icon="calendar" size={24} />
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
          onChangeText={setAmount}
          style={{ marginBottom: 10, }}
          left={<TextInput.Affix text="₹ " />}
          keyboardType="numeric"
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.description, styles.rounded]}
          multiline
        />
      </View>
      <TouchableOpacity onPress={handleSave}>
      <Button mode="contained" style={styles.button} >
        Save
      </Button>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#faf1f8",
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactInfo: {
    flexDirection: 'column',
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
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
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    top:170
  },
});
