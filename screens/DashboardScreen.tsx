// DashboardScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ListScreen from './ListScreen';
import InsertDataScreen from './InsertDataScreen';
import EditScreen from './EditScreen';
import { database, ref, set, get, remove } from '../services/firebaseConfig'; // Importando corretamente


export default function DashboardScreen() {
  const [screen, setScreen] = useState('dashboard');
  const [data, setData] = useState<{ id: string; name: string }[]>([]);
  const [currentItem, setCurrentItem] = useState<{ id: string; name: string } | null>(null);

  // Carregar dados do Firebase
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

  // Navegar para a tela desejada
  const handleIniciar = (screenName: string) => {
    setScreen(screenName);
  };

  // Voltar para a tela inicial
  const handleBack = () => {
    setScreen('dashboard');
  };

  // Salvar novo item no Firebase
  const handleSave = async (name: string) => {
    const newItem = { name };
    try {
      const newRef = ref(database, 'items/' + Date.now().toString());
      await set(newRef, newItem);
      setData((prevData) => [...prevData, { id: Date.now().toString(), name }]);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Deletar item do Firebase
  const handleDelete = async (id: string) => {
    try {
      const itemRef = ref(database, 'items/' + id);
      await remove(itemRef);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Editar item no Firebase
  const handleEdit = (item: { id: string; name: string }) => {
    setCurrentItem(item);
    setScreen('edit');
  };

  const handleUpdate = async (id: string, name: string) => {
    try {
      const itemRef = ref(database, 'items/' + id);
      await set(itemRef, { name });
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, name } : item
      );
      setData(updatedData);
      setScreen('list');
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
        <ListScreen onBack={handleBack} data={data} onDelete={handleDelete} onEdit={handleEdit} />
      ) : screen === 'insert' ? (
        <InsertDataScreen onBack={handleBack} onSave={handleSave} />
      ) : screen === 'edit' && currentItem ? (
        <EditScreen onBack={handleBack} item={currentItem} onUpdate={handleUpdate} />
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
