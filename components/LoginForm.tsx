import React from 'react';
import { TextInput, Button } from 'react-native';

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => void;
}

export function LoginForm({
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleLogin
}: LoginFormProps) {
  return (
    <>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </>
  );
}
