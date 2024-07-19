import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, Provider as PaperProvider, Appbar, FAB } from 'react-native-paper';
import PasswordInput from './components/PasswordInput';
import PasswordList from './components/PasswordList';

const App = () => {
  const [passwords, setPasswords] = useState([]);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    loadPasswords();
  }, []);

  const loadPasswords = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      if (storedPasswords !== null) {
        setPasswords(JSON.parse(storedPasswords));
      }
    } catch (error) {
      Alert.alert('Error', 'Error al cargar los passwords');
    }
  };

  const savePassword = async () => {
    if (title.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Título y contraseña no pueden quedar vacíos');
      return;
    }

    let newPasswords = [...passwords];
    const newPassword = { title, password };
    if (editingIndex !== null) {
      newPasswords[editingIndex] = newPassword;
      setEditingIndex(null);
    } else {
      newPasswords = [...newPasswords, newPassword];
    }
    setPasswords(newPasswords);

    try {
      await AsyncStorage.setItem('passwords', JSON.stringify(newPasswords));
      setTitle('');
      setPassword('');
      setShowInput(false);
    } catch (error) {
      Alert.alert('Error', 'Error al salvar el password');
    }
  };

  const deletePassword = async (index) => {
    const newPasswords = passwords.filter((_, i) => i !== index);
    setPasswords(newPasswords);
    try {
      await AsyncStorage.setItem('passwords', JSON.stringify(newPasswords));
    } catch (error) {
      Alert.alert('Error', 'Error al eliminar el password');
    }
  };

  const startEditing = (index) => {
    setTitle(passwords[index].title);
    setPassword(passwords[index].password);
    setEditingIndex(index);
    setShowInput(true);
  };

  return (
    <PaperProvider theme={DarkTheme}>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Password Fersoft" />
        </Appbar.Header>
        <PasswordList
          passwords={passwords}
          deletePassword={deletePassword}
          startEditing={startEditing}
        />
        {showInput && (
          <PasswordInput
            title={title}
            setTitle={setTitle}
            password={password}
            setPassword={setPassword}
            savePassword={savePassword}
          />
        )}
        <FAB
          style={styles.fab}
          icon={showInput ? "close" : "plus"}
          onPress={() => setShowInput(!showInput)}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default App;
