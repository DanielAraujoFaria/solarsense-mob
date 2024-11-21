import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ListScreen from './ListScreen';
import InsertDataScreen from './InsertDataScreen';
import EditScreen from './EditScreen';

export default function DashboardScreen() {
  const [screen, setScreen] = useState('dashboard'); 

  const handleIniciar = (screenName) => {
    setScreen(screenName); 
  };

  const handleBack = () => {
    setScreen('dashboard'); 
  };

  return (
    <View style={styles.container}>
      {screen === 'dashboard' ? (
        <>
          <Text style={styles.title}>Bem-vindo ao SolarSense!</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleIniciar('list')}>
            <Text style={styles.buttonText}>Painéis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleIniciar('insert')}>
            <Text style={styles.buttonText}>Novo Painel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleIniciar('edit')}>
            <Text style={styles.buttonText}>Editar Painel</Text>
          </TouchableOpacity>
        </>
      ) : screen === 'list' ? (
        <ListScreen onBack={handleBack} />
      ) : screen === 'insert' ? (
        <InsertDataScreen onBack={handleBack} />
      ) : screen === 'edit' ? (
        <EditScreen onBack={handleBack} />
      ) : null}
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5CF56B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
