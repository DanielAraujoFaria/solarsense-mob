import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ListScreen from './ListScreen';
import InsertDataScreen from './InsertDataScreen';
import EditScreen from './EditScreen';
import { database, ref, set, get, child, remove } from '../services/firebaseConfig';

export default function DashboardScreen() {
  const [screen, setScreen] = useState('dashboard');
  const [data, setData] = useState<{ id: string; name: string }[]>([]);

  // Função para mudar a tela
  const handleIniciar = (screenName: string) => {
    setScreen(screenName);
  };

  // Função para voltar ao dashboard
  const handleBack = () => {
    setScreen('dashboard');
  };

  // Função para salvar um novo item no Firebase
  const handleSave = (name: string) => {
    const newItem = { name };
    const newItemRef = ref(database, 'items/' + Date.now()); // Criando uma referência única
    set(newItemRef, newItem) // Salvando o novo item no Firebase
      .then(() => {
        console.log('Item salvo com sucesso!');
        setData((prevData) => [
          ...prevData,
          { id: newItemRef.key!, name }, // Adiciona o item à lista local
        ]);
      })
      .catch((error) => {
        console.error('Erro ao salvar item: ', error);
      });
  };

  // Função para deletar um item do Firebase
  const handleDelete = (id: string) => {
    const itemRef = ref(database, 'items/' + id); // Referência para o item específico
    remove(itemRef) // Deleta o item
      .then(() => {
        console.log('Item removido com sucesso');
        setData((prevData) => prevData.filter((item) => item.id !== id)); // Atualiza a lista local
      })
      .catch((error) => {
        console.error('Erro ao remover item: ', error);
      });
  };

  // Carregar os dados do Firebase quando a tela de lista for aberta
  useEffect(() => {
    if (screen === 'list') {
      const itemsRef = ref(database, 'items');
      get(itemsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const itemsArray = Object.keys(data).map((key) => ({
              id: key,
              name: data[key].name,
            }));
            setData(itemsArray);
          } else {
            console.log('Nenhum dado encontrado!');
          }
        })
        .catch((error) => {
          console.error('Erro ao obter os dados: ', error);
        });
    }
  }, [screen]);

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
        <ListScreen onBack={handleBack} data={data} onDelete={handleDelete} />
      ) : screen === 'insert' ? (
        <InsertDataScreen onBack={handleBack} onSave={handleSave} />
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
