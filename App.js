import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Adicionando Drawer Navigator
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

// Não precisa mais da configuração do Firebase aqui, pois ela foi movida para firebaseConfig.js
import { auth, db } from './screens/firebaseConfig'; // Agora importando de firebaseConfig

// Criando o Drawer e o Stack
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Tela principal com o menu
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
      <Drawer.Navigator initialRouteName="TelaPrincipalStack">
        <Drawer.Screen name="TelaPrincipal" component={TelaPrincipalStack} />
        {/* Adicione outras telas ao Drawer, se necessário */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
