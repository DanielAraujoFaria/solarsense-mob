import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ListScreen from './ListScreen';
import InsertDataScreen from './InsertDataScreen';
import EditScreen from './EditScreen';
import LoginScreen from './LoginScreen'; 
import { auth } from '../services/firebaseConfig'; 
import { database, ref, set, get, remove } from '../services/firebaseConfig';

export default function DashboardScreen() {
  const [screen, setScreen] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(true); 
  const [data, setData] = useState<{ id: string; name: string }[]>([]);
  const [currentItem, setCurrentItem] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = ref(database, 'items');
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          const items = snapshot.val();
          const formattedData = Object.keys(items).map((key) => ({
            id: key,
            name: items[key].name,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      setLoggedIn(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
      console.error('Error logging out:', error);
    }
  };

  if (!loggedIn) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.container}>
      {screen === 'dashboard' ? (
        <>
          <Text style={styles.title}>Bem-vindo ao SolarSense!</Text>
          <TouchableOpacity style={styles.button} onPress={() => setScreen('list')}>
            <Text style={styles.buttonText}>Painéis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setScreen('insert')}>
            <Text style={styles.buttonText}>Novo Painel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </>
      ) : screen === 'list' ? (
        <ListScreen
          onBack={() => setScreen('dashboard')}
          data={data}
          onDelete={async (id) => {
            try {
              await remove(ref(database, 'items/' + id));
              setData((prevData) => prevData.filter((item) => item.id !== id));
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          }}
          onEdit={(item) => {
            setCurrentItem(item);
            setScreen('edit');
          }}
        />
      ) : screen === 'insert' ? (
        <InsertDataScreen
          onBack={() => setScreen('dashboard')}
          onSave={async (name) => {
            const newItem = { name };
            try {
              const newRef = ref(database, 'items/' + Date.now().toString());
              await set(newRef, newItem);
              setData((prevData) => [...prevData, { id: Date.now().toString(), name }]);
            } catch (error) {
              console.error('Error saving data:', error);
            }
          }}
        />
      ) : screen === 'edit' && currentItem ? (
        <EditScreen
          onBack={() => setScreen('list')}
          item={currentItem}
          onUpdate={async (id, name) => {
            try {
              await set(ref(database, 'items/' + id), { name });
              const updatedData = data.map((item) =>
                item.id === id ? { ...item, name } : item
              );
              setData(updatedData);
              setScreen('list');
            } catch (error) {
              console.error('Error updating data:', error);
            }
          }}
        />
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
  logoutButton: {
    backgroundColor: '#FF5C5C',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
