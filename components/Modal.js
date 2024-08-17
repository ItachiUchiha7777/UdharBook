import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from "react-native";
import { TextInput, Checkbox, IconButton, Button } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import Contacts from 'react-native-contacts';

export default function ModalScreen({ navigation }) {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={openContacts} style={styles.input}>
        <View style={styles.inputContent}>
          <IconButton icon="account" size={24} onPress={openContacts} />
          <Text style={styles.label}>{contact || "Select Contact"}</Text>
        </View>
      </TouchableOpacity>

      <TextInput
        label="Name"
        
        value={name}
        onChangeText={(text) => setName(text)}
        style={[styles.input, styles.rounded]}
      />

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
      />

      <TextInput
        label="Description"
        
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={[styles.input, styles.description, styles.rounded]}
        multiline
      />

      <Button mode="contained" style={styles.button} onPress={() => { /* handle save */ }}>
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
