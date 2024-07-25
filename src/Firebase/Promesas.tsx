import { addDoc, collection, getDocs, getDoc, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './Firebase';
import { Uber } from '@/Interfaces/Ubers';

export const registrarUber = async (uber: Uber) => {
  const q = query(
    collection(db, "ubers"),
    where("email", "==", uber.email)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return Promise.reject(new Error("El correo electrónico ya está registrado."));
  }

  await addDoc(collection(db, "ubers"), uber);
};

export const login = async (email: string, password: string) => {
  const q = query(
    collection(db, "ubers"),
    where("email", "==", email),
    where("password", "==", password)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return Promise.reject(new Error("Correo o contraseña incorrectos."));
  }

  return { success: true };
};

export const obtenerUbers = async (): Promise<Uber[]> => {
  let ubers: Uber[] = [];
  const querySnapshot = await getDocs(collection(db, "ubers"));

  querySnapshot.forEach((doc) => {
    const uber: Uber = {
      nombre: doc.data().nombre,
      apellido: doc.data().apellido,
      email: doc.data().email,
      telefono: doc.data().telefono,
      edad: doc.data().edad,
      vehiculo: doc.data().vehiculo,
      licencia: doc.data().licencia,
      key: doc.id
    };

    ubers.push(uber);
  });

  return ubers;
};

export const obtenerUber = async (key: string): Promise<Uber | undefined> => {
  const docRef = doc(db, "ubers", key);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const uber: Uber = {
      nombre: docSnap.data().nombre,
      apellido: docSnap.data().apellido,
      email: docSnap.data().email,
      telefono: docSnap.data().telefono,
      edad: docSnap.data().edad,
      vehiculo: docSnap.data().vehiculo,
      licencia: docSnap.data().licencia,
      key: docSnap.id
    };

    return uber;
  } else {
    return undefined;
  }
};

export const actualizarUber = async (uber: Uber) => {
  const ref = doc(db, "ubers", uber.key!);
  await updateDoc(ref, { ...uber });
};

export const eliminarUber = async (uber: Uber) => {
  try {
    if (!uber.key) {
      throw new Error("La clave del Uber es inválida o está ausente.");
    }

    const ref = doc(db, "ubers", uber.key);
    await deleteDoc(ref);
  } catch (error) {
    console.error("Error al eliminar el Uber:", error);
  }
};