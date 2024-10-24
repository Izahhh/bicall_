import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Importação Firestore


// Importação das telas
import ConectarProfessor from "./screens/conectarGestor";
import TelaPrincipal from "./screens/TelaPrincipal";
import CadAluno from "./screens/CadAluno";
import AtualizarAluno from "./screens/AtualizarAluno";
import ApagarAluno from "./screens/ApagarAluno";
import VerificarAluno from "./screens/VerificarAluno";
import CadastrarProfessor from "./screens/cadastrarGestorr";
import TelaCurso from "./screens/telaCurso";
import TelaSerie from "./screens/telaSerie";

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

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 2000);
  }, []);

  if (!hideSplashScreen) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="conectarGestor" component={ConectarProfessor} />
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
        <Stack.Screen name="CadAluno" component={CadAluno} />
        <Stack.Screen name="AtualizarAluno" component={AtualizarAluno} />
        <Stack.Screen name="ApagarAluno" component={ApagarAluno} />
        <Stack.Screen name="VerificarAluno" component={VerificarAluno} />
        <Stack.Screen name="cadastrarGestor" component={CadastrarProfessor} />
        <Stack.Screen name="telaCurso" component={TelaCurso} />
        <Stack.Screen name="telaSerie" component={TelaSerie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
