import { 
  collection, addDoc, getDocs, getDoc, 
  doc, updateDoc, deleteDoc, serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

const collectionRef = collection(db, "curriculos");

export const curriculoService = {
  // Cadastro (3.1)
  async create(data: any) {
    return await addDoc(collectionRef, {
      ...data,
      dataCriacao: serverTimestamp(),
    });
  },
  // Listagem (3.2)
  async getAll() {
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  // Visualização detalhada (3.3)
  async getById(id: string) {
    const docRef = doc(db, "curriculos", id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  },
  // Edição (3.4)
  async update(id: string, data: any) {
    const docRef = doc(db, "curriculos", id);
    return await updateDoc(docRef, data);
  },
  // Exclusão (3.5)
  async delete(id: string) {
    const docRef = doc(db, "curriculos", id);
    return await deleteDoc(docRef);
  }
};