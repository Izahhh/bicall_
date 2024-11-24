import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Drawer Navigator
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

// Importação do Firebase (já configurado em firebaseConfig.js)
import { auth, db } from "./screens/firebaseConfig";

// Criando o Drawer e o Stack
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Configuração das telas no Stack Navigator
const TelaPrincipalStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
    <Stack.Screen name="CadAluno" component={CadAluno} />
    <Stack.Screen name="AtualizarAluno" component={AtualizarAluno} />
    <Stack.Screen name="desvinAluno" component={desvinAluno} />
    <Stack.Screen name="VerificarAluno" component={VerificarAluno} />
    <Stack.Screen name="cadastrarGestor" component={cadastrarGestor} />
    <Stack.Screen name="telaCurso" component={TelaCurso} />
    <Stack.Screen name="telaSerie" component={TelaSerie} />
  </Stack.Navigator>
);

// Componente principal do app
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="TelaPrincipal">
        <Drawer.Screen
          name="Menu Principal"
          component={TelaPrincipalStack}
          options={{ title: "" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
