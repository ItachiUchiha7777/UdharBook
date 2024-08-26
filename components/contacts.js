// ContactScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';

const { height } = Dimensions.get('window');

const ContactScreen = ({ route, navigation }) => {
  const [contacts, setContacts] = useState([]);

  const { setContact, setPhoneNumber } = route.params;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });

          if (data && Array.isArray(data)) {
            // Ensure data is an array and map safely
            const contactList = data
              .filter(contact => contact.phoneNumbers) // Filter out contacts without phone numbers
              .map(contact => ({
                id: contact.id,
                name: contact.name,
                phoneNumbers: contact.phoneNumbers.map(phone => phone.number),
              }));

            setContacts(contactList);
          } else {
            setContacts([]); // Ensure contacts state is set to an empty array
          }
        } else {
          Alert.alert("Permission Denied", "Unable to access contacts");
        }
      } catch (error) {
        Alert.alert("Error", `Failed to load contacts: ${error.message}`);
      }
    };

    fetchContacts();
  }, []);

  const handleSelectContact = (contact) => {
    setContact(contact.name);
    setPhoneNumber(contact.phoneNumbers[0] || 'No phone number');
    navigation.goBack(); // Close the modal
  };

  return (
    <View style={[styles.container, { height: height * .9 }]}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleSelectContact(item)}
          >
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactNumber}>{item.phoneNumbers[0]}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No Contacts Available</Text>}
      />
      <Button
        title="Close"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 14,
    color: '#555',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default ContactScreen;
