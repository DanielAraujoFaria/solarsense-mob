import { ref, remove } from 'firebase/database';
import { database } from './firebaseConfig';

const deleteItem = async (id: string) => {
  try {
    const itemRef = ref(database, `items/${id}`); // Aponta para o caminho correto no banco de dados
    await remove(itemRef); // Remove o item do banco
    console.log(`Item com ID ${id} deletado com sucesso.`);
  } catch (error) {
    console.error('Erro ao deletar o item:', error);
  }
};

export default deleteItem;
