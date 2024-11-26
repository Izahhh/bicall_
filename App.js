import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importação das telas
import TelaPrincipal from "./screens/TelaPrincipal";
import CadAluno from "./screens/CadAluno";
import AtualizarAluno from "./screens/AtualizarAluno";
import desvinAluno from "./screens/desvinAluno";
import VerificarAluno from "./screens/VerificarAluno";
import cadastrarGestor from "./screens/cadastrarGestor";
import TelaCurso from "./screens/telaCurso";
import TelaSerie from "./screens/telaSerie";
import conectarGestor from "./screens/conectarGestor"; 

import { auth, db } from "./screens/firebaseConfig";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="conectarGestor" component={conectarGestor} /> 
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
        <Stack.Screen name="CadAluno" component={CadAluno} />
        <Stack.Screen name="AtualizarAluno" component={AtualizarAluno} />
        <Stack.Screen name="desvinAluno" component={desvinAluno} />
        <Stack.Screen name="VerificarAluno" component={VerificarAluno} />
        <Stack.Screen name="cadastrarGestor" component={cadastrarGestor} />
        <Stack.Screen name="telaCurso" component={TelaCurso} />
        <Stack.Screen name="telaSerie" component={TelaSerie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
