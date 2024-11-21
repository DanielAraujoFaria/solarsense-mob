import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';
import LoginScreen from './LoginScreen';  // Importando a LoginScreen

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);  // Estado para controlar a tela exibida

  const handleSignUp = async () => {
    if (loading) return;

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Cadastro concluído', 'Conta criada com sucesso!');
      setIsSignedUp(true);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro de cadastro', 'Algo deu errado. Tente novamente.');
    }
  };

  if (showLoginScreen || isSignedUp) {
    return <LoginScreen />;  // Mostra a LoginScreen quando o estado for true
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crie sua conta no SolarSense!</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowLoginScreen(true)} style={styles.loginLink}>
        <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',  // Alinhar o conteúdo para começar do topo
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
    paddingTop: 50,  // Um pouco mais de espaço no topo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    width: '100%',
    textAlign: 'center',  // Centralizar o título
  },
  input: {
    height: 50,  // Aumenta a altura para melhor usabilidade
    width: '100%',  // Largura 100% para ocupar toda a tela
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,  // Aumentando o padding para dar mais espaço no input
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5CF56B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,  // Mais espaço entre os campos e o botão
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#1E90FF',
    fontSize: 16,
  },
});
