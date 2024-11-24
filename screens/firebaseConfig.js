// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWob7JNlMzYswSwh6YUzcE-xImIRIOlhQ",
  authDomain: "bicalloficial.firebaseapp.com",
  projectId: "bicalloficial",
  storageBucket: "bicalloficial.appspot.com",
  messagingSenderId: "997635408353",
  appId: "1:997635408353:web:664650f93539c8e5fc12a0",
  measurementId: "G-HE5NDY9KL9"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Inicializando o Firestore

export { auth, db };  // Exportando `auth` e `db` para serem utilizados em outros arquivos
