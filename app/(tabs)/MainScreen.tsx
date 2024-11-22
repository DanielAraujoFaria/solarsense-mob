import React, { useState } from 'react';
import { View } from 'react-native';
import InsertDataScreen from '../../screens/InsertDataScreen';
import ListScreen from '../../screens/ListScreen';

export default function MainScreen() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);
  const [isInsertScreen, setIsInsertScreen] = useState(false);

  // Função para salvar o item
  const handleSave = (name: string) => {
    const newItem = {
      id: String(items.length + 1), // Gerando um ID simples. Você pode melhorar isso conforme necessário.
      name,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setIsInsertScreen(false); // Após salvar, volta para a tela de lista
  };

  // Função de voltar
  const handleBack = () => {
    setIsInsertScreen(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {isInsertScreen ? (
        <InsertDataScreen onBack={handleBack} onSave={handleSave} />
      ) : (
        <ListScreen onBack={handleBack} data={items} />
      )}
    </View>
  );
}
