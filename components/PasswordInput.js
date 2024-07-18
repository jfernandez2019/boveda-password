import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';

const PasswordInput = ({ title, setTitle, password, setPassword, savePassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        mode="outlined"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          mode="outlined"
        />
        <IconButton
          icon={showPassword ? "eye-off" : "eye"}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <Button mode="contained" onPress={savePassword} style={styles.button}>
        Save Password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
  },
});

export default PasswordInput;
