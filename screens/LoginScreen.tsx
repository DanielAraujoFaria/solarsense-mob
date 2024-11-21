import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig'; 
import SignUpScreen from './SignUpScreen'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showSignUp, setShowSignUp] = useState(false);  
  const handleLogin = async () => {
    if (loading) return;

    setLoading(true); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        // Login bem-sucedido
      }
    } catch (error) {
      setLoading(false); 
      Alert.alert('Erro de autenticação', 'Email ou senha inválidos.');
    }
  };

  const handleSignUpRedirect = () => {
    setShowSignUp(true);  
  };

  return (
    <View style={styles.container}>
      {showSignUp ? (
        <SignUpScreen />  
      ) : (
        <>
          <Text style={styles.title}>Bem-vindo ao Solar Sense!</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading} 
          >
            <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Login'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUpRedirect} style={styles.signUpLink}>
            <Text style={styles.signUpText}>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4', 
    padding: 20, 
  },
  title: {
    fontSize: 24,  
    fontWeight: 'bold',  
    marginBottom: 40,  
    color: '#333', 
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 8,  
  },
  button: {
    backgroundColor: '#5CF56B',  
    paddingVertical: 12,  
    paddingHorizontal: 30,  
    borderRadius: 8,  
    alignItems: 'center',  
    width: '100%',  
  },
  buttonDisabled: {
    backgroundColor: '#ccc', 
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',  
    fontSize: 16,  
  },
  signUpLink: {
    marginTop: 20,
  },
  signUpText: {
    color: '#1E90FF',
    fontSize: 16,
  },
});
