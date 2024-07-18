import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List, IconButton, Text } from 'react-native-paper';

const PasswordList = ({ passwords, deletePassword, startEditing }) => {
  const [showPasswords, setShowPasswords] = useState(Array(passwords.length).fill(false));

  const toggleShowPassword = (index) => {
    const newShowPasswords = [...showPasswords];
    newShowPasswords[index] = !newShowPasswords[index];
    setShowPasswords(newShowPasswords);
  };

  return (
    <FlatList
      data={passwords}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.passwordItem}>
          <List.Item
            title={item.title}
            description={showPasswords[index] ? item.password : '********'}
            left={() => <List.Icon icon="lock" />}
            right={() => (
              <View style={styles.actions}>
                <IconButton
                  icon={showPasswords[index] ? "eye-off" : "eye"}
                  size={20}
                  onPress={() => toggleShowPassword(index)}
                />
                <IconButton
                  icon="pencil"
                  size={20}
                  onPress={() => startEditing(index)}
                />
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => deletePassword(index)}
                />
              </View>
            )}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  passwordItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PasswordList;


