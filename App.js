import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


//importação firebase 
import {getAuth, createUserWithEmailAndPassword, signInWithEmailPassword, onAuthStateChanged, signOut } from "@firebase/analytics";
// Importação das telas
import ConectarProfessor from "./screens/ConectarProfessor";
import TelaPrincipal from "./screens/TelaPrincipal";
import CadAluno from "./screens/CadAluno";
import AtualizarAluno from "./screens/AtualizarAluno";
import ApagarAluno from "./screens/ApagarAluno";
import VerificarAluno from "./screens/VerificarAluno";
import CadastrarProfessor from "./screens/CadastrarProfessor";
import TelaCurso from "./screens/telaCurso";
import TelaSerie from "./screens/telaSerie";


const firebaseConfig = {
  apiKey: "AIzaSyBWob7JNlMzYswSwh6YUzcE-xImIRIOlhQ",
  authDomain: "bicalloficial.firebaseapp.com",
  projectId: "bicalloficial",
  storageBucket: "bicalloficial.appspot.com",
  messagingSenderId: "997635408353",
  appId: "1:997635408353:web:664650f93539c8e5fc12a0",
  measurementId: "G-HE5NDY9KL9"
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  // Simula um tempo de exibição do SplashScreen
  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 2000); // Tempo de 2 segundos para o SplashScreen
  }, []);

  if (!hideSplashScreen) {
    return null; // Mostra o SplashScreen enquanto hideSplashScreen for false
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ConectarProfessor" component={ConectarProfessor} />
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
        <Stack.Screen name="CadAluno" component={CadAluno} />
        <Stack.Screen name="AtualizarAluno" component={AtualizarAluno} />
        <Stack.Screen name="ApagarAluno" component={ApagarAluno} />
        <Stack.Screen name="VerificarAluno" component={VerificarAluno} />
        <Stack.Screen name="CadastrarProfessor" component={CadastrarProfessor} />
        <Stack.Screen name="telaCurso" component={TelaCurso} />
        <Stack.Screen name="telaSerie" component={TelaSerie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;